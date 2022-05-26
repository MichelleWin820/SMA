//import { parse } from 'fast-xml-parser';
import pkg from 'fast-xml-parser';
const { parse } = pkg;
import { sendRequest } from '../../../utils/axios.js';
import { Paper } from '../models.js';

export { fetchFromNCBI };

const fetchFromNCBI = async (ids: readonly string[]): Promise<readonly Paper[]> => {
  const res = await sendRequest({
    method: 'GET',
    url: `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&version=2.0&id=${ids.join(',')}`,
  });

  const json = parse(res.data as string);
  const results: any[] = json?.eSummaryResult?.DocumentSummarySet?.DocumentSummary || [];

  return results.map(parseXMLRecord).filter((p): p is Paper => !!p?.id);
};

const parseXMLRecord = (rec: any): Paper | undefined => {
  const id = rec.ArticleIds?.ArticleId?.find((aid: any) => aid.IdType === 'pubmed')?.Value;
  if (!id) return;

  const issn = rec.ISSN;
  const essn = rec.ESSN;
  const title = rec.Title;
  const issue: number = rec.Issue | 0;
  const pages = rec.Pages;
  const volume: number = rec.Volume | 0;
  const journal = rec.FullJournalName;
  const pubDate = rec.SortPubDate ? parseDate(rec.SortPubDate) : void 0;

  return { id, title, journal, volume, pubDate, pages, issn, essn, issue };
};

const parseDate = (dt: string) => {
  const ts = Date.parse(dt);
  if (!Number.isNaN(ts)) return new Date(ts);
};
