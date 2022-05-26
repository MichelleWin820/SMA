import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'linkify',
})
export class LinkifyPipe implements PipeTransform {
  public transform(str: string | readonly string[], url: string, sep = '; '): string {
    if (!str) return '';

    if (typeof str === 'string') {
      return linkify(url, str);
    }

    return str
      .reduce((acc, s) => {
        if (s) acc.push(linkify(url, s));
        return acc;
      }, [] as string[])
      .join(sep);
  }
}

const linkify = (url: string, s: string): string => {
  return `<a href="${url.replace('@id', s)}" target="_blank">${s}</a>`;
};
