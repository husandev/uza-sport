import type { Metadata } from "next";
import PhotosPage from "@/views/PhotosPage";

export const metadata: Metadata = {
  title: "Fotogalereya",
  description: "JCh-2026 va O'zbekiston terma jamoasining rasmiy fotosuratlari.",
};

export default function PhotosRoute() {
  return <PhotosPage />;
}
