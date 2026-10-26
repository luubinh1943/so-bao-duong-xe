# SỔ BẢO DƯỠNG XE — PWA v2.0.0

Ứng dụng iPhone/Android quản lý bảo dưỡng xe máy theo km. Offline sau khi tải lần đầu qua HTTPS. **Không cần tài khoản**, **không gửi dữ liệu cá nhân lên GitHub**.

## Những thay đổi trong phiên bản 2.0.0

1. **Giữ dữ liệu cũ**: tiếp tục đọc và ghi vào khóa `so-bao-duong-xe-v1` và định dạng dữ liệu `version: 1`, phù hợp với phiên bản PWA ban đầu. Không đặt lại mốc km hoặc lịch sử khi tải phiên bản mới.
2. **Bản dự phòng trong điện thoại**: trước khi lưu thay đổi mới, ứng dụng cố gắng lưu lại một bản dữ liệu hợp lệ cũ trong `so-bao-duong-xe-v1-recovery`. Nếu dữ liệu chính lỗi, ứng dụng đọc bản dự phòng và báo cho bạn. Đây chỉ là bản lưu cục bộ, **không thay thế sao lưu ra tệp**.
3. **Sao lưu JSON v2**: chứa dữ liệu, thời điểm xuất, phiên bản phần mềm và mã kiểm tra FNV-1a để phát hiện tệp bị thay đổi/hỏng. Đây **không phải chữ ký bảo mật** và tệp không được mã hóa. Vẫn chấp nhận nhập tệp JSON thuần từ bản PWA v1.
4. **Nhập/khôi phục an toàn hơn**: kiểm tra định dạng, kiểm tra mã lỗi, thông báo tóm tắt dữ liệu, hai lần xác nhận trước khi thay thế, cố gắng giữ bản cũ nội bộ.
5. **Chế độ bảo vệ dữ liệu**: nếu cả bản chính và bản dự phòng đều không đọc được, ứng dụng không tự đặt lại và ghi đè lên dữ liệu gốc. Bạn có thể xuất dữ liệu thô hoặc nhập bản sao JSON đã lưu.
6. **Cập nhật giao diện và offline**: Service Worker có cache theo phiên bản, chỉ xóa cache **mã nguồn** cũ (không xóa `localStorage`). Cập nhật SW khi khởi động hoặc khi vào lại ứng dụng lúc có mạng. Khi phát hiện phiên bản mã nguồn mới, ứng dụng đưa ra nút tải lại để áp dụng; có nút kiểm tra trong Cài đặt.
7. **Lưu sang ứng dụng Tệp**: nút “Chia sẻ / Lưu vào Tệp” dùng chức năng chia sẻ tệp của thiết bị (nếu được hỗ trợ); nút “Xuất bản sao” cho phép tải `.json`.

## Bộ file triển khai

Giữ đúng 5 tệp ở thư mục GỐC của repository GitHub Pages:

- `index.html` (giao diện + dữ liệu)
- `sw.js` (Service Worker offline + cơ chế nâng cấp)
- `manifest.webmanifest` (cấu hình ứng dụng)
- `icon-192.png`
- `icon-512.png`

`README.md` và `HUONG_DAN_CAP_NHAT.md` chỉ để đọc, không bắt buộc phải tải lên GitHub.

### Nếu bạn chưa có GitHub Pages

1. Đăng nhập GitHub, tạo repository **Public** tên ví dụ `so-bao-duong-xe`.
2. Trong repository chọn **Add file → Upload files**; kéo 5 tệp ở trên từ thư mục giải nén vào trang, không tải ZIP hay cả thư mục bọc.
3. Nhấn **Commit changes** hoặc **Propose changes** tùy giao diện.
4. **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: main / (root) → Save**.
5. Đợi GitHub Pages hoàn tất, mở `https://TEN_TAI_KHOAN.github.io/so-bao-duong-xe/` bằng Safari trên iPhone, chọn **Chia sẻ → Thêm vào Màn hình chính**. Bật **Mở dưới dạng ứng dụng web** nếu xuất hiện.
6. Mở app khi có mạng, sau đó thử bật chế độ máy bay và mở lại.

### Nếu bạn ĐÃ cài bản PWA cũ và muốn cập nhật KHÔNG MẤT DỮ LIỆU

**Trên iPhone trước tiên:**

1. Mở **biểu tượng app cũ** trên Màn hình chính, không tự động giả định Safari đang sử dụng cùng kho dữ liệu.
2. Trong **Cài đặt → Xuất bản sao** lưu tệp `.json` trong **Tệp / iCloud Drive / Trên iPhone** hay chép về Windows. Kiểm tra tệp thực sự tồn tại trước khi làm tiếp. Nếu phiên bản quá cũ chưa có nút sao lưu, không xóa ứng dụng, hãy liên hệ người làm ứng dụng để hỗ trợ lấy dữ liệu.
3. Ghi lại số km và một vài mốc bảo dưỡng để đối chiếu.

**Trên Windows:**

4. Giải nén `SoBaoDuongXe_PWA_v2.zip`.
5. Vào repository GitHub CŨ chứa bản PWA đang chạy. **Không tạo repository mới, không đổi tên repository, không chuyển app sang địa chỉ khác**.
6. Chọn **Add file → Upload files**; kéo đúng 5 tệp của bản v2 lên cùng thư mục chứa tệp cũ. Khi trùng tên phải là thao tác **thay thế** tệp cũ trên GitHub, không tạo tệp như `index (1).html` hoặc để trong thư mục con.
7. Commit trực tiếp vào nhánh `main`. Chờ GitHub Pages hoàn tất triển khai.
8. Kiểm tra địa chỉ cũ bằng trình duyệt Windows; vào Cài đặt, thấy **Phiên bản 2.0.0** là server đã có mã mới.

**Trở lại iPhone:**

9. Kết nối Internet rồi mở lại **biểu tượng ứng dụng đang có**, không gỡ/cài lại.
10. Có thể phải tắt/mở lại ứng dụng một vài lần do bản Service Worker cũ ưu tiên cache. Bản v2 tự kích hoạt Service Worker mới sau khi tải đủ các tệp; **đừng xóa lịch sử Safari hoặc dữ liệu website** để ép cập nhật.
11. Khi thấy nút **Tải lại ứng dụng**, nhấn để áp dụng. Vào **Cài đặt** kiểm tra **Phiên bản 2.0.0**.
12. Đối chiếu km, chu kỳ và số lần bảo dưỡng. Nếu không đúng, vào **Cài đặt → Khôi phục từ tệp**, chọn bản sao đã xuất ở bước 2.
13. Thử bật chế độ máy bay, mở app để xác nhận offline còn hoạt động.

## 3 quy tắc quan trọng

- **Giữ nguyên đường dẫn**: địa chỉ HTTPS, `index.html`, đường dẫn `sw.js`, cấu hình `id`, `start_url`, `scope` của manifest. Chuyển domain hay đổi tên repo có thể tạo vùng lưu dữ liệu khác.
- **Không xóa app hoặc dữ liệu website** để cập nhật. Dữ liệu cục bộ có thể bị hệ điều hành giải phóng. Dù ứng dụng đã có bản dự phòng ở localStorage, cả hai bản có thể mất nếu xóa storage.
- **Lưu sao lưu ra bên ngoài ứng dụng** sau mỗi đợt bảo dưỡng, trước cập nhật lớn và trước khi đổi điện thoại. Tệp sao lưu là văn bản JSON, ai có tệp có thể xem dữ liệu; cất tại nơi bạn tin tưởng.

### Giới hạn và lưu ý

- Không có server dữ liệu và không tự đồng bộ giữa iPhone, Safari và Android. Nếu mở cùng URL ở ngữ cảnh lưu trữ khác, dữ liệu có thể khác nhau. Dùng xuất/nhập JSON để chuyển.
- Không thể đảm bảo 100% chống mất dữ liệu khi bộ nhớ trình duyệt hoặc thiết bị bị xóa/hỏng. Chỉ bản sao đã lưu ngoài điện thoại mới bảo vệ các trường hợp đó.
- FNV-1a dùng kiểm tra thay đổi ngoài ý muốn, **không phải** xác thực chống giả mạo.
- Giữ bí mật tệp sao lưu; không tải nó vào repository GitHub công khai.
- Trình duyệt có thể cần đóng/mở lại app để nhận cập nhật, và thời gian triển khai GitHub Pages có thể thay đổi.
