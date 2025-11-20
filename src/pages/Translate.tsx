import { useCallback, useEffect, useState } from "react";

import { faLeftRight } from "@fortawesome/free-solid-svg-icons";
import Select from "../components/Select";
import Button from "../components/Button";
import type { TranslationResponse } from "../types/translation-response";

const Languages = [
  { code: "pt", name: "Português" },
  { code: "en", name: "Inglês" },
  { code: "es", name: "Espanhol" },
  { code: "fr", name: "Francês" },
  { code: "de", name: "Alemão" },
  { code: "it", name: "Italiano" },
  { code: "ja", name: "Japonês" },
  { code: "zh", name: "Chinês" },
];

function Translate() {
  const [sourceLang, setSourceLang] = useState("pt");
  const [targetLang, setTargetLang] = useState("en");
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTranslate = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${sourceText}&langpair=${sourceLang}|${targetLang}`
      );

      if (!response.ok) throw new Error(`HTTP ERROR: ${response.status}`);

      const data: TranslationResponse = await response.json();

      setTranslatedText(data.responseData.translatedText);

      if (!sourceText) {
        setTranslatedText("");
        return;
      }
    } catch (err) {
      setError(`Erro ao traduzir: ${err}`);
    } finally {
      setIsLoading(false);
    }
  }, [sourceText, sourceLang, targetLang]);

  useEffect(() => {
    const delay = setTimeout(() => {
      handleTranslate();
    }, 300);

    return () => clearTimeout(delay);
  }, [sourceText, sourceLang, targetLang, handleTranslate]);

  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  return (
    <main className="flex items-start justify-center px-4 py-8">
      <div className="w-full max-w-5xl rounded-lg shadow-md">
        <div className="flex items-center justify-between p-4">
          <div className="w-2xs tooltip" data-tip="Idioma de origem">
            <Select
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
              options={Languages}
              tooltip="Idioma de origem"
              className="w-2xs"
            />
          </div>

          <Button
            onClick={swapLanguages}
            icon={faLeftRight}
            tooltip="Alterar idiomas"
          />

          <Select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            options={Languages}
            tooltip="Idioma de destino"
            className="w-2xs"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-4">
            <textarea
              className="w-full h-40 resize-none outline-none text-lg border p-2 rounded"
              placeholder="Digite seu texto..."
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
            ></textarea>
          </div>

          <div className="p-4 relative">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
              </div>
            ) : (
              <p className="text-lg">{translatedText || "Tradução"}</p>
            )}
          </div>
        </div>

        {error && (
          <div className="p-4 border-t border-red-400 text-red-700">
            {error}
          </div>
        )}
      </div>
    </main>
  );
}

export default Translate;
