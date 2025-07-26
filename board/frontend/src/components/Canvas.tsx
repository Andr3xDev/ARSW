import { useRef, useEffect } from "react";
import p5 from "p5";

interface CanvasProps {
    color: string;
    strokeWeight: number;
}

interface DrawData {
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
    color: string;
    strokeWeight: number;
}

export function Canvas({ color, strokeWeight }: Readonly<CanvasProps>) {
    const canvasRef = useRef<HTMLDivElement>(null);
    const propsRef = useRef<CanvasProps>({ color, strokeWeight });
    const wsRef = useRef<WebSocket | null>(null);
    const p5InstanceRef = useRef<p5 | null>(null);

    useEffect(() => {
        propsRef.current = { color, strokeWeight };
    }, [color, strokeWeight]);

    useEffect(() => {
        const socket = new WebSocket(
            "ws://boardes-back-efg3gffde6aderd7.canadacentral-01.azurewebsites.net/board"
        );
        wsRef.current = socket;

        socket.onopen = () => {
            console.log("WebSocket connected");
        };

        socket.onmessage = (event) => {
            try {
                const data: DrawData = JSON.parse(event.data);
                const p = p5InstanceRef.current;
                if (p) {
                    p.stroke(data.color);
                    p.strokeWeight(data.strokeWeight);
                    p.line(data.fromX, data.fromY, data.toX, data.toY);
                }
            } catch (error) {
                console.log("Server message:", event.data);
            }
        };

        socket.onclose = () => {
            console.log("WebSocket disconnected");
        };

        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        const sketch = (p: p5) => {
            p5InstanceRef.current = p;

            p.setup = () => {
                p.createCanvas(800, 550).parent(canvasRef.current!);
                p.background(255);
            };

            p.mouseDragged = () => {
                p.stroke(propsRef.current.color);
                p.strokeWeight(propsRef.current.strokeWeight);
                p.line(p.pmouseX, p.pmouseY, p.mouseX, p.mouseY);

                const data: DrawData = {
                    fromX: p.pmouseX,
                    fromY: p.pmouseY,
                    toX: p.mouseX,
                    toY: p.mouseY,
                    color: propsRef.current.color,
                    strokeWeight: propsRef.current.strokeWeight,
                };

                if (socket.readyState === WebSocket.OPEN) {
                    socket.send(JSON.stringify(data));
                }
            };
        };

        const p5Instance = new p5(sketch);

        return () => {
            socket.close();
            p5Instance.remove();
        };
    }, []);

    return <div ref={canvasRef} className="border-6 border-[#275359]" />;
}
