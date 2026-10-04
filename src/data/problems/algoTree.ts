import { AlgorithmProblem } from "../../types";

/**
 * Cây chủ đề của phần "Luyện Giải Đề Thuật Toán": Nhóm → Chủ đề → Mục con.
 * Mỗi bài thuộc đúng MỘT nút lá; bài tập trong cùng nút xếp từ dễ đến khó.
 */
export interface AlgoNode {
  id: string;
  label: string;
  hint?: string;          // mô tả ngắn hiện dưới tên nút
  children?: AlgoNode[];
}

export const ALGO_TREE: AlgoNode[] = [
  {
    id: "g-intro", label: "Nhập môn Python", hint: "Biến, phép toán, nhập xuất",
    children: [
      { id: "t1", label: "Chủ đề 1: Biến & Kiểu dữ liệu" },
      { id: "t2", label: "Chủ đề 2: Phép toán" },
      { id: "t3", label: "Chủ đề 3: Nhập, Xuất dữ liệu" }
    ]
  },
  {
    id: "g-control", label: "Cấu trúc điều khiển", hint: "Rẽ nhánh và vòng lặp",
    children: [
      {
        id: "t4", label: "Chủ đề 4: Rẽ nhánh if",
        children: [
          { id: "t4a", label: "if đơn" },
          { id: "t4b", label: "if – else" },
          { id: "t4c", label: "if – elif – else" },
          { id: "t4d", label: "if lồng nhau & nâng cao" }
        ]
      },
      {
        id: "t5", label: "Chủ đề 5: Vòng lặp",
        children: [
          { id: "t5a", label: "for & range()" },
          { id: "t5b", label: "Tổng, đếm, tích lũy" },
          { id: "t5c", label: "Vẽ hình, duyệt chuỗi, tìm max" },
          { id: "t5d", label: "for kết hợp if" },
          { id: "t5e", label: "while" },
          { id: "t5f", label: "break & continue" },
          { id: "t5g", label: "Bài tổng hợp vòng lặp" }
        ]
      }
    ]
  },
  { id: "g-func", label: "Hàm", hint: "def, return, tham số", children: [{ id: "t6", label: "Chủ đề 6: Hàm (Function)" }] },
  {
    id: "g-ds", label: "Cấu trúc dữ liệu", hint: "List, chuỗi, từ điển",
    children: [
      { id: "t7", label: "Chủ đề 7: List (Danh sách)" },
      { id: "t8", label: "Chủ đề 8: String (Chuỗi)" },
      { id: "t9", label: "Chủ đề 9: Dictionary (Từ điển)" }
    ]
  },
  {
    id: "g-algo", label: "Thuật toán cơ bản", hint: "Toán tin, tìm kiếm, sắp xếp",
    children: [
      {
        id: "t10", label: "Chủ đề 10: Thuật toán cơ bản",
        children: [
          { id: "t10a", label: "Toán số học & dãy số" },
          { id: "t10b", label: "Thuật toán kinh điển" }
        ]
      }
    ]
  },
  {
    id: "g-mix", label: "Đề tổng hợp", hint: "Tin học trẻ, HSG",
    children: [
      { id: "m-pri", label: "Tiểu học (Khối 3–5)" },
      {
        id: "m-sec", label: "THCS & HSG (Khối 6–9)",
        children: [
          { id: "m-sec-num", label: "Số học & dãy số" },
          { id: "m-sec-arr", label: "Mảng & chuỗi" },
          { id: "m-sec-opt", label: "Tối ưu: Prefix sum & tham lam" }
        ]
      }
    ]
  }
];

export const OTHER_NODE: AlgoNode = { id: "other", label: "Khác" };

/** Nút lá của từng bài (theo chủ đề, thẻ và mã bài). */
export const classifyProblem = (p: AlgorithmProblem): string => {
  const m = (p.topic || "").match(/Chủ đề\s*(\d+)/);
  const tags = (p.tags || []).join(" | ").toLowerCase();
  const hasTag = (...keys: string[]) => keys.some((k) => tags.includes(k.toLowerCase()));

  if (m) {
    const n = parseInt(m[1], 10);
    if (n === 4) {
      if (p.difficulty !== "Dễ") return "t4d";
      if (hasTag("if cơ bản")) return "t4a";
      if (hasTag("if-else") && !hasTag("elif")) return "t4b";
      return "t4c";
    }
    if (n === 5) {
      if (p.id === "cd5-bai-5" || hasTag("tổng hợp")) return "t5g";
      if (hasTag("while")) return "t5e";
      if (hasTag("break", "continue")) return "t5f";
      if (hasTag("for kết hợp if")) return "t5d";
      if (hasTag("vẽ hình", "hình vuông", "tam giác sao", "chuỗi", "tìm kiếm")) return "t5c";
      if (hasTag("tổng", "đếm", "cửu chương", "giai thừa")) return "t5b";
      return "t5a";
    }
    if (n === 10) return ["cd10-bai-6", "cd10-bai-8", "cd10-bai-9", "cd10-bai-10", "cd10-bai-12"].includes(p.id) ? "t10b" : "t10a";
    if ([1, 2, 3, 6, 7, 8, 9].includes(n)) return "t" + n;
  }
  if (p.id.startsWith("prob-pri-")) return "m-pri";
  if (p.id.startsWith("prob-sec-")) {
    const k = parseInt(p.id.slice(-2), 10);
    if ([1, 2, 3, 4, 8].includes(k)) return "m-sec-num";
    if ([5, 6, 7].includes(k)) return "m-sec-arr";
    return "m-sec-opt";
  }
  return "other";
};

/** Danh sách nút lá theo thứ tự hiển thị (để xếp bài theo lộ trình). */
export const flattenLeaves = (nodes: AlgoNode[] = ALGO_TREE): AlgoNode[] =>
  nodes.flatMap((n) => (n.children?.length ? flattenLeaves(n.children) : [n]));

/** Đường đi từ gốc đến nút (dùng cho breadcrumb và lọc theo nhánh). */
export const nodePath = (id: string, nodes: AlgoNode[] = ALGO_TREE, trail: AlgoNode[] = []): AlgoNode[] | null => {
  for (const n of nodes) {
    const here = [...trail, n];
    if (n.id === id) return here;
    if (n.children) {
      const r = nodePath(id, n.children, here);
      if (r) return r;
    }
  }
  return null;
};
