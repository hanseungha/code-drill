import { Banner } from "@astryxdesign/core/Banner";
import { CodeBlock } from "@astryxdesign/core/CodeBlock";
import { VStack } from "@astryxdesign/core/Layout";
import { Markdown } from "@astryxdesign/core/Markdown";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@astryxdesign/core/Table";
import { Heading, Text } from "@astryxdesign/core/Text";
import { RichText } from "@/components/RichText";
import type { ConceptBlock } from "@/lib/curriculum";

/**
 * Renders a week's lesson. Stays a server component: the Tables are data-driven
 * with no renderCell, and the one client island (CodeBlock, for `trace` blocks)
 * is a leaf that hydrates on its own without dragging the lesson across.
 */
export function ConceptNote({ blocks }: { blocks: ConceptBlock[] }) {
  return (
    <VStack gap={5}>
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </VStack>
  );
}

function Block({ block }: { block: ConceptBlock }) {
  if (block.kind === "heading") {
    return <Heading level={3}>{block.body}</Heading>;
  }

  if (block.kind === "text") {
    return (
      <Text textWrap="pretty">
        <RichText text={block.body} />
      </Text>
    );
  }

  if (block.kind === "list") {
    // Markdown rather than List/ListItem: a ListItem's label is a plain string,
    // and lesson bullets carry `code` and **bold** that would show as literal
    // punctuation. Markdown renders both as Astryx components.
    const source = block.items
      .map((item, i) => `${block.ordered ? `${i + 1}.` : "-"} ${item}`)
      .join("\n");
    return <Markdown density="compact">{source}</Markdown>;
  }

  if (block.kind === "table") {
    return <ConceptTable headers={block.headers} rows={block.rows} />;
  }

  if (block.kind === "trace") {
    // A worked run, not code to reuse: plaintext so nothing is syntax-coloured,
    // no copy button, no line numbers. The caption (if any) labels the box.
    return (
      <CodeBlock
        code={block.lines.join("\n")}
        language="plaintext"
        title={block.caption}
        hasCopyButton={false}
        size="sm"
        width="100%"
      />
    );
  }

  // Trap titles name the API that misbehaves, so they carry backticks too.
  return (
    <Banner
      status="warning"
      title={<RichText text={block.title} />}
      description={<RichText text={block.body} />}
    />
  );
}

/**
 * Children mode rather than the data-driven API: lesson cells carry the same
 * `backtick` and **bold** marks as the prose around them, and rendering those
 * needs real elements in the cell. Children take ReactNode, not functions, so
 * this still renders on the server.
 */
function ConceptTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  // TableHeader / TableBody are not optional: rows placed directly under
  // <table> make the browser insert its own <tbody>, and the tree React
  // hydrates against then differs from the one it rendered.
  return (
    <Table density="compact" dividers="rows" verticalAlign="top">
      <TableHeader>
        <TableRow>
          {headers.map((header, i) => (
            <TableHeaderCell key={i}>{header}</TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, i) => (
          <TableRow key={i}>
            {row.map((cell, j) => (
              <TableCell key={j}>
                <Text size="sm" textWrap="pretty">
                  <RichText text={cell} />
                </Text>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
