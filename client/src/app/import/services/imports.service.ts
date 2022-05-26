import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe, UnaryFunction } from 'rxjs';
import { catchError, filter, map, switchMap, takeWhile } from 'rxjs/operators';
import { Message, SocketService } from 'src/app/core/services/socket.service';
import { UploadService } from 'src/app/core/services/upload.service';
import { StringTMap } from 'src/app/core/typings/common';
import { parseHttpError } from 'src/app/core/utils/parse-http-error';
import { ImportStatus, LogMessage, Payload } from 'src/app/import/typings/upload';
import { arrayToCSV } from 'src/app/import/utils/array-to-csv';
import { downloadBlob } from 'src/app/import/utils/download-blob';
import { formatLogMessage } from 'src/app/import/utils/format-log-message';

export const COMPLETE_IMPORT = 'import:complete';

export type ImportProcessToken = { token: string };
export type ImportParams = { file: File; escape: string; delimiter: string };

export type ImportState = {
  readonly progress?: number;
  readonly status?: ImportStatus;
  readonly logMsg?: LogMessage;
};

const SAMPLES: StringTMap<readonly string[][]> = {
  genes: [
    ['accession', 'symbol', 'name'],
    ['unique id', 'string', 'string'],
  ],
  proteins: [
    ['uniProtId', 'accession', 'name', 'geneId', 'species', 'description', 'isEnzyme', 'sequence', 'length'],
    ['unique protein id', 'protein accession', 'string', 'gene accession string', 'string', 'string', 'TRUE/FALSE', 'string', 'number'],
  ],
  domains: [
    ['interproId', 'name', 'proteinId'],
    ['string', 'string', 'protein accession string'],
  ],
  localizations: [
    ['proteinId', 'organelleId', 'pubMedId', 'methodId'],
    ['protein accession string', 'organelle id', 'string', 'method type'],
  ],
  pathways: [
    ['id', 'name'],
    ['unique id', 'string'],
  ],
  reactions: [
    ['id', 'name', 'ecNumber', 'metaDomain', 'proteinId', 'pathwayId'],
    ['unique id', 'string (required)', 'string', 'string', 'protein accession', 'string'],
  ],
  tags: [
    ['proteinId', 'geneId', 'name'],
    ['unique accession id (required if geneId is empty)', 'unique accession id (required if proteinId is empty)', 'string (required)'],
  ],
};

@Injectable()
export class ImportsService {
  private readonly progressPipe: UnaryFunction<Observable<ImportProcessToken>, Observable<ImportState>>;

  constructor(
    private uploadSrv: UploadService, //
    private socketSrv: SocketService,
    private readonly http: HttpClient,
  ) {
    this.progressPipe = pipe(
      switchMap((res: ImportProcessToken) => {
        return this.socketSrv.message$.pipe(
          filter((msg): msg is Message<Payload> => {
            return !!res?.token && msg.payload?.token === res.token;
          }),
          takeWhile((msg) => msg.event !== COMPLETE_IMPORT, true),
        );
      }),
      map(({ event, payload }): ImportState => {
        const logMsg = formatLogMessage(payload);

        if (event === COMPLETE_IMPORT) {
          return { status: 'complete', progress: 100, logMsg };
        }

        const progress = payload.progress;
        const status: ImportStatus = 'importing';
        return { progress, status, logMsg };
      }),
    );
  }

  connect() {
    return this.socketSrv.connect();
  }

  import(table: string, params?: ImportParams): Observable<ImportState> {
    if (params) {
      const { file, ...options } = params;
      return this.uploadSrv.upload<ImportProcessToken>(`api/import/csv`, [file], { ...options, table }).pipe(this.progressPipe);
    }

    return this.http
      .post(`/api/import/${table}`, {})
      .pipe(
        map((res: any): ImportProcessToken => {
          return { token: res.token };
        }),
        catchError((res: HttpErrorResponse): never => {
          throw parseHttpError(res);
        }),
      )
      .pipe(this.progressPipe);
  }

  downloadSample(table: string) {
    const arr = SAMPLES[table];
    if (!arr) return;
    const csv = arrayToCSV(arr);
    downloadBlob(csv, `${table}.csv`, 'text/csv;charset=utf-8;');
  }
}
