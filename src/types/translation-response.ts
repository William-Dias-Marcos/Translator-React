export interface TranslationResponse {
  responseData: {
    translatedText: string;
    match: number;
  };
  quotaFinished: boolean;
  mtLangSupported: string | null;
  responseDetails: string;
  responseStatus: number;
  responderId: string | null;
  exception_code: string | null;
  matches: TranslationMatch[];
}

export interface TranslationMatch {
  id: number | string;
  segment: string;
  translation: string;
  source: string;
  target: string;
  quality: number | string;
  reference: string | null;
  "usage-count": number;
  subject: string | boolean;
  "created-by": string;
  "last-updated-by": string;
  "create-date": string;
  "last-update-date": string;
  match: number;
  penalty: number | null;
  model?: string | null;
}
