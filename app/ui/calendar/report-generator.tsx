'use client'
/***
 * @project project-harbor
 * @author azurkurbasic on 7. 01. 24
 */
import {jsPDF as JsPDF } from 'jspdf';
import {Button} from "@/app/ui/components/button";

export type PdfReportItem = {
    title: string,
    content: string
}

interface PdfReportGeneratorProps {
    items: PdfReportItem []
}

export default function PdfReportGenerator (props: PdfReportGeneratorProps) {

    const generatePDF = () => {
        const pdf = new JsPDF();

        props.items.forEach((it, index) => {
            pdf.text(`${it.title}: ${it.content}`, 10, 10 + index * 10)
        })

        pdf.save('output.pdf')
    }

    return (
        <Button onClick={generatePDF}>
            Export to PDF
        </Button>
    )
}
