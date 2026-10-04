import React from "react";
import { CheckCircle2, ChevronDown, ChevronRight, FolderTree } from "lucide-react";
import { AlgoNode } from "../data/problems/algoTree";

export interface AlgoNodeStat { total: number; solved: number }

interface AlgoTreeProps {
  nodes: AlgoNode[];
  stats: Record<string, AlgoNodeStat>;
  rootStat: AlgoNodeStat;
  selected: string;                         // 'all' hoặc id nút
  onSelect: (id: string) => void;
  expanded: Record<string, boolean>;
  onToggle: (id: string) => void;
  onExpandAll: (open: boolean) => void;
}

const Badge: React.FC<{ stat: AlgoNodeStat; active?: boolean }> = ({ stat, active }) => {
  const done = stat.total > 0 && stat.solved >= stat.total;
  return (
    <span
      className={`flex-shrink-0 inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
        done ? "bg-emerald-100 text-emerald-700" : active ? "bg-indigo-100 text-indigo-700" : "bg-slate-100 text-slate-500"
      }`}
      title={`${stat.solved}/${stat.total} bài đã giải`}
    >
      {done && <CheckCircle2 className="h-3 w-3" />}
      {stat.solved}/{stat.total}
    </span>
  );
};

const NodeRow: React.FC<{ node: AlgoNode; depth: number } & Omit<AlgoTreeProps, "nodes" | "rootStat" | "onExpandAll">> = ({
  node, depth, stats, selected, onSelect, expanded, onToggle
}) => {
  const hasChildren = !!node.children?.length;
  const open = expanded[node.id] ?? false;
  const isSelected = selected === node.id;
  const stat = stats[node.id] || { total: 0, solved: 0 };
  if (stat.total === 0) return null;
  return (
    <li>
      <div
        className={`group flex items-center gap-1 rounded-lg pr-1.5 transition-colors ${
          isSelected ? "bg-indigo-50 ring-1 ring-indigo-200" : "hover:bg-slate-100"
        }`}
        style={{ paddingLeft: 4 + depth * 14 }}
      >
        {hasChildren ? (
          <button
            onClick={() => onToggle(node.id)}
            className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
            aria-label={open ? "Thu gọn" : "Mở rộng"}
          >
            {open ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
          </button>
        ) : (
          <span className="w-[22px] flex-shrink-0 flex justify-center">
            <span className={`h-1.5 w-1.5 rounded-full ${isSelected ? "bg-indigo-500" : "bg-slate-300"}`} />
          </span>
        )}
        <button
          onClick={() => onSelect(node.id)}
          className="flex-1 min-w-0 flex items-center justify-between gap-2 py-1.5 text-left cursor-pointer"
        >
          <span className="min-w-0">
            <span
              className={`block truncate ${
                depth === 0 ? "text-[13px] font-extrabold text-slate-800" : isSelected ? "text-xs font-bold text-indigo-700" : "text-xs font-medium text-slate-600"
              }`}
            >
              {node.label}
            </span>
            {depth === 0 && node.hint && <span className="block truncate text-[10px] text-slate-400">{node.hint}</span>}
          </span>
          <Badge stat={stat} active={isSelected} />
        </button>
      </div>
      {hasChildren && open && (
        <ul className="space-y-0.5 mt-0.5">
          {node.children!.map((c) => (
            <NodeRow key={c.id} node={c} depth={depth + 1} stats={stats} selected={selected} onSelect={onSelect} expanded={expanded} onToggle={onToggle} />
          ))}
        </ul>
      )}
    </li>
  );
};

export const AlgoTree: React.FC<AlgoTreeProps> = (props) => {
  const { nodes, rootStat, selected, onSelect, onExpandAll } = props;
  return (
    <nav aria-label="Cây chủ đề" className="bg-white rounded-2xl border border-slate-200 shadow-xs p-3">
      <div className="flex items-center justify-between px-1 pb-2 border-b border-slate-100 mb-2">
        <span className="flex items-center gap-1.5 text-xs font-extrabold text-slate-800 uppercase tracking-wider">
          <FolderTree className="h-4 w-4 text-indigo-600" /> Chủ đề
        </span>
        <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-500">
          <button onClick={() => onExpandAll(true)} className="hover:text-indigo-600 cursor-pointer">Mở hết</button>
          <span>·</span>
          <button onClick={() => onExpandAll(false)} className="hover:text-indigo-600 cursor-pointer">Thu gọn</button>
        </span>
      </div>
      <button
        onClick={() => onSelect("all")}
        className={`w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg text-xs font-bold mb-1 cursor-pointer ${
          selected === "all" ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-700 hover:bg-slate-100"
        }`}
      >
        <span>Tất cả chủ đề</span>
        <span className={`px-1.5 py-0.5 rounded-md text-[10px] ${selected === "all" ? "bg-white/20" : "bg-slate-200 text-slate-600"}`}>
          {rootStat.solved}/{rootStat.total}
        </span>
      </button>
      <ul className="space-y-0.5">
        {nodes.map((n) => (
          <NodeRow key={n.id} node={n} depth={0} stats={props.stats} selected={selected} onSelect={onSelect} expanded={props.expanded} onToggle={props.onToggle} />
        ))}
      </ul>
    </nav>
  );
};
