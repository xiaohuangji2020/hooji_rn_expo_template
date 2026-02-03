import Map from "./Map";
import NavMap from "./NavMap";

export default function MapComponent({ type }: { type?: string }) {
  if (type === "nav") {
    return <NavMap />;
  }
  return <Map />;
}
