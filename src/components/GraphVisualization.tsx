import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";

interface Node {
  id: string;
  label: string;
  type: 'account' | 'transaction' | 'entity';
  value?: number;
}

interface Link {
  source: string;
  target: string;
  value: number;
  type: 'debit' | 'credit';
}

interface GraphVisualizationProps {
  nodes: Node[];
  links: Link[];
  className?: string;
}

const GraphVisualization = ({ nodes, links, className }: GraphVisualizationProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const width = svg.clientWidth;
    const height = svg.clientHeight;

    // Clear previous content
    svg.innerHTML = '';

    // Create a simple layout for demonstration
    const nodeMap = new Map(nodes.map((node, i) => [
      node.id, 
      {
        ...node,
        x: (width / (nodes.length + 1)) * (i + 1),
        y: height / 2 + (Math.random() - 0.5) * 200
      }
    ]));

    // Draw connections first (so they appear behind nodes)
    links.forEach(link => {
      const sourceNode = nodeMap.get(link.source);
      const targetNode = nodeMap.get(link.target);
      
      if (sourceNode && targetNode) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', sourceNode.x.toString());
        line.setAttribute('y1', sourceNode.y.toString());
        line.setAttribute('x2', targetNode.x.toString());
        line.setAttribute('y2', targetNode.y.toString());
        line.setAttribute('stroke', link.type === 'debit' ? '#ef4444' : '#22c55e');
        line.setAttribute('stroke-width', Math.max(1, Math.log(link.value / 1000) + 1).toString());
        line.setAttribute('opacity', '0.6');
        svg.appendChild(line);
      }
    });

    // Draw nodes
    nodeMap.forEach(node => {
      const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', node.x.toString());
      circle.setAttribute('cy', node.y.toString());
      circle.setAttribute('r', '20');
      
      let fillColor = '#3b82f6'; // Default blue
      if (node.type === 'account') fillColor = '#8b5cf6'; // Purple
      if (node.type === 'transaction') fillColor = '#ef4444'; // Red
      if (node.type === 'entity') fillColor = '#22c55e'; // Green
      
      circle.setAttribute('fill', fillColor);
      circle.setAttribute('opacity', '0.8');
      group.appendChild(circle);
      
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', node.x.toString());
      text.setAttribute('y', (node.y + 35).toString());
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('fill', '#374151');
      text.setAttribute('font-size', '12');
      text.setAttribute('font-weight', '500');
      text.textContent = node.label;
      group.appendChild(text);
      
      svg.appendChild(group);
    });
  }, [nodes, links]);

  return (
    <Card className={`p-4 ${className}`}>
      <div className="h-full">
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          viewBox="0 0 800 400"
          className="w-full h-full"
        >
        </svg>
      </div>
    </Card>
  );
};

export default GraphVisualization;