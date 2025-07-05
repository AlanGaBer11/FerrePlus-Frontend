import { useState } from "react";
import ReactMarkdown from "react-markdown";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const MarkdownDialog = ({ title, contentPath, triggerElement }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  // Cargar contenido Markdown cuando se abre el diálogo
  const loadContent = async () => {
    if (!content) {
      try {
        setLoading(true);
        // Importar el archivo Markdown
        const markdownModule = await import(`../markdown/${contentPath}.md`);
        const response = await fetch(markdownModule.default);
        const text = await response.text();
        setContent(text);
      } catch (error) {
        console.error("Error cargando el contenido markdown:", error);
        setContent(
          "Error al cargar el contenido. Intente nuevamente más tarde."
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Dialog onOpenChange={(open) => open && loadContent()}>
      <DialogTrigger asChild>{triggerElement}</DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl p-6 bg-white shadow-lg">
        <DialogHeader>
          <DialogTitle
            className="font-bold text-center mb-4"
            style={{ marginTop: "50px" }}
          >
            {title}
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="text-center py-8">Cargando contenido...</div>
        ) : (
          <div
            className="markdown-content"
            style={{ padding: "10px", margin: "15px 15px 0" }}
          >
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        )}

        <DialogFooter
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <DialogClose asChild>
            <Button>Cerrar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
MarkdownDialog.propTypes = {
  title: PropTypes.string.isRequired,
  contentPath: PropTypes.string.isRequired,
  triggerElement: PropTypes.node.isRequired,
};

export default MarkdownDialog;
