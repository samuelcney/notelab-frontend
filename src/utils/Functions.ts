export const getInitials = (name: string) => {
  const words = name.trim().split(" ");
  if (words.length > 1) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

export function shuffleArray(array: string[]) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export function getRandomItem(array: string[]) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

export function convertToEmbedUrl(url: string): string | null {
  try {
    const parsedUrl = new URL(url);

    if (
      parsedUrl.hostname.includes("youtube.com") &&
      parsedUrl.pathname === "/watch"
    ) {
      const videoId = parsedUrl.searchParams.get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

    if (parsedUrl.hostname === "youtu.be") {
      const videoId = parsedUrl.pathname.slice(1);
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

    if (
      parsedUrl.hostname.includes("youtube.com") &&
      parsedUrl.pathname.startsWith("/embed/")
    ) {
      return url;
    }

    return null;
  } catch {
    return null;
  }
}

export const formatDateTime = (time: string) => {
  const date = new Date(time);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} - ${hours}:${minutes}`;
};

export function formatSeconds(seconds: number): string {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

export function buildImageFormData(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  return formData;
}

export function getWhatsappLink(phone: string, customMessage?: string): string {
  const cleaned = phone.replace(/\D/g, "");
  const fullNumber = `55${cleaned}`;

  const defaultMessage =
    "Olá ! Gostaria de tirar algumas dúvidas sobre as aulas. Podemos conversar?";
  const finalMessage = customMessage || defaultMessage;

  return `https://wa.me/${fullNumber}?text=${encodeURIComponent(finalMessage)}`;
}

export function getEmailLink(
  email: string,
  subject?: string,
  body?: string
): string {
  const defaultSubject = "Dúvidas sobre as aulas";
  const defaultBody =
    "Olá professor(a),\n\nGostaria de tirar algumas dúvidas sobre as aulas. Poderia me ajudar?\n\nObrigado!";

  const finalSubject = encodeURIComponent(subject || defaultSubject);
  const finalBody = encodeURIComponent(body || defaultBody);

  return `mailto:${email}?subject=${finalSubject}&body=${finalBody}`;
}
