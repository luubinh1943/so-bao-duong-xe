# Sổ bảo dưỡng xe – PWA offline

Ứng dụng web dành cho iPhone, chỉ lưu dữ liệu trên máy, không dùng máy chủ dữ liệu, tài khoản, API hoặc thư viện từ Internet.

## 12 chu kỳ mặc định

| Hạng mục | Chu kỳ |
|---|---:|
| Lốp trước | 25.000 km |
| Lốp sau | 20.000 km |
| Dầu máy | 2.000 km |
| Dầu phanh | 20.000 km |
| Dầu láp | 5.000 km |
| Bugi | 15.000 km |
| Lọc gió | 10.000 km |
| Búa côn | 25.000 km |
| Dây curoa | 25.000 km |
| Bi côn | 15.000 km |
| Nước làm mát | 20.000 km |
| Má phanh | 15.000 km |

Các con số là thông số người dùng nhập ban đầu, không phải khuyến cáo chung cho mọi xe. Có thể sửa từng chu kỳ.

## Sử dụng trên iPhone

Để cài như một ứng dụng từ màn hình chính và hoạt động khi không có mạng, bạn phải phục vụ các file trong thư mục **qua HTTPS** ít nhất một lần. Một cách đơn giản là đưa nguyên bộ file `index.html`, `sw.js`, `manifest.webmanifest`, `icon-192.png`, `icon-512.png` lên dịch vụ hosting tĩnh có HTTPS (ví dụ GitHub Pages). Không được thay đổi tên hoặc vị trí tương đối của các file.

1. Mở đường dẫn HTTPS của bộ file bằng **Safari** trên iPhone khi có Internet.
2. Nhấn **Chia sẻ > Thêm vào Màn hình chính** (Add to Home Screen), sau đó mở biểu tượng mới.
3. Mở và dùng app một lần trong lúc còn mạng để trình duyệt lưu bộ file ứng dụng vào bộ nhớ offline.
4. Sau đó có thể dùng bình thường mà không cần Internet. Chức năng offline dựa trên Service Worker, vốn không hoạt động khi chỉ mở file `index.html` trực tiếp bằng `file://`.

**Lưu ý về riêng tư:** Nếu dùng repo/hosting công khai, mã nguồn giao diện sẽ công khai, **nhưng dữ liệu bảo dưỡng bạn nhập không được tải lên máy chủ**; dữ liệu lưu riêng trong bộ nhớ ứng dụng/trình duyệt tại iPhone. Trình duyệt có thể xóa dữ liệu trang khi bạn xóa dữ liệu Safari hoặc gỡ ứng dụng. Vì vậy hãy xuất file sao lưu JSON định kỳ.

## Dùng trên máy tính để xem thử

Mở `index.html` trong trình duyệt. Chế độ lưu dữ liệu cục bộ cho file trên máy tính có thể phụ thuộc trình duyệt; tính năng offline PWA và Thêm vào màn hình chính trên iPhone vẫn cần HTTPS.

## Bắt đầu theo dõi

1. Nhấn **Cập nhật số km** rồi nhập tổng số km trên công-tơ-mét xe.
2. Chọn từng hạng mục, nhập **số km lần bảo dưỡng gần nhất** nếu biết. Nếu không biết thì để trống (chưa thiết lập) để tránh nhắc sai.
3. Ứng dụng tự tính **mốc tiếp theo = km bảo dưỡng gần nhất + chu kỳ**.
4. Khi đã thay/sửa, chọn hạng mục và nhấn **Đã bảo dưỡng**: lưu lịch sử và bắt đầu chu kỳ mới từ km hiện tại.
5. Trong **Cài đặt**, xuất sao lưu trước khi cài lại ứng dụng/đổi điện thoại.

Cảnh báo “Sắp đến hạn” khi còn tối đa 10% chu kỳ, chặn trong khoảng 100–500 km. “Đến hạn” khi số km hiện tại >= mốc tiếp theo. Không có thông báo đẩy do ứng dụng không thể tự biết km mới của xe khi bạn chưa nhập.

## Sao lưu

Bấm **Cài đặt > Xuất bản sao**, cất file `.json` trong mục **Trên iPhone của tôi** / Files hoặc nơi lưu khác do bạn kiểm soát. Để khôi phục bấm **Nhập dữ liệu**. Chương trình hỏi xác nhận trước khi ghi đè toàn bộ dữ liệu cũ.

**Định dạng bản sao của bản PWA và dự án iOS SwiftUI hiện là hai định dạng khác nhau, không nhập chéo trực tiếp.**
