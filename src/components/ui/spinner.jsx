"use client";

export default function Spinner() {
  return (
    <div className="flex items-center justify-center w-full h-auto my-5">
      <div className="relative w-10 h-10 rotate-box">
        <span className="dot absolute top-0 left-1/2 -translate-x-1/2"></span>
        <span className="dot absolute bottom-0 left-1/2 -translate-x-1/2"></span>
        <span className="dot absolute left-0 top-1/2 -translate-y-1/2"></span>
        <span className="dot absolute right-0 top-1/2 -translate-y-1/2"></span>
      </div>

      <style jsx>{`
        /* SPINNER ROTATION */
        .rotate-box {
          animation: rotateCircle 1.2s linear infinite;
        }

        @keyframes rotateCircle {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        /* DOT STYLE */
        .dot {
          width: 10px;
          height: 10px;
          background-color: #22c55e;
          border-radius: 50%;
          position: absolute;
          animation: bounceZoom 0.8s infinite ease-in-out;
        }

        .dot:nth-child(1) {
          animation-delay: 0s;
        }
        .dot:nth-child(2) {
          animation-delay: 0.15s;
        }
        .dot:nth-child(3) {
          animation-delay: 0.3s;
        }
        .dot:nth-child(4) {
          animation-delay: 0.45s;
        }

        /* DOT ZOOM + BOUNCE */
        @keyframes bounceZoom {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.8);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
}
