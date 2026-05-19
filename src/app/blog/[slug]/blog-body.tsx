import { TFaq, TPost } from '@/types/post';
import { normalizeImageUrl } from '@/utils/url';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Image from 'next/image';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const BlogBody = ({ post } : {post: TPost} ) => {

  return (
    <div className="blog__body space-y-4">
      {post?.blocks.map((block) => {
        switch (block.type) {
          case 'h1':
            return <h1 key={block.id} className="text-4xl font-bold">{block.value}</h1>;

          case 'h2':
            return <h2 key={block.id} className="text-3xl font-semibold">{block.value}</h2>;

          case 'h3':
            return <h3 key={block.id} className="text-2xl font-semibold">{block.value}</h3>;

          case 'h4':
            return <h4 key={block.id} className="text-lg font-medium">{block.value}</h4>;

          case 'h5':
            return <h5 key={block.id} className="text-base font-medium">{block.value}</h5>;

          case 'h6':
            return <h6 key={block.id} className="text-sm font-medium">{block.value}</h6>;

          case 'p':
            return <p key={block.id} className="text-base leading-relaxed">{block.value}</p>;

          case 'image':
            return (
              <div key={block.id} className="my-4 flex justify-center items-center">
                <Image
                    src={normalizeImageUrl(block.value)}
                    alt="Uploaded"
                    width={500}
                    height={300}
                    className="rounded-sm"
                  />
              </div>
            );
          case 'link':
            return (
              <Link
                key={block.id}
                href={block.value}
                className="text-2xl inline-block !text-black !no-underline"
                target="_blank"
                // rel="noopener noreferrer"
                // style={block?.styles ?? block?.styles}
              >
                {block.text}
              </Link>
            );

          case 'rich':
            return (
              <div
                key={block.id}
                dangerouslySetInnerHTML={{ __html: block.value }}
              />
            );
          case 'table':
            return (
              <div key={block.id} className="my-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {block?.value?.data[0].map((header, index) => (
                        <TableHead key={index} className="font-bold text-black">{header}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {block?.value?.data.slice(1).map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <TableCell className={`${cellIndex === 0 ? "text-black" : ""}`}  key={cellIndex}>{cell}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            );

          default:
            return null;
        }
      })}

      {post.faq?.isActive && post.faq.items?.length > 0 && (
        <div className="my-4">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="">
            {post.faq.items.map((item) => (
              <Accordion type="single" collapsible key={item.id}>
                <AccordionItem value={item.id}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>
                    <div dangerouslySetInnerHTML={{ __html: item.answer }} />
                    </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default BlogBody;