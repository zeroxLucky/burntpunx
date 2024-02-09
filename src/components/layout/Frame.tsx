import Counter from "../web3/Count";
export default function Frame() {
  return (
    <div className="text-gold digital frame border rounded-md w-full aspect-square overflow-hidden relative">
      <div className="tv-static" />
      <Counter />
    </div>
  );
}
