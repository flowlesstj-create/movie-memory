import Image from "next/image";

interface UserAvatarProps {
  name: string | null;
  image: string | null;
}

export default function UserAvatar({ name, image }: UserAvatarProps) {
  if (image) {
    return (
      <Image
        src={image}
        alt={name ? name.replace(/[<>"'&]/g, "") : "User"}
        width={48}
        height={48}
        className="rounded-full"
        referrerPolicy="no-referrer"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
        aria-label={name || "User avatar"}
      />
    );
  }

  const initials = (name || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-semibold text-sm"
      aria-label={name || "User avatar"}
      role="img"
    >
      {initials}
    </div>
  );
}
