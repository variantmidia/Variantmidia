"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";

const features = [
  {
    title: "Mais velocidade",
    body: "O lead recebe resposta no timing em que ainda existe intenção de contratar."
  },
  {
    title: "Mais controle",
    body: "Fica mais claro o que está funcionando, o que está travando e onde agir."
  },
  {
    title: "Mais escala",
    body: "O crescimento deixa de depender só do sócio estar pessoalmente em tudo."
  }
] as const;

const routes = [
  {
    name: "WhatsApp",
    color: "#25D366",
    path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
  },
  {
    name: "Google Ads",
    color: "#4285F4",
    path: "M3.9998 22.9291C1.7908 22.9291 0 21.1383 0 18.9293s1.7908-3.9998 3.9998-3.9998 3.9998 1.7908 3.9998 3.9998-1.7908 3.9998-3.9998 3.9998zm19.4643-6.0004L15.4632 3.072C14.3586 1.1587 11.9121.5028 9.9988 1.6074S7.4295 5.1585 8.5341 7.0718l8.0009 13.8567c1.1046 1.9133 3.5511 2.5679 5.4644 1.4646 1.9134-1.1046 2.568-3.5511 1.4647-5.4644zM7.5137 4.8438L1.5645 15.1484A4.5 4.5 0 0 1 4 14.4297c2.5597-.0075 4.6248 2.1585 4.4941 4.7148l3.2168-5.5723-3.6094-6.25c-.4499-.7793-.6322-1.6394-.5878-2.4784z"
  },
  {
    name: "Meta Ads",
    color: "#0082FB",
    path: "M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z"
  },
  {
    name: "ChatGPT",
    color: "#10A37F",
    path: "M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"
  },
  {
    name: "Claude",
    color: "#D97757",
    path: "m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z"
  }
] as const;

function drawGlobe(canvas: HTMLCanvasElement, reduceMotion: boolean) {
  const ctx = canvas.getContext("2d");

  if (!ctx) return () => {};

  const points = Array.from({ length: 720 }, (_, index) => {
    const offset = 2 / 720;
    const y = index * offset - 1 + offset / 2;
    const radius = Math.sqrt(1 - y * y);
    const phi = index * Math.PI * (3 - Math.sqrt(5));

    return {
      x: Math.cos(phi) * radius,
      y,
      z: Math.sin(phi) * radius,
      phase: index / 720
    };
  });

  let frame = 0;
  let animationFrame = 0;

  const render = () => {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.floor(rect.width * dpr));
    const height = Math.max(1, Math.floor(rect.height * dpr));

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, rect.width, rect.height);

    const cx = rect.width * 0.66;
    const cy = rect.height * 0.56;
    const globeRadius = Math.min(rect.width, rect.height) * 0.66;
    const rotation = reduceMotion ? 0.55 : frame * 0.00145;
    const tilt = -0.34;
    const cosR = Math.cos(rotation);
    const sinR = Math.sin(rotation);
    const cosT = Math.cos(tilt);
    const sinT = Math.sin(tilt);

    const gradient = ctx.createRadialGradient(cx, cy, globeRadius * 0.12, cx, cy, globeRadius * 1.05);
    gradient.addColorStop(0, "rgba(22,212,232,0.12)");
    gradient.addColorStop(0.42, "rgba(22,212,232,0.04)");
    gradient.addColorStop(1, "rgba(22,212,232,0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(cx, cy, globeRadius * 1.08, 0, Math.PI * 2);
    ctx.fill();

    points.forEach((point) => {
      const rx = point.x * cosR - point.z * sinR;
      const rz = point.x * sinR + point.z * cosR;
      const ry = point.y * cosT - rz * sinT;
      const tz = point.y * sinT + rz * cosT;
      const depth = (tz + 1) / 2;
      const px = cx + rx * globeRadius;
      const py = cy + ry * globeRadius;
      const hue = 185 + point.phase * 32;
      const alpha = 0.12 + depth * 0.78;

      ctx.fillStyle = `hsla(${hue}, 92%, ${58 + depth * 18}%, ${alpha})`;
      ctx.beginPath();
      ctx.arc(px, py, 0.72 + depth * 1.25, 0, Math.PI * 2);
      ctx.fill();
    });

    const drawArc = (start: number, end: number, progress: number, color: string) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(start + rotation * 0.32);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.35;
      ctx.shadowColor = "rgba(22,212,232,0.5)";
      ctx.shadowBlur = 9;
      ctx.beginPath();
      ctx.ellipse(0, 0, globeRadius * 1.02, globeRadius * 0.34, 0, 0, (end - start) * progress);
      ctx.stroke();
      ctx.restore();
    };

    const pulse = reduceMotion ? 1 : (Math.sin(frame * 0.01) + 1) / 2;
    drawArc(-0.35, 2.35, 0.72 + pulse * 0.22, "rgba(22,212,232,0.62)");
    drawArc(1.55, 4.1, 0.58 + (1 - pulse) * 0.24, "rgba(255,255,255,0.34)");

    if (!reduceMotion) {
      frame += 1;
      animationFrame = requestAnimationFrame(render);
    }
  };

  render();

  return () => cancelAnimationFrame(animationFrame);
}

export function PredictabilityViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cleanup = drawGlobe(canvas, media.matches);

    const handleMotionChange = () => {
      cleanup();
      cleanup = drawGlobe(canvas, media.matches);
    };

    media.addEventListener("change", handleMotionChange);
    window.addEventListener("resize", handleMotionChange);

    return () => {
      cleanup();
      media.removeEventListener("change", handleMotionChange);
      window.removeEventListener("resize", handleMotionChange);
    };
  }, []);

  return (
    <div className="viz-predict pointer-events-none" aria-hidden="true">
      <div className="viz-predict__glow" />
      <canvas ref={canvasRef} className="viz-predict__canvas" />
      <div className="viz-predict__overlay" />

      <div className="viz-predict__route-stack">
        {routes.map((route, index) => (
          <span key={route.name} style={{ "--route-i": index } as CSSProperties}>
            <svg viewBox="0 0 24 24" fill={route.color} aria-hidden="true">
              <path d={route.path} />
            </svg>
            {route.name}
          </span>
        ))}
      </div>

      <div className="viz-predict__features">
        {features.map((feature, index) => (
          <div
            className="viz-predict__feature"
            key={feature.title}
            style={{ "--feature-i": index } as CSSProperties}
          >
            <strong>{feature.title}</strong>
            <span>{feature.body}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
