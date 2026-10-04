# -*- coding: utf-8 -*-
# Lời giải mẫu cho các bài chưa có lời giải (trước đây mã khởi tạo chỉ có TODO).
SOLUTIONS = {
"prob-pri-01": '''m = int(input())
x = int(input())
y = int(input())

tong = x * 8000 + y * 5000 + 4000      # vở + bút chì + thước kẻ
print(tong)
if m >= tong:
    print(m - tong)
else:
    print("KHONG DU TIEN")
''',
"prob-pri-02": '''t = int(input())   # tổng số con
c = int(input())   # tổng số chân

# Giả sử tất cả đều là gà (2 chân): thiếu c - 2t chân, mỗi con chó hơn gà 2 chân
if c % 2 != 0 or c < 2 * t or c > 4 * t:
    print("VO NGHIEM")
else:
    cho = (c - 2 * t) // 2
    ga = t - cho
    print(ga, cho)
''',
"prob-pri-03": '''a = int(input())
d = int(input())
n = int(input())

so_hang_n = a + (n - 1) * d              # số hạng thứ n
tong = n * (2 * a + (n - 1) * d) // 2    # tổng n số hạng đầu
print(so_hang_n)
print(tong)
''',
"prob-pri-04": '''s = input().strip()

print(int(s[::-1]))                   # số đảo ngược (int bỏ các chữ số 0 ở đầu)
print(sum(int(ch) for ch in s))       # tổng các chữ số
print("DUNG" if s == s[::-1] else "SAI")
''',
"prob-pri-05": '''a = int(input())
b = int(input())

print(a * b)            # diện tích
print((2 * (a + b)) // 2)   # chu vi / 2 = số cọc
''',
"prob-pri-06": '''s = input()

hoa = thuong = so = 0
for ch in s:
    if ch.isupper():
        hoa += 1
    elif ch.islower():
        thuong += 1
    elif ch.isdigit():
        so += 1
print(hoa, thuong, so)
''',
"prob-pri-07": '''n = int(input())

dem = n // 15                         # các bội của 15: 15, 30, ..., 15*dem
tong = 15 * dem * (dem + 1) // 2
print(dem)
print(tong)
''',
"prob-pri-08": '''s = float(input())
v1 = float(input())
v2 = float(input())
t = float(input())

t_rua = s / v1
t_tho = s / v2 + t          # thời gian chạy + thời gian ngủ

if abs(t_rua - t_tho) < 1e-9:
    print("HOA")
    print(f"{t_rua:.2f}")
elif t_rua < t_tho:
    print("RUA")
    print(f"{t_rua:.2f}")
else:
    print("THO")
    print(f"{t_tho:.2f}")
''',
"prob-sec-01": '''l, r = map(int, input().split())

# Sàng Eratosthenes đến r
la_nt = [True] * (r + 1)
la_nt[0] = False
if r >= 1:
    la_nt[1] = False
for p in range(2, int(r ** 0.5) + 1):
    if la_nt[p]:
        for boi in range(p * p, r + 1, p):
            la_nt[boi] = False

nt = [i for i in range(l, r + 1) if la_nt[i]]
print(len(nt))
print(sum(nt))
''',
"prob-sec-02": '''import math

a, b = map(int, input().split())

g = math.gcd(a, b)           # UCLN (thuật toán Euclid)
print(g)
print(a * b // g)            # BCNN
print(a // g, b // g)        # phân số tối giản
''',
"prob-sec-03": '''n = int(input())
k = int(input())

# Sinh các số Fibonacci cho đến vượt quá 10^9
fib = [0, 1, 1]
while fib[-1] <= 10 ** 9:
    fib.append(fib[-1] + fib[-2])

print(fib[n])
print("CO" if k in fib else "KHONG")
''',
"prob-sec-04": '''n = int(input())

# Số chữ số 0 tận cùng của n! = số thừa số 5 = n//5 + n//25 + n//125 + ...
dem = 0
while n > 0:
    n //= 5
    dem += n
print(dem)
''',
"prob-sec-05": '''n, k = map(int, input().split())
a = list(map(int, input().split()))

tan_suat = {}
dem = 0
for x in a:
    dem += tan_suat.get(k - x, 0)        # các số đã gặp có thể ghép với x
    tan_suat[x] = tan_suat.get(x, 0) + 1
print(dem)
''',
"prob-sec-06": '''s = input()

chuan_hoa = "".join(ch.lower() for ch in s if ch.isalnum())
print(chuan_hoa)
print("YES" if chuan_hoa == chuan_hoa[::-1] else "NO")
''',
"prob-sec-07": '''s = input().strip()

kq = []
i = 0
while i < len(s):
    j = i
    while j < len(s) and s[j] == s[i]:    # tìm hết dãy ký tự giống nhau
        j += 1
    kq.append(str(j - i) + s[i])
    i = j
print("".join(kq))
''',
"prob-sec-08": '''n = int(input())

ket_qua = []
for x in range(2, n + 1):
    tong = 1                              # 1 luôn là ước thực sự
    d = 2
    while d * d <= x:
        if x % d == 0:
            tong += d
            if d != x // d:
                tong += x // d
        d += 1
    if tong == x:
        ket_qua.append(x)

print(*ket_qua if ket_qua else ["KHONG CO"])
''',
"prob-sec-09": '''import sys

du_lieu = sys.stdin.read().split()
n, q = int(du_lieu[0]), int(du_lieu[1])
a = du_lieu[2:2 + n]

pref = [0] * (n + 1)
for i in range(n):
    pref[i + 1] = pref[i] + int(a[i])

kq = []
pos = 2 + n
for _ in range(q):
    l, r = int(du_lieu[pos]), int(du_lieu[pos + 1])
    pos += 2
    kq.append(pref[r] - pref[l - 1])
print("\\n".join(map(str, kq)))
''',
"prob-sec-10": '''s = int(input())

denominations = [500, 200, 100, 50, 20, 10, 5, 2, 1]
chi_tiet = []
tong_xu = 0
for coin in denominations:
    dem = s // coin          # tham lam: lấy nhiều nhất có thể mệnh giá lớn
    if dem > 0:
        chi_tiet.append(f"{coin} : {dem}")
        tong_xu += dem
        s %= coin

print(tong_xu)
for dong in chi_tiet:
    print(dong)
''',
}
# Bài cũ có test sai: nhập thiếu dòng x → bổ sung dòng x (không có trong dãy) cho khớp đáp án -1
TEST_INPUT_FIXES = {("cd10-bai-9", 2): "10\n5"}
