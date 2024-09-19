import { FileError, Issue, ToolResult } from "codacy-seed";
import { TSESLint } from '@typescript-eslint/utils';

import { DEBUG, debug } from "lib/utils/logging.ts";


//TOODO: import { isBlacklisted } from "lib/models/blacklist.ts";
import { patternIdToCodacy } from "lib/models/patterns.ts";
import { computeSuggestion } from "codacy/src/computeSuggestion.ts";

export function convertResults(eslintResults: TSESLint.FlatESLint.LintResult[]): ToolResult[] {
  const results: ToolResult[] = [];
  if (DEBUG) {
    debug('convertResults: eslintResults')
    debug(JSON.stringify(eslintResults))
  }
  eslintResults.forEach((result) => {
    debug('convertResults: eslintResults.each ')
    debug(JSON.stringify(result))
    const { "filePath": filename, messages } = result;

    if (result.fatalErrorCount > 0) {
      results.push(
        new FileError(
          filename,
          messages.filter(m => m.fatal).map(m => m.message).join("\\n")
        )
      );
      return;
    }

    const issues = messages
      //TODO: .filter(m => { m.ruleId != null && !isBlacklisted(m.ruleId) })
      .map(m => {
        const { ruleId, line, endLine, message, fix, suggestions } = m
        const patternId = patternIdToCodacy(ruleId || "")
        if (DEBUG) {
          debug(`convertResults: Pattern ${ruleId} => ${patternId}`)
        }
        const suggestion
          = process.env.SUGGESTIONS === "true" && result.source
            ? computeSuggestion(result.source, (line ?? 1), endLine, fix, suggestions)
            : undefined

        return new Issue(filename, message, patternId, (line ?? 1), suggestion)
      });

    results.push(...issues);
  })
  if (DEBUG) {
    debug('convertResults:')
    debug(JSON.stringify(results))
  }
  return results;
}
