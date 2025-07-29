import type { Metadata } from "next";
import { Manrope, Noto_Sans } from "next/font/google";
import "./globals.css";
import { ResumeProvider } from "@/context/ResumeContext";
import NavbarWrapper from "@/components/NavbarWrapper";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Kickstart Resume Builder - Create Professional Resumes",
  description: "Kickstart's Resume Builder helps you get hired at top companies. Pick a resume template and build your resume in minutes!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${notoSans.variable} antialiased`}
        style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
      >
        <ResumeProvider>
          <NavbarWrapper />
          {children}
        </ResumeProvider>
      </body>
    </html>
  );
}
