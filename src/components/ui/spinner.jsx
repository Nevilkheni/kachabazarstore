"use client";

export default function Spinner() {
  return (
    <div className="spinner-wrapper">
      <div className="circle">
        {Array.from({ length: 20 }).map((_, index) => (
          <span
            key={index}
            className="dot"
            style={{
              transform: `rotate(${index * 18}deg) translate(36px)`,
              animationDelay: `${index * 0.08}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        .spinner-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          margin: 32px 0;
        }

        .circle {
          position: relative;
          width: 90px;
          height: 90px;
        }

        .dot {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 6px;
          height: 6px;
          background-color: #22c55e;
          border-radius: 50%;
          animation: grow 1.6s infinite ease-in-out;
          transform-origin: center;
          opacity: 0.5;
        }

        @keyframes grow {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          25% {
            transform: scale(2);
            opacity: 1;
          }
          50% {
            transform: scale(1);
            opacity: 0.5;
          }
          100% {
            transform: scale(1);
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}
