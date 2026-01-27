import React, { useState } from "react";
import { EmailTemplate } from "./types";
import { renderTemplateToHTML } from "./utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Copy, Download } from "lucide-react";

interface SourceCodeViewProps {
  template: EmailTemplate;
}

export const SourceCodeView: React.FC<SourceCodeViewProps> = ({ template }) => {
  const [copied, setCopied] = useState(false);

  const htmlContent = renderTemplateToHTML(template);

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([htmlContent], { type: "text/html" });
    element.href = URL.createObjectURL(file);
    element.download = `${template.name || "template"}.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header with Actions */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            HTML Source Code
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Complete HTML for: {template.name || "Untitled Template"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative group">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="p-2"
            >
              <Copy className="w-4 h-4" />
            </Button>
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs whitespace-nowrap bg-gray-800 text-white rounded hidden group-hover:block">
              {copied ? "Copied!" : "Copy Code"}
            </span>
          </div>
          <div className="relative group">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="p-2"
            >
              <Download className="w-4 h-4" />
            </Button>
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs whitespace-nowrap bg-gray-800 text-white rounded hidden group-hover:block">
              Download
            </span>
          </div>
        </div>
      </div>

      {/* Code Display */}
      <div className="flex-1 overflow-auto p-4">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <pre className="p-4 text-xs font-mono text-gray-800 overflow-auto max-h-full leading-relaxed">
            <code>{htmlContent}</code>
          </pre>
        </div>
      </div>

      {/* Stats Footer */}
      <div className="bg-white border-t border-gray-200 p-4 text-sm text-gray-600 flex justify-between">
        <span>Lines: {htmlContent.split("\n").length}</span>
        <span>Characters: {htmlContent.length}</span>
        <span>Blocks: {template.blocks.length}</span>
      </div>
    </div>
  );
};
