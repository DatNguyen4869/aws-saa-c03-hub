// Bộ Giáo Trình Chi Tiết Toàn Diện (Thay thế hoàn toàn việc phải đọc Cheat Sheet tiếng Anh hàn lâm)
window.DEEP_CONTENT_PART1 = {
  1: {
    jargon: [
      { term: "Principal (Chủ thể)", plain: "Trong tài liệu AWS hay viết 'The Principal requests access...' — Dịch bình dân: Principal chính là 'Ai đang đòi mở cửa?' (Có thể là 1 IAM User, 1 ứng dụng Java trên EC2, hoặc 1 tài khoản AWS khác)." },
      { term: "Authentication vs Authorization", plain: "Authentication (Xác thực) = Chứng minh bạn là ai (nhập username/password + mã MFA). Authorization (Phân quyền) = Sau khi vào cửa rồi, bạn được phép vào phòng nào (kiểm tra file JSON IAM Policy)." },
      { term: "ARN (Amazon Resource Name)", plain: "Giống như số Căn cước công dân duy nhất của từng tài nguyên trên AWS. Ví dụ: arn:aws:s3:::ten-bucket-cua-ban." },
      { term: "Managed Policy vs Inline Policy", plain: "Managed Policy = Bản nội quy dùng chung (gắn cho 10 người cùng lúc, sửa 1 chỗ cả 10 người cập nhật). Inline Policy = Giấy phép viết tay dán chặt vào duy nhất 1 người (xóa người đó là mất luôn policy)." },
      { term: "Permissions Boundary (Ranh giới quyền)", plain: "Trần quyền hạn tối đa. Ví dụ bạn cấp cho Dev quyền Admin (Allow *), nhưng đặt Permissions Boundary chỉ cho phép S3 và EC2 -> Kết quả Dev đó chỉ làm việc được trên S3 và EC2, không đụng được vào RDS!" }
    ],
    diagram: `
[Người dùng / Dev] 
       │
       ├── 1. Đăng nhập (Authentication) ──► Username + Password + Mã MFA 6 số
       │
       └── 2. Gọi lệnh AWS (Authorization) ──► AWS kiểm tra tất cả các IAM Policies:
                                                  ├── Có lệnh "Deny" tường minh nào không? ──► CÓ ──► CHẶN NGAY (Explicit Deny)!
                                                  ├── Có lệnh "Allow" nào không?           ──► CÓ ──► CHO PHÉP (Allow)!
                                                  └── Không nói gì cả?                     ──► CHẶN MẶC ĐỊNH (Implicit Deny)!`,
    deepSections: [
      {
        title: "1. Tại sao IAM là dịch vụ Global (Toàn cầu) và cấu trúc 4 thành phần cốt lõi?",
        content: "Khác với máy chủ EC2 phải chọn đặt ở Singapore hay Tokyo, <strong>IAM là dịch vụ Toàn cầu (Global Service)</strong> — bạn tạo 1 User là có hiệu lực trên toàn thế giới.<br>• <strong>Root Account</strong>: Tài khoản tạo ra đầu tiên bằng email. Nó có quyền tối thượng không thể bị giới hạn bởi IAM Policy. Do đó, quy tắc bắt buộc là: Cất Root đi, bật MFA cho Root, không tạo Access Key cho Root.<br>• <strong>IAM User</strong>: Đại diện cho 1 con người cụ thể (vd: <code>dat-dev</code>). Mặc định khi mới tạo ra, User này <strong>trắng tay (không có bất kỳ quyền gì - Implicit Deny)</strong>.<br>• <strong>IAM Group</strong>: Nhóm các Users cùng phòng ban (vd: <code>Java-Devs</code>, <code>DB-Admins</code>). Nhớ kỹ 2 luật: <strong>Group chỉ chứa User (không chứa được Group con)</strong>, và <strong>Group không phải là một Identity (không thể đăng nhập bằng tên Group hay cấp quyền trực tiếp cho Group trong S3 Bucket Policy)</strong>."
      },
      {
        title: "2. Giải phẫu một file JSON IAM Policy (Đề thi rất hay hỏi ý nghĩa từng dòng)",
        content: "Mỗi quy tắc phân quyền được viết bằng JSON gồm 5 trường:<br>• <code>Version</code>: Luôn là <code>2012-10-17</code>.<br>• <code>Effect</code>: Chỉ có 2 giá trị là <code>Allow</code> (Cho phép) hoặc <code>Deny</code> (Cấm).<br>• <code>Principal</code>: Ai được áp dụng (Chỉ xuất hiện trong <em>Resource-based policy</em> như S3 Bucket Policy; còn IAM Policy gắn thẳng vào User rồi thì không cần dòng Principal).<br>• <code>Action</code>: Mảng các hàm API được gọi, ví dụ <code>[\"s3:GetObject\", \"ec2:StartInstances\"]</code>.<br>• <code>Resource</code>: ARN của tài nguyên bị tác động (dấu <code>*</code> nghĩa là tất cả).<br>• <code>Condition</code> (Tùy chọn): Điều kiện đi kèm (Ví dụ: <code>\"aws:MultiFactorAuthPresent\": \"true\"</code> = Chỉ cho phép xóa máy chủ nếu đã đăng nhập bằng MFA, hoặc <code>\"aws:SourceIp\"</code> = Chỉ cho phép gọi từ dải IP văn phòng công ty)."
      },
      {
        title: "3. Quy tắc Đánh giá Quyền (Policy Evaluation Logic) – Nắm 3 bước này là làm đúng 100% câu hỏi IAM!",
        content: "Khi một User bấm nút xóa ổ cứng EBS, AWS sẽ gom tất cả các Policy mà User đó đang mang (từ Group, từ User, từ Permission Boundary, từ SCP của Organization) và chấm theo thứ tự:<br>1. <strong>Bắt đầu ở mức Mặc định Cấm (Implicit Deny)</strong>.<br>2. <strong>Quét tìm chữ <code>Effect: Deny</code> (Explicit Deny)</strong>: Chỉ cần có <strong>1 dòng Deny tường minh</strong> ở bất kỳ đâu → <strong>TỪ CHỐI NGAY LẬP TỨC</strong> (Không cần đọc tiếp các dòng Allow khác!).<br>3. <strong>Quét tìm chữ <code>Effect: Allow</code></strong>: Nếu không bị dính Explicit Deny và có ít nhất 1 lệnh Allow (nằm trong phạm vi Permission Boundary & SCP nếu có) → <strong>CHO PHÉP THỰC HIỆN</strong>."
      },
      {
        title: "4. Ba loại Policy trong AWS: AWS Managed vs Customer Managed vs Inline",
        content: "• <strong>AWS Managed Policy</strong>: Do AWS viết sẵn (như <code>AdministratorAccess</code>, <code>ReadOnlyAccess</code>). Bạn không sửa nội dung của nó được.<br>• <strong>Customer Managed Policy (Khuyên dùng nhất trong đề thi!)</strong>: Do chính bạn tự tạo ra để tái sử dụng cho nhiều Groups/Users/Roles, có quản lý phiên bản (Versioning & Rollback).<br>• <strong>Inline Policy</strong>: Gắn chết 1-1 vào duy nhất 1 User/Role. Khi xóa User đó thì Inline Policy biến mất theo."
      }
    ],
    quizzes: [
      {
        qEn: "An IAM user belongs to two IAM groups: 'Developers' and 'Contractors'. The 'Developers' group has a policy that allows all Amazon S3 actions (s3:*). The 'Contractors' group has a policy that explicitly denies s3:DeleteBucket. What happens when this user tries to delete an S3 bucket?",
        qVi: "Một IAM user thuộc cả 2 nhóm 'Developers' và 'Contractors'. Nhóm Developers cho phép mọi thao tác S3 (s3:*). Nhóm Contractors có lệnh cấm tường minh (Explicit Deny) hành động s3:DeleteBucket. Chuyện gì xảy ra khi user này xóa 1 S3 bucket?",
        options: [
          "A. Xóa thành công vì quyền Allow s3:* rộng hơn.",
          "B. Bị từ chối (Access Denied) vì lệnh Explicit Deny luôn ghi đè mọi lệnh Allow.",
          "C. Hệ thống hỏi xác nhận mã MFA trước khi xóa.",
          "D. Phụ thuộc vào việc user được thêm vào nhóm nào trước."
        ],
        correctIdx: 1,
        explanation: "Theo quy tắc vàng của AWS IAM: Một lệnh cấm tường minh (Explicit Deny) ở bất kỳ Policy nào sẽ LUÔN LUÔN thắng mọi lệnh Allow."
      },
      {
        qEn: "A company hires 20 new Java developers who need identical permissions to view Amazon CloudWatch logs and read from an S3 bucket. What is the MOST operationally efficient way to grant these permissions?",
        qVi: "Công ty tuyển 20 lập trình viên Java mới cần quyền giống hệt nhau để xem CloudWatch Logs và đọc S3 bucket. Cách nào tối ưu công sức vận hành nhất?",
        options: [
          "A. Tạo 20 Inline Policies gắn riêng cho từng IAM User.",
          "B. Tạo một IAM Group, gắn một Customer Managed Policy chứa các quyền cần thiết vào Group đó, rồi thêm 20 IAM Users vào Group.",
          "C. Chia sẻ chung một tài khoản IAM User cho cả 20 người cùng đăng nhập.",
          "D. Tạo 20 IAM Roles rồi gửi Access Key qua email cho từng người."
        ],
        correctIdx: 1,
        explanation: "Best Practice của AWS: Không bao giờ gắn Policy lẻ tẻ cho từng người hoặc dùng chung tài khoản. Hãy tạo IAM Group, gắn Customer Managed Policy vào Group rồi đưa Users vào Group."
      }
    ]
  },

  2: {
    jargon: [
      { term: "IAM Role vs IAM User", plain: "IAM User là 'con người' có mật khẩu cố định lâu dài. IAM Role là 'chiếc mũ quyền lực tạm thời' không có mật khẩu cố định — ai (hoặc máy chủ EC2 nào) đội chiếc mũ này lên sẽ được cấp 1 thẻ ra vào tạm thời có hạn từ 15 phút đến 12 tiếng." },
      { term: "AWS STS (Security Token Service)", plain: "Cỗ máy đứng đằng sau IAM Role. Khi EC2 hoặc User đội chiếc mũ IAM Role (gọi hàm AssumeRole), STS sẽ in ra bộ 3 chìa khóa tạm thời (AccessKeyId + SecretAccessKey + SessionToken) tự hủy khi hết giờ." },
      { term: "Identity Federation (SAML 2.0 / Active Directory)", plain: "Liên kết danh tính: Cho phép nhân viên dùng tài khoản Microsoft Active Directory sẵn có ở công ty để đăng nhập thẳng vào AWS mà không cần tạo lại hàng nghìn IAM Users trên AWS." },
      { term: "Cross-Account Access", plain: "Cho phép nhân viên ở Tài khoản AWS A nhảy sang làm việc trên Tài khoản AWS B bằng cách đội một chiếc mũ IAM Role đặt bên Tài khoản B." }
    ],
    diagram: `
[Ứng dụng Java trên EC2] ──(1. Xin token tự động qua Instance Metadata)──► [AWS STS]
                                                                               │
[S3 Bucket / DynamoDB]   ◄──(3. Gọi API kèm Token tạm thời an toàn)──── (2. Trả về Temporary Token)`,
    deepSections: [
      {
        title: "1. Tại sao CẤM nhúng Access Key vào code Java mà phải dùng IAM Role (Instance Profile)?",
        content: "Khi bạn chạy ứng dụng Spring Boot trên máy chủ EC2 và cần upload ảnh lên S3:<br>• <strong>Cách sai lầm (Đề thi luôn bẫy)</strong>: Tạo IAM User, lấy cặp <code>AWS_ACCESS_KEY_ID</code> và <code>AWS_SECRET_ACCESS_KEY</code> điền vào file <code>application.properties</code> hoặc biến môi trường. Nếu lộ code hoặc máy chủ bị hack, kẻ gian lấy được chìa khóa vĩnh viễn!<br>• <strong>Cách chuẩn AWS (Đáp án đúng 100% mọi đề thi)</strong>: Tạo một <strong>IAM Role</strong> (gắn quyền S3), sau đó gắn IAM Role này vào máy chủ EC2 (thông qua <em>EC2 Instance Profile</em>). Thư viện AWS SDK for Java bên trong code của bạn sẽ tự động lấy chìa khóa tạm thời từ địa chỉ nội bộ <code>http://169.254.169.254/latest/meta-data/iam/security-credentials/</code> và tự động gia hạn ngầm mà bạn không cần viết 1 dòng cấu hình mật khẩu nào!"
      },
      {
        title: "2. Khi nào dùng Resource-based Policy vs IAM Role (Cross-Account Access)?",
        content: "Giả sử Tài khoản A muốn truy cập vào một S3 Bucket (hoặc SQS Queue, SNS Topic, Lambda) nằm ở Tài khoản B. Có 2 cách:<br>• <strong>Cách 1 - Dùng IAM Role (AssumeRole)</strong>: User ở Tài khoản A tạm thời 'nhảy' sang đóng vai một IAM Role bên Tài khoản B. Khi đang đóng vai này, User sẽ <strong>tạm mất quyền cũ ở Tài khoản A</strong> và chỉ mang quyền của Role mới bên Tài khoản B.<br>• <strong>Cách 2 - Dùng Resource-based Policy (S3 Bucket Policy / SQS Queue Policy)</strong>: Gắn giấy phép trực tiếp lên S3 Bucket ở Tài khoản B cho phép User của Tài khoản A đọc/ghi. Ưu điểm lớn nhất: User ở Tài khoản A <strong>VỪA giữ nguyên được quyền ở Tài khoản A, VỪA thao tác được sang Tài khoản B cùng một lúc</strong> (rất tiện khi cần copy file từ S3 của Tài khoản A sang S3 của Tài khoản B!)."
      },
      {
        title: "3. Ba công cụ Kiểm toán Quyền của IAM (Hay hỏi ở Domain 1 - Security)",
        content: "• <strong>IAM Credentials Report</strong>: Báo cáo cấp độ toàn bộ Account (file CSV) cho biết danh sách mọi User, ai chưa bật MFA, ai có Access Key đã quá 90 ngày chưa đổi.<br>• <strong>IAM Access Advisor</strong>: Báo cáo cấp độ từng User/Role cho biết các dịch vụ được cấp quyền có thực sự được dùng hay không (ví dụ: Cấp quyền S3, EC2, RDS nhưng 6 tháng qua chỉ dùng mỗi S3 → Thu hồi quyền EC2 và RDS để đạt chuẩn <em>Least Privilege</em>).<br>• <strong>IAM Access Analyzer</strong>: Tự động quét xem có S3 Bucket, KMS Key hay IAM Role nào đang bị vô tình chia sẻ công khai ra ngoài tổ chức (External entities) hay không."
      }
    ],
    quizzes: [
      {
        qEn: "A Java application running on an Amazon EC2 instance needs to read and write items to an Amazon DynamoDB table. What is the MOST secure way to grant the application access to the DynamoDB table?",
        qVi: "Một ứng dụng Java chạy trên máy chủ EC2 cần đọc và ghi dữ liệu vào bảng DynamoDB. Cách nào AN TOÀN NHẤT để cấp quyền cho ứng dụng?",
        options: [
          "A. Tạo một IAM User, sinh Access Key và lưu vào file cấu hình mã hóa trên EC2.",
          "B. Tạo một IAM Role có quyền truy cập DynamoDB và gắn (attach) Role đó vào EC2 instance.",
          "C. Lưu Access Key vào S3 Bucket rồi cho EC2 tải về lúc khởi động qua User Data.",
          "D. Mở cổng DynamoDB trong Security Group của máy chủ EC2."
        ],
        correctIdx: 1,
        explanation: "Gắn IAM Role trực tiếp vào EC2 Instance (Instance Profile) giúp AWS SDK tự động sử dụng Temporary Credentials từ AWS STS mà không bao giờ phải lưu trữ Access Key cố định."
      },
      {
        qEn: "A security engineer wants to identify which IAM users in the company's AWS account have not rotated their access keys in the last 180 days and do not have MFA enabled. Which feature should the engineer use with the LEAST operational effort?",
        qVi: "Kỹ sư bảo mật muốn tìm danh sách các IAM users trong tài khoản chưa đổi Access Key trong 180 ngày qua và chưa bật MFA. Nên dùng tính năng nào tốn ít công sức nhất?",
        options: [
          "A. IAM Access Advisor",
          "B. IAM Credentials Report",
          "C. AWS CloudTrail Insights",
          "D. VPC Flow Logs"
        ],
        correctIdx: 1,
        explanation: "IAM Credentials Report xuất ra bảng tổng hợp toàn bộ Users trong tài khoản kèm ngày thay đổi mật khẩu/Access Key gần nhất và trạng thái bật/tắt MFA."
      }
    ]
  },

  3: {
    jargon: [
      { term: "AMI (Amazon Machine Image)", plain: "Bản ghost / khuôn đúc máy chủ: Chứa sẵn Hệ điều hành (Linux/Windows) + Phần mềm cài sẵn (Java, Docker, Nginx). Tạo 1 AMI chuẩn thì bật máy mới mất 10 giây không cần đợi cài lại phần mềm." },
      { term: "EC2 User Data (Bootstrapping)", plain: "Đoạn script (Bash trên Linux / PowerShell trên Windows) tự động chạy 1 lần duy nhất khi máy chủ vừa được khởi tạo lần đầu tiên để tự động cài đặt phần mềm." },
      { term: "Instance Metadata Service (IMDSv2)", plain: "Địa chỉ nội bộ đặc biệt (http://169.254.169.254) chỉ gọi được từ bên trong chính máy EC2 đó để máy tự hỏi thông tin của bản thân (IP của tôi là gì? Tôi đang ở AZ nào? IAM Role của tôi là gì?)." }
    ],
    diagram: `
[Bấm nút Launch EC2] ──► Chọn 1. AMI (Hệ điều hành)
                     ──► Chọn 2. Instance Type (M = Đa dụng, C = CPU, R = RAM, I = Ổ cứng IOPS)
                     ──► Chạy 3. EC2 User Data (Chạy 1 lần duy nhất dưới quyền root khi First Boot)`,
    deepSections: [
      {
        title: "1. Quy ước đặt tên dòng máy EC2 (Ví dụ: m5.2xlarge nghĩa là gì?)",
        content: "Trong tên <code>m5.2xlarge</code>:<br>• Chữ <code>m</code> là <strong>Họ máy (Instance Family)</strong>.<br>• Số <code>5</code> là <strong>Thế hệ phần cứng (Generation)</strong> (số càng to càng mới, rẻ hơn và mạnh hơn thế hệ cũ). Nếu có thêm chữ <code>g</code> như <code>m6g</code> nghĩa là dùng chip <strong>AWS Graviton (kiến trúc ARM)</strong> giúp tiết kiệm tới 40% chi phí/hiệu năng so với chip Intel!<br>• <code>2xlarge</code> là <strong>Kích cỡ (Size)</strong>: Tăng gấp đôi size thì số CPU và RAM tăng gấp đôi.<br><br><strong>Bảng nhớ nhanh 5 họ máy cho đề thi:</strong><br>• <strong>T / M (General Purpose)</strong>: Cân bằng CPU và RAM (Web server, App server, kho code Git).<br>• <strong>C (Compute Optimized)</strong>: Tỷ lệ CPU cực cao (Xử lý lô Batch,转 mã video Media transcoding, Web server tải cao, Gaming, Machine Learning inference).<br>• <strong>R / X / High Memory (Memory Optimized)</strong>: Dung lượng RAM cực lớn (Database quan hệ lớn, In-memory cache như Redis/Memcached, phân tích Big Data thời gian thực).<br>• <strong>I / D (Storage Optimized)</strong>: Có ổ cứng vật lý NVMe tốc độ đọc ghi ngẫu nhiên (IOPS) cực khủng (NoSQL như Cassandra/MongoDB, OLTP database, Data warehouse).<br>• <strong>P / G / Inf (Accelerated Computing)</strong>: Có card đồ họa GPU (Huấn luyện mô hình Deep Learning / AI, đồ họa 3D)."
      },
      {
        title: "2. EC2 User Data vs Golden AMI: Khi nào dùng cái nào?",
        content: "• <strong>EC2 User Data</strong>: Khi máy chủ đầu tiên bật lên, nó chạy script tải JDK, tải code từ S3, cài đặt mất khoảng 3–5 phút. Phù hợp khi muốn linh hoạt cập nhật phần mềm mới nhất mỗi lần bật máy.<br>• <strong>Golden AMI (Custom AMI)</strong>: Nếu hệ thống Auto Scaling cần bật máy mới lên để đỡ tải <strong>ngay lập tức trong vài chục giây</strong> mà việc chạy script User Data cài đặt phần mềm mất tới 15 phút (quá chậm!) → Giải pháp trong đề thi là: <strong>Cài đặt sẵn mọi thứ vào 1 máy EC2 rồi đóng gói thành một Custom AMI (Golden AMI)</strong>. Lưu ý: AMI bị gắn theo từng Region, muốn dùng ở Region khác phải <em>Copy AMI sang Region đó</em>."
      },
      {
        title: "3. Instance Metadata (169.254.169.254) vs Instance User Data",
        content: "Đề thi đôi khi hỏi: <em>'Ứng dụng chạy bên trong EC2 muốn lấy địa chỉ Public IP hoặc tên Availability Zone của chính máy chủ đó thì gọi vào đâu?'</em><br>• Gọi vào <strong>Instance Metadata</strong> tại <code>http://169.254.169.254/latest/meta-data/</code> (phiên bản bảo mật mới là <strong>IMDSv2</strong> yêu cầu tạo Session Token bằng lệnh <code>PUT</code> trước khi <code>GET</code> để chống lỗi bảo mật SSRF).<br>• Còn muốn xem lại đoạn script khởi động của máy đó thì gọi <code>http://169.254.169.254/latest/user-data/</code>."
      }
    ],
    quizzes: [
      {
        qEn: "An Auto Scaling group launches new EC2 instances during traffic spikes, but the instances take 15 minutes to become healthy because the EC2 User Data script downloads and compiles large software packages. How can a solutions architect reduce the launch time to under 2 minutes?",
        qVi: "Cụm Auto Scaling bật thêm máy EC2 khi lưu lượng tăng đột biến, nhưng mất tới 15 phút máy mới sẵn sàng vì script User Data phải tải và biên dịch các gói phần mềm rất nặng. Làm sao giảm thời gian khởi động xuống dưới 2 phút?",
        options: [
          "A. Đổi sang dòng máy EC2 R5 có nhiều RAM hơn.",
          "B. Cài đặt sẵn toàn bộ phần mềm lên một máy EC2, tạo một Custom AMI (Golden AMI) từ máy đó, rồi cập nhật Launch Template dùng AMI mới này.",
          "C. Chuyển đoạn script từ EC2 User Data sang lưu trên S3.",
          "D. Gắn thêm một ổ cứng EBS phụ vào máy chủ."
        ],
        correctIdx: 1,
        explanation: "Đóng gói sẵn hệ điều hành và các phần mềm nặng thành một Custom AMI (hoặc dùng EC2 Image Builder) giúp máy mới bật lên là chạy được ngay không cần chờ tải và cài đặt lại."
      }
    ]
  },

  4: {
    jargon: [
      { term: "Stateful Firewall (Tường lửa có trạng thái)", plain: "Người bảo vệ có trí nhớ: Nếu bạn đã được phép đi qua cửa chiều VÀO, lúc bạn quay RA người bảo vệ nhớ mặt bạn và cho đi thẳng không cần hỏi lại giấy tờ." },
      { term: "Inbound vs Outbound Traffic", plain: "Inbound (Ingress) = Lưu lượng từ bên ngoài chui VÀO máy EC2 của bạn. Outbound (Egress) = Lưu lượng từ bên trong máy EC2 của bạn chủ động gọi RA ngoài." },
      { term: "Security Group Referencing", plain: "Thay vì mở cửa cho một địa chỉ IP cố định (vd 10.0.1.15), bạn mở cửa cho 'Bất kỳ máy chủ nào đeo phù hiệu Security Group của Tầng Web'." }
    ],
    diagram: `
[Người dùng Internet] 
       │ (Cổng 443 HTTPS)
       ▼
┌─────────────────────────────────────────┐
│ ALB Security Group (Inbound: 443 từ 0/0)│
└──────────────────┬──────────────────────┘
                   │ (Cổng 8080)
                   ▼
┌──────────────────────────────────────────────────────────┐
│ App EC2 Security Group (Inbound: 8080 CHỈ TỪ ALB-SG)     │
└──────────────────┬───────────────────────────────────────┘
                   │ (Cổng 3306 MySQL)
                   ▼
┌──────────────────────────────────────────────────────────┐
│ RDS DB Security Group (Inbound: 3306 CHỈ TỪ App-EC2-SG)  │
└──────────────────────────────────────────────────────────┘`,
    deepSections: [
      {
        title: "1. Mọi quy tắc ngầm định của Security Group mà bạn phải thuộc",
        content: "• Khi bạn tạo mới một Security Group: Mặc định nó <strong>chặn toàn bộ chiều vào (0 Inbound rules)</strong> và <strong>cho phép toàn bộ chiều ra (Outbound Allow 0.0.0.0/0 mọi cổng)</strong>.<br>• Security Group <strong>chỉ chứa các quy tắc Cho phép (Allow)</strong>. Bạn không thể viết một quy tắc 'Cấm IP 1.2.3.4' trong Security Group (muốn cấm đích danh 1 IP phải dùng <em>Network ACL</em> ở tầng Subnet hoặc <em>AWS WAF</em>).<br>• Một máy EC2 có thể gắn nhiều Security Groups cùng lúc (quyền được cộng gộp lại). Một Security Group bị khóa trong phạm vi 1 VPC."
      },
      {
        title: "2. Thiết kế chuỗi Security Group 3 tầng chuẩn mực (3-Tier Architecture)",
        content: "Trong đề thi SAA-C03 rất hay hỏi cách khóa bảo mật giữa 3 tầng (Load Balancer → Web/App EC2 → Database RDS) sao cho người ngoài không thể nhảy cóc vào thẳng EC2 hay Database:<br>1. <strong>SG của Load Balancer (ALB-SG)</strong>: Mở Inbound cổng <code>80/443</code> cho nguồn <code>0.0.0.0/0</code> (toàn bộ Internet).<br>2. <strong>SG của máy chủ Java (App-SG)</strong>: Mở Inbound cổng <code>8080</code> nhưng ở cột Source (Nguồn), <strong>KHÔNG điền IP mà điền mã <code>ALB-SG</code></strong>! Như vậy dù máy EC2 có IP gì, chỉ có gói tin đi qua ALB mới chạm được vào cổng 8080.<br>3. <strong>SG của Database (DB-SG)</strong>: Mở Inbound cổng <code>3306</code> và cột Source điền mã <strong><code>App-SG</code></strong>!"
      },
      {
        title: "3. Bắt bệnh khi không SSH hoặc không gọi được vào EC2",
        content: "• Nếu màn hình treo một lúc rồi báo <strong><code>Connection Timed Out</code></strong> → Gói tin bị tường lửa chặn đứng dọc đường (Kiểm tra ngay <strong>Security Group</strong> chưa mở cổng, hoặc <strong>Network ACL</strong> chặn, hoặc <strong>Route Table</strong> thiếu đường ra Internet Gateway).<br>• Nếu báo lỗi ngay lập tức <strong><code>Connection Refused</code></strong> → Đã đi xuyên qua Security Group thành công vào tới tận cửa máy EC2 rồi, nhưng dịch vụ/ứng dụng bên trong EC2 chưa bật hoặc đang lắng nghe ở cổng khác!"
      }
    ],
    quizzes: [
      {
        qEn: "A 3-tier web application consists of an Application Load Balancer (ALB), a fleet of EC2 instances in an Auto Scaling group, and an Amazon RDS MySQL database. How should the solutions architect configure the security groups to ensure that the EC2 instances only accept traffic from the ALB?",
        qVi: "Ứng dụng web 3 tầng gồm ALB, dàn máy chủ EC2 tự động co giãn (Auto Scaling) và cơ sở dữ liệu RDS MySQL. Cấu hình Security Group như thế nào để đảm bảo các máy EC2 chỉ nhận lưu lượng đi qua từ ALB?",
        options: [
          "A. Trong Inbound rule của EC2 Security Group, cho phép cổng HTTP từ địa chỉ IP tĩnh của ALB.",
          "B. Trong Inbound rule của EC2 Security Group, cho phép cổng HTTP với nguồn (Source) là Security Group ID của ALB.",
          "C. Tạo một Network ACL chặn toàn bộ lưu lượng trừ tên miền DNS của ALB.",
          "D. Bật tính năng Sticky Sessions trên ALB."
        ],
        correctIdx: 1,
        explanation: "Vì địa chỉ IP của ALB có thể thay đổi linh hoạt, cách chuẩn xác và an toàn nhất là tham chiếu trực tiếp Security Group ID của ALB làm Source trong Inbound Rule của EC2 Security Group."
      }
    ]
  },

  5: {
    jargon: [
      { term: "Steady-state Workload", plain: "Tải chạy đều đặn, ổn định 24/7 quanh năm suốt tháng (ví dụ máy chủ Database chính luôn phải bật). Cụm từ này luôn dẫn tới đáp án Reserved Instances hoặc Savings Plans." },
      { term: "Fault-tolerant & Stateless Workload", plain: "Tác vụ không lưu trạng thái trên máy và chịu được sự cố tắt máy đột ngột (ví dụ: lấy 1 ảnh từ S3 xuống resize rồi đẩy lại lên S3; nếu máy đang làm bị tắt thì máy khác làm lại từ đầu không sao cả). Cụm từ này luôn dẫn tới Spot Instances." },
      { term: "BYOL (Bring Your Own License)", plain: "Mang bản quyền phần mềm có sẵn dưới công ty lên mây (như Windows Server, SQL Server, Oracle tính tiền theo số nhân/socket vật lý của máy chủ). Cụm từ này luôn dẫn tới Dedicated Hosts." }
    ],
    diagram: `
Bài toán Chi phí EC2 trong đề thi:
 ├── Chạy 24/7 ổn định suốt 1 - 3 năm? ──────────────► Savings Plans / Reserved Instances (Giảm ~72%)
 ├── Xử lý Batch / Render ảnh / Chịu được tắt đột ngột? ─► Spot Instances (Giảm ~90% - Rẻ nhất!)
 ├── Đòi hỏi kiểm soát Socket/Core vật lý (BYOL)? ───► Dedicated Hosts
 └── Chạy ngắn hạn vài ngày, không được phép tắt? ───► On-Demand`,
    deepSections: [
      {
        title: "1. Phân biệt rõ Reserved Instances (Standard vs Convertible) và Savings Plans",
        content: "Cả hai đều yêu cầu bạn cam kết sử dụng trong <strong>1 năm hoặc 3 năm</strong> để đổi lấy mức giảm giá lên tới 72%:<br>• <strong>Standard Reserved Instances (RI)</strong>: Giảm giá nhiều nhất trong dòng RI, nhưng khóa cứng vào 1 dòng máy (vd <code>m5</code>). Không đổi sang dòng máy khác được (nhưng có thể đem bán lại trên <em>RI Marketplace</em>).<br>• <strong>Convertible Reserved Instances</strong>: Giảm giá ít hơn một chút (~66%), nhưng cho phép bạn <strong>đổi sang dòng máy EC2 khác, hệ điều hành khác</strong> khi nhu cầu thay đổi.<br>• <strong>Compute Savings Plans (Hiện đại & Linh hoạt nhất)</strong>: Thay vì cam kết loại máy, bạn chỉ cam kết <em>'Tôi sẽ tiêu tối thiểu $10/giờ'</em>. Bạn có thể tự do đổi loại máy EC2, đổi Region, thậm chí chuyển từ EC2 sang dùng <strong>AWS Fargate (Containers) hoặc AWS Lambda</strong> mà vẫn được hưởng giá chiết khấu!"
      },
      {
        title: "2. Cơ chế hoạt động của Spot Instances & Spot Fleet",
        content: "• Với <strong>Spot Instances</strong>, bạn mua lại năng lực tính toán đang nhàn rỗi của AWS với mức chiết khấu lên tới <strong>90%</strong>.<br>• <strong>Rủi ro duy nhất</strong>: Khi AWS cần lấy lại máy để bán cho khách On-Demand (hoặc giá Spot vượt mức tối đa bạn đặt), AWS sẽ gửi một <strong>thông báo cảnh báo trước 2 phút (2-minute interruption notice)</strong> rồi thu hồi máy (Stop, Hibernate hoặc Terminate).<br>• <strong>Spot Fleet</strong>: Giúp bạn gộp nhiều dòng máy Spot khác nhau ở nhiều AZ lại thành 1 đội; dùng chiến lược <code>capacityOptimized</code> (chọn bể máy nào đang dư thừa nhiều nhất để giảm thiểu tối đa nguy cơ bị thu hồi) hoặc <code>lowestPrice</code> (rẻ nhất)."
      },
      {
        title: "3. Phân biệt Dedicated Instances vs Dedicated Hosts (Rất hay bẫy!)",
        content: "Cả hai đều đảm bảo máy ảo EC2 của bạn chạy trên phần cứng vật lý <strong>chỉ dành riêng cho công ty bạn (không dùng chung với khách hàng khác)</strong>. Nhưng:<br>• <strong>Dedicated Instances</strong>: AWS tự quản lý máy vật lý, nếu bạn Stop rồi Start lại máy thì nó có thể nhảy sang một tủ server vật lý khác. Bạn <strong>KHÔNG nhìn thấy được số lượng Socket hay Physical Cores</strong>.<br>• <strong>Dedicated Hosts</strong>: Bạn thuê đứt 1 cái xác máy chủ vật lý cụ thể. Bạn nhìn thấy rõ từng Socket, từng Core vật lý, kiểm soát việc đặt máy ảo nào vào đó (Host Affinity). <strong>Bắt buộc phải chọn Dedicated Hosts khi đề bài nhắc tới bản quyền phần mềm tính theo lõi vật lý (BYOL - per-socket / per-core licenses) hoặc yêu cầu kiểm toán phần cứng nghiêm ngặt</strong>."
      }
    ],
    quizzes: [
      {
        qEn: "A company runs a nightly batch processing job that takes 3 hours to complete. The job is stateless, can be interrupted and restarted without data loss, and must run at the lowest possible compute cost. Which EC2 purchasing option should the solutions architect recommend?",
        qVi: "Công ty chạy một tác vụ xử lý lô hàng đêm mất 3 giờ. Tác vụ này không lưu trạng thái (stateless), có thể bị ngắt quãng và chạy lại mà không mất dữ liệu, yêu cầu chi phí tính toán thấp nhất có thể. Nên chọn hình thức mua EC2 nào?",
        options: [
          "A. On-Demand Instances",
          "B. Standard Reserved Instances (1-year term)",
          "C. Spot Instances",
          "D. Dedicated Hosts"
        ],
        correctIdx: 2,
        explanation: "Với các tác vụ xử lý lô (Batch jobs) có tính chất Stateless và chịu được việc bị gián đoạn (Fault-tolerant), Spot Instances luôn là lựa chọn tiết kiệm chi phí nhất (giảm tới 90%)."
      },
      {
        qEn: "An enterprise needs to migrate an on-premises database to Amazon EC2. The database software has a strict Bring Your Own License (BYOL) policy that is licensed based on the number of physical CPU sockets and cores on the underlying server. Which EC2 option meets this requirement?",
        qVi: "Doanh nghiệp cần đưa một cơ sở dữ liệu từ dưới công ty lên EC2. Phần mềm DB này có chính sách bản quyền BYOL nghiêm ngặt tính theo số lượng đế cắm CPU (sockets) và nhân vật lý (physical cores) của máy chủ. Tuỳ chọn EC2 nào đáp ứng được?",
        options: [
          "A. Dedicated Instances",
          "B. Dedicated Hosts",
          "C. On-Demand Capacity Reservations",
          "D. Compute Savings Plans"
        ],
        correctIdx: 1,
        explanation: "Chỉ có EC2 Dedicated Hosts mới cung cấp khả năng hiển thị và kiểm soát trực tiếp số lượng Physical Sockets và Cores của máy chủ vật lý để phục vụ bài toán BYOL."
      }
    ]
  },

  6: {
    jargon: [
      { term: "ENI (Elastic Network Interface)", plain: "Card mạng ảo cắm vào máy chủ EC2 (chứa địa chỉ Private IP, Public IP, địa chỉ vật lý MAC, và gắn kèm Security Group)." },
      { term: "Placement Group", plain: "Cách bạn ra lệnh cho AWS sắp xếp vị trí đứng của các máy chủ EC2 bên trong tòa nhà Data Center (Đứng sát vách nhau cho mạng nhanh, hay đứng cách xa nhau ra để tránh chết chùm)." },
      { term: "HPC (High Performance Computing)", plain: "Siêu máy tính tính toán hiệu năng cao (dự báo thời tiết, mô phỏng tài chính, giải mã gen) cần hàng chục máy chủ truyền dữ liệu cho nhau với tốc độ cực đại và độ trễ gần bằng 0." }
    ],
    diagram: `
3 Chiến lược EC2 Placement Groups:
1. [CLUSTER]   : [EC2][EC2][EC2] (Chung 1 tủ Rack, chung 1 AZ) ──► Mạng 10Gbps cực nhanh (HPC), sập Rack là chết hết!
2. [SPREAD]    : [EC2 ở Rack 1] ... [EC2 ở Rack 2] ... [EC2 ở Rack 3] ──► Khác phần cứng 100%, Tối đa 7 máy/AZ!
3. [PARTITION] : [Rack A: 50 máy EC2]  |  [Rack B: 50 máy EC2] ──► Tối đa 7 phân vùng/AZ, chứa hàng trăm máy (Kafka/Hadoop)`,
    deepSections: [
      {
        title: "1. Chuyện gì xảy ra với địa chỉ IP khi bạn Stop, Start hay Reboot máy EC2?",
        content: "• <strong>Private IPv4</strong>: Được gắn vĩnh viễn cho máy EC2 đó từ lúc tạo cho đến khi bạn xóa bỏ (Terminate) máy.<br>• <strong>Public IPv4 mặc định</strong>: Khi bạn bấm <strong><code>Reboot</code> (Khởi động lại hệ điều hành)</strong> thì Public IP vẫn giữ nguyên. Nhưng nếu bạn bấm <strong><code>Stop</code> (Tắt máy) rồi <code>Start</code> lại</strong>, máy EC2 sẽ nhả Public IP cũ ra và nhận một Public IP mới tinh!<br>• <strong>Elastic IP (EIP)</strong>: Địa chỉ Public IPv4 tĩnh cố định thuộc sở hữu của bạn (giữ nguyên kể cả khi Stop máy, và có thể tháo nhanh từ máy EC2 bị hỏng gắn sang máy EC2 dự phòng). Nhớ: <strong>EIP hoàn toàn miễn phí khi gắn vào máy EC2 đang chạy, nhưng sẽ bị tính phí phạt nếu để không hoặc gắn vào máy đang Stopped</strong>."
      },
      {
        title: "2. Phân biệt sâu 3 loại Placement Groups (Đề thi rất chuộng hỏi phần này)",
        content: "• <strong>1. Cluster Placement Group</strong>: Nhét tất cả máy EC2 vào cùng một khu vực mạng tốc độ cao trong <strong>duy nhất 1 AZ</strong>. Đạt băng thông 10 Gbps – 100 Gbps và độ trễ micro-giây. Chọn ngay khi thấy từ khóa: <strong>HPC (High Performance Computing), low-latency, high-throughput network between nodes</strong>.<br>• <strong>2. Spread Placement Group</strong>: Đặt mỗi máy EC2 lên một tủ phần cứng (Rack) có nguồn điện và mạng tách biệt hoàn toàn. Trải rộng được qua nhiều AZ. <strong>Giới hạn cứng cần thuộc lòng: Tối đa chỉ được 7 instances đang chạy trên mỗi AZ!</strong> Chọn khi có một số lượng nhỏ các máy chủ cực kỳ quan trọng không được phép sập cùng lúc.<br>• <strong>3. Partition Placement Group</strong>: Chia các máy EC2 thành các nhóm hợp lý gọi là <em>Partitions</em> (tối đa 7 partitions mỗi AZ, trải qua nhiều AZ). Các Partition không dùng chung tủ Rack với nhau, nhưng mỗi Partition chứa được hàng trăm máy EC2. Chọn ngay khi thấy tên các hệ thống dữ liệu phân tán lớn: <strong>Apache Hadoop, HDFS, HBase, Apache Kafka, Apache Cassandra</strong>."
      },
      {
        title: "3. Elastic Network Interface (ENI) dùng để làm gì trong đề thi?",
        content: "Mỗi card mạng ảo ENI giữ một địa chỉ Private IP cố định và có thể gắn kèm một Elastic IP hoặc một địa chỉ MAC riêng (phục vụ phần mềm khóa bản quyền theo địa chỉ MAC). Trong bài toán Failover thủ công giữa 2 máy EC2 trong <strong>cùng 1 AZ</strong>, người ta có thể tháo card mạng ENI phụ (Secondary ENI) từ máy chính đang bị lỗi cắm sang máy dự phòng để chuyển hướng toàn bộ lưu lượng mạng ngay lập tức."
      }
    ],
    quizzes: [
      {
        qEn: "A company is deploying a large distributed Apache Kafka cluster of 60 EC2 instances across 3 Availability Zones. To prevent simultaneous data loss from a single hardware rack failure, the architecture requires that groups of instances are isolated on separate racks with independent power and network. Which placement group should be used?",
        qVi: "Công ty triển khai cụm Apache Kafka phân tán lớn gồm 60 máy EC2 trải trên 3 AZ. Để tránh mất dữ liệu đồng thời khi 1 tủ rack phần cứng gặp sự cố, kiến trúc yêu cầu chia các nhóm máy chủ nằm trên các tủ rack riêng biệt có nguồn điện và mạng độc lập. Nên dùng Placement Group nào?",
        options: [
          "A. Cluster Placement Group",
          "B. Spread Placement Group",
          "C. Partition Placement Group",
          "D. Auto Scaling Placement Group"
        ],
        correctIdx: 2,
        explanation: "Vì có tới 60 máy EC2 trên 3 AZ (20 máy/AZ), bạn KHÔNG THỂ dùng Spread Placement Group (vì Spread giới hạn tối đa 7 máy/AZ). Partition Placement Group là lựa chọn hoàn hảo cho Kafka/Hadoop/Cassandra quy mô lớn."
      }
    ]
  }
};

Object.assign(window.DEEP_CONTENT_PART1, {
  7: {
    jargon: [
      { term: "In-Memory State (RAM State)", plain: "Dữ liệu đang nằm trực tiếp trên thanh RAM của máy chủ (ví dụ biến toàn cục, bộ nhớ đệm cache đã mất công tính toán suốt 15 phút lúc khởi động)." },
      { term: "AWS Nitro System", plain: "Nền tảng ảo hóa phần cứng thế hệ mới nhất của AWS giúp máy ảo EC2 chạy nhanh gần bằng máy vật lý thật và bảo mật hơn." }
    ],
    diagram: `
[Đang chạy: RAM có 32GB Cache] ──(Bấm Hibernate)──► Chép 32GB RAM xuống ổ [Root EBS Volume (Phải mã hóa!)] ──► Tắt máy (Không tốn tiền EC2)
                                                                                      │
[Khởi động lại siêu tốc trong vài giây!] ◄────────── Nạp ngược từ EBS lên RAM ────────┘`,
    deepSections: [
      {
        title: "1. Phân biệt rõ Stop vs Terminate vs Hibernate trên EC2",
        content: "• <strong>Stop (Tắt máy thường)</strong>: Hệ điều hành tắt, dữ liệu trên thanh RAM bị xóa sạch. Ổ cứng gắn kèm (EBS) vẫn giữ nguyên. Lúc bật lại (Start), hệ điều hành và ứng dụng Java phải khởi động lại từ con số 0.<br>• <strong>Terminate (Xóa máy)</strong>: Hủy bỏ hoàn toàn máy ảo EC2. Mặc định ổ đĩa cài hệ điều hành (Root EBS Volume) sẽ bị xóa theo luôn (trừ khi bạn bỏ tích ô <em>Delete on Termination</em>), còn các ổ EBS phụ gắn thêm thì được giữ lại.<br>• <strong>Hibernate (Ngủ đông)</strong>: Giữ nguyên toàn bộ trạng thái các tiến trình đang chạy trên RAM bằng cách ghi toàn bộ nội dung RAM xuống ổ đĩa Root EBS trước khi tắt máy."
      },
      {
        title: "2. Các điều kiện kỹ thuật của EC2 Hibernate mà đề thi hay hỏi",
        content: "Để bật được EC2 Hibernate, máy chủ của bạn phải thỏa mãn:<br>1. Dung lượng RAM của máy phải <strong>nhỏ hơn 150 GB</strong>.<br>2. Ổ đĩa <strong>Root EBS Volume bắt buộc phải có đủ dung lượng trống</strong> để chứa toàn bộ bản dump của RAM.<br>3. Ổ đĩa <strong>Root EBS Volume BẮT BUỘC PHẢI ĐƯỢC MÃ HÓA (Encrypted)</strong> để bảo vệ dữ liệu nhạy cảm trên RAM khi ghi xuống đĩa.<br>4. Thời gian ngủ đông tối đa không quá <strong>60 ngày</strong>."
      }
    ],
    quizzes: [
      {
        qEn: "A legacy Java application running on an EC2 instance takes 12 minutes to initialize its in-memory cache upon startup. The instance is only needed during business hours. How can the solutions architect minimize the startup time each morning while saving compute costs overnight?",
        qVi: "Một ứng dụng Java cũ chạy trên EC2 mất 12 phút để nạp bộ nhớ đệm lên RAM mỗi khi khởi động. Máy chủ chỉ cần dùng trong giờ hành chính. Làm sao giảm tối đa thời gian bật máy mỗi sáng mà vẫn tiết kiệm tiền máy chủ ban đêm?",
        options: [
          "A. Dùng EC2 Stop/Start thông thường kết hợp Placement Group.",
          "B. Bật tính năng EC2 Hibernate (với ổ Root EBS đã được mã hóa) để ngủ đông máy chủ vào ban đêm.",
          "C. Chuyển sang dùng ổ cứng EC2 Instance Store.",
          "D. Tạo EBS Snapshot mỗi tối và khôi phục lại mỗi sáng."
        ],
        correctIdx: 1,
        explanation: "EC2 Hibernate lưu trạng thái in-memory (RAM) xuống ổ Root EBS được mã hóa, giúp máy bật lại vào sáng hôm sau giữ nguyên cache trong RAM mà không tốn tiền thuê CPU/RAM ban đêm."
      }
    ]
  },

  8: {
    jargon: [
      { term: "Block Storage (Lưu trữ dạng khối)", plain: "Giống như ổ cứng C:, D: trong máy tính của bạn. Hệ điều hành có thể chia phân vùng, format định dạng ext4/XFS/NTFS và cài đặt phần mềm hay Database trực tiếp lên đó." },
      { term: "Incremental Backup (Sao lưu gia tăng)", plain: "Lần chụp Snapshot đầu tiên lưu 100GB. Lần chụp thứ 2 nếu chỉ có 5GB dữ liệu mới thay đổi thì AWS chỉ lưu đúng 5GB đó thôi (giúp tiết kiệm tối đa tiền lưu trữ S3)!" },
      { term: "AZ-bound (Khóa chặt theo từng AZ)", plain: "Ổ EBS nằm ở nhà máy điện us-east-1a thì dây cáp của nó chỉ cắm được vào máy chủ EC2 cũng nằm ở us-east-1a." }
    ],
    diagram: `
[AZ-a: EC2 #1] ◄──(Gắn trực tiếp)──► [Ổ đĩa EBS ở AZ-a]
                                            │
                                 (Chụp EBS Snapshot lên S3)
                                            ▼
[AZ-b: EC2 #2] ◄──(Gắn ổ mới)─────── [Khôi phục thành ổ EBS mới ở AZ-b]`,
    deepSections: [
      {
        title: "1. Đặc tính cốt lõi của Amazon EBS (Elastic Block Store)",
        content: "• EBS là ổ đĩa mạng (Network drive) gắn vào máy chủ EC2 thông qua mạng nội bộ của AWS.<br>• Vì đi qua mạng nên nó có độ trễ nhỏ (vài mili-giây), nhưng bù lại dữ liệu cực kỳ an toàn: Ngay cả khi máy chủ EC2 bị hỏng phần cứng, bạn chỉ việc tháo ổ EBS ra cắm sang một máy EC2 khác trong <strong>cùng 1 Availability Zone (AZ)</strong>.<br>• Bạn có thể <strong>tăng dung lượng và tăng hiệu năng của ổ EBS đang chạy (Live volume modification)</strong> mà không cần tắt máy hay tháo ổ đĩa!"
      },
      {
        title: "2. Toàn bộ tính năng của EBS Snapshot cần nhớ để đi thi",
        content: "• <strong>Di chuyển liên AZ / liên Region</strong>: Để copy một ổ EBS từ <code>ap-southeast-1a</code> sang <code>ap-southeast-1b</code> (hoặc sang Region Tokyo), bạn chụp <strong>EBS Snapshot</strong> rồi tạo Volume mới từ Snapshot đó ở nơi đến.<br>• <strong>Mã hóa ổ EBS chưa mã hóa</strong>: Bạn không thể bấm 1 nút biến ổ EBS đang chạy từ chưa mã hóa thành có mã hóa. Cách làm đúng là: <strong>Chụp EBS Snapshot → Copy Snapshot đó và tích chọn Encrypt (hoặc tạo Volume mới từ Snapshot và tích chọn Encrypt) → Gắn ổ mới vào EC2</strong>.<br>• <strong>Amazon Data Lifecycle Manager (DLM)</strong>: Công cụ tự động hóa việc lập lịch chụp và xóa EBS Snapshot định kỳ hàng ngày/tuần (Đừng nhầm với S3 Lifecycle Policy!).<br>• <strong>EBS Snapshot Archive</strong> (tiết kiệm 75% phí lưu trữ cho snapshot giữ lâu trên 90 ngày, khôi phục mất 24–72h) & <strong>Fast Snapshot Restore (FSR)</strong> (làm nóng sẵn snapshot để ổ EBS mới đạt 100% tốc độ IOPS ngay giây đầu tiên)."
      }
    ],
    quizzes: [
      {
        qEn: "A solutions architect needs to automate the creation and retention of daily Amazon EBS snapshots for a fleet of EC2 instances, deleting snapshots older than 30 days with minimal operational overhead. Which AWS service or feature should be used?",
        qVi: "Kiến trúc sư cần tự động hóa việc chụp EBS Snapshot hàng ngày cho dàn máy EC2 và tự động xóa các bản snapshot cũ quá 30 ngày với ít công sức vận hành nhất. Nên dùng tính năng nào?",
        options: [
          "A. S3 Lifecycle Policy",
          "B. Amazon Data Lifecycle Manager (DLM)",
          "C. AWS Storage Gateway",
          "D. EC2 Auto Scaling Lifecycle Hooks"
        ],
        correctIdx: 1,
        explanation: "Amazon Data Lifecycle Manager (DLM) là tính năng chuyên dụng miễn phí giúp tự động tạo, giữ lại và xóa định kỳ các bản EBS Snapshots và EBS-backed AMIs."
      }
    ]
  },

  9: {
    jargon: [
      { term: "IOPS (Input/Output Operations Per Second)", plain: "Số lần đọc/ghi ngẫu nhiên mỗi giây. Cơ sở dữ liệu (MySQL, Oracle, MongoDB) cực kỳ khát chỉ số IOPS này!" },
      { term: "Throughput (MB/s)", plain: "Tổng lưu lượng megabyte truyền đi mỗi giây. Phù hợp khi đọc các file video lớn hoặc quét log tuần tự từ đầu đến cuối." },
      { term: "Ephemeral Storage", plain: "Lưu trữ phù du / tạm thời (tức là EC2 Instance Store): Tắt máy (Stop) là bay màu sạch dữ liệu!" }
    ],
    diagram: `
Chọn loại ổ cứng cho EC2:
 ├── Cần > 16,000 IOPS (hoặc tới 256,000 IOPS cho DB khủng)? ──► EBS io1 / io2 Block Express
 ├── Cần gắn 1 ổ EBS vào nhiều máy EC2 trong CÙNG 1 AZ?      ──► EBS io1 / io2 (Bật Multi-Attach)
 ├── Cần SSD đa dụng giá rẻ, chỉnh IOPS độc lập dung lượng?   ──► EBS gp3
 ├── Cần đọc dữ liệu tuần tự Big Data / Log giá rẻ (HDD)?    ──► EBS st1 (Throughput) / sc1 (Cold)
 └── Cần hàng triệu IOPS làm Cache/Buffer tạm thời?          ──► EC2 Instance Store (NVMe vật lý)`,
    deepSections: [
      {
        title: "1. So sánh chi tiết gp2 vs gp3 và io1 vs io2 (Đề thi rất hay hỏi con số 16,000 IOPS)",
        content: "• <strong>EBS gp2 (Thế hệ cũ)</strong>: Dung lượng ổ càng to thì IOPS mới càng cao (3 IOPS cho mỗi GB, tối đa <strong>16,000 IOPS</strong>). Muốn tăng IOPS buộc phải mua thêm dung lượng GB dù không dùng hết.<br>• <strong>EBS gp3 (Thế hệ mới - Mặc định khuyên dùng)</strong>: Rẻ hơn gp2 20%, mặc định có sẵn 3,000 IOPS và 125 MB/s bất kể ổ to hay nhỏ. Bạn có thể <strong>tăng IOPS lên tối đa 16,000 IOPS và Throughput lên 1,000 MB/s hoàn toàn độc lập với dung lượng ổ đĩa</strong>.<br>• <strong>EBS io1 / io2 Block Express (Provisioned IOPS SSD)</strong>: Khi đề bài yêu cầu hiệu năng <strong>trên 16,000 IOPS</strong> (ví dụ: 25,000 IOPS hoặc 64,000 IOPS, lên tới 256,000 IOPS với io2 Block Express) hoặc yêu cầu độ bền 99.999% (Sub-millisecond latency) → Bắt buộc phải chọn <strong>io1 / io2</strong>!"
      },
      {
        title: "2. Tính năng EBS Multi-Attach (Gắn 1 ổ đĩa vào nhiều máy EC2)",
        content: "• Thông thường, 1 ổ EBS chỉ gắn được cho duy nhất 1 máy EC2.<br>• Nhưng nếu bạn dùng ổ loại <strong><code>io1</code> hoặc <code>io2</code></strong>, bạn có thể bật <strong>EBS Multi-Attach</strong> để gắn đồng thời ổ đó vào <strong>tối đa 16 máy EC2 nằm trong CÙNG 1 Availability Zone</strong>.<br>• <strong>Bẫy đề thi</strong>: Khi dùng EBS Multi-Attach, hệ thống file chuẩn của Linux (như <code>ext4</code>, <code>XFS</code>) KHÔNG hỗ trợ việc nhiều máy cùng ghi vào 1 ổ đĩa (sẽ gây hỏng file ngay). Bạn bắt buộc phải cài đặt một <strong>Cluster-aware file system (Hệ thống file nhận biết cụm, như GFS2 hoặc Oracle OCFS2)</strong>!"
      }
    ],
    quizzes: [
      {
        qEn: "A production relational database runs on an EC2 instance using a 1 TB gp2 EBS volume. The database is experiencing I/O bottlenecks and requires 12,000 IOPS consistently, but does not need additional storage capacity. What is the MOST cost-effective way to meet the performance requirement?",
        qVi: "Một cơ sở dữ liệu chạy trên EC2 đang dùng ổ EBS gp2 dung lượng 1 TB (chỉ đạt 3,000 IOPS). Hiện DB bị nghẽn I/O và cần 12,000 IOPS ổn định nhưng không cần tăng thêm dung lượng lưu trữ. Cách nào tiết kiệm chi phí nhất?",
        options: [
          "A. Tăng dung lượng ổ gp2 từ 1 TB lên 4 TB để đạt 12,000 IOPS.",
          "B. Chuyển đổi ổ đĩa sang loại gp3 và cấu hình 12,000 IOPS độc lập mà vẫn giữ nguyên dung lượng 1 TB.",
          "C. Chuyển sang ổ EBS io2 Block Express.",
          "D. Chuyển dữ liệu sang ổ cứng cơ học st1."
        ],
        correctIdx: 1,
        explanation: "Vì mức 12,000 IOPS vẫn nằm dưới ngưỡng tối đa 16,000 IOPS của gp3, việc chuyển từ gp2 sang gp3 cho phép tăng riêng chỉ số IOPS lên 12,000 mà không cần mua thừa dung lượng hay trả giá đắt cho io2."
      }
    ]
  },

  10: {
    jargon: [
      { term: "NFS (Network File System) & POSIX", plain: "Chuẩn chia sẻ thư mục mạng trên hệ điều hành Linux. Nhiều máy chủ Linux có thể mount chung 1 thư mục và đọc/ghi file cùng lúc như thể thư mục đó nằm trên máy mình." },
      { term: "General Purpose vs Max I/O Mode (EFS)", plain: "General Purpose = Độ trễ thấp cho từng file (Web server, CMS, WordPress). Max I/O = Thông lượng tổng cực lớn cho hàng nghìn máy cùng đọc dữ liệu lớn (Big Data, Media)." }
    ],
    diagram: `
   [AZ-a: EC2 Linux #1] ──┐
   [AZ-b: EC2 Linux #2] ──┼──(Mount qua giao thức NFS / EFS Mount Target)──► [Amazon EFS (Tự động co giãn, Multi-AZ)]
   [AZ-c: ECS Fargate ] ──┘                                                         │
                                                                    (Sau 30 ngày không mở file)
                                                                                    ▼
                                                                      [Tầng EFS Standard-IA (Giảm 90% phí!)]`,
    deepSections: [
      {
        title: "1. Tại sao Amazon EFS là đáp án vàng cho bài toán 'Nhiều máy Linux chia sẻ file qua nhiều AZ'?",
        content: "• Khác với EBS (chỉ nằm ở 1 AZ), <strong>Amazon EFS tự động trải rộng trên nhiều AZ (Multi-AZ)</strong>. Bạn đặt một <em>Mount Target</em> ở mỗi AZ để hàng trăm máy EC2, container ECS hoặc hàm Lambda cùng truy cập chung một kho file.<br>• Bạn không cần khai báo trước dung lượng ổ đĩa: Dùng bao nhiêu GB trả tiền bấy nhiêu, tự động phình to tới hàng Petabyte.<br>• <strong>Kiểm soát truy cập vào EFS</strong>: Dùng <strong>Security Group</strong> (mở cổng <strong>2049</strong> của giao thức NFS) kết hợp với <em>EFS Access Points</em> và IAM Policy."
      },
      {
        title: "2. Các chế độ Hiệu năng (Performance Modes) & Thông lượng (Throughput Modes) của EFS",
        content: "• <strong>Performance Modes</strong>:<br>  1. <code>General Purpose</code> (Mặc định): Độ trễ thấp nhất cho từng thao tác file (Web serving, WordPress, CMS, thư mục code).<br>  2. <code>Max I/O</code>: Đánh đổi độ trễ tăng nhẹ để lấy tổng số IOPS cao nhất khi có hàng trăm/nghìn máy chủ cùng đọc ghi song song (Big Data, Media processing).<br>• <strong>Throughput Modes</strong>:<br>  1. <code>Elastic</code> (Mới & Khuyên dùng cho tải thất thường): Tự động co giãn thông lượng theo nhu cầu.<br>  2. <code>Bursting</code>: Dung lượng file càng nhiều thì băng thông càng lớn.<br>  3. <code>Provisioned</code>: Khai báo băng thông MB/s cao cố định ngay cả khi dung lượng dữ liệu lưu trữ rất ít."
      }
    ],
    quizzes: [
      {
        qEn: "A company hosts a content management system (CMS) on a fleet of Linux EC2 instances distributed across three Availability Zones behind an Application Load Balancer. All instances must read and write user-uploaded documents to a shared POSIX-compliant file system concurrently. Which storage solution should be used?",
        qVi: "Công ty chạy hệ thống quản trị nội dung (CMS) trên dàn máy Linux EC2 trải rộng qua 3 AZ phía sau ALB. Tất cả các máy chủ phải đọc và ghi tài liệu do người dùng tải lên vào chung một hệ thống file chuẩn POSIX đồng thời. Chọn giải pháp lưu trữ nào?",
        options: [
          "A. Amazon EBS io2 với tính năng Multi-Attach.",
          "B. Amazon EFS (Elastic File System).",
          "C. Amazon S3 Standard.",
          "D. Amazon FSx for Windows File Server."
        ],
        correctIdx: 1,
        explanation: "EBS Multi-Attach chỉ hoạt động trong CÙNG 1 AZ. Để chia sẻ hệ thống file POSIX đồng thời cho nhiều máy Linux EC2 trải trên NHIỀU AZ (Multi-AZ), đáp án duy nhất đúng là Amazon EFS."
      }
    ]
  }
});

// Tự động làm giàu (Auto-Enrich) cho tất cả các buổi học còn lại để buổi nào cũng có Từ điển thuật ngữ, Bài giảng chi tiết và Câu hỏi Quiz tương tác!
window.addEventListener("DOMContentLoaded", function enrichAllRemainingSessions() {
  if (!window.STUDY_DATA || !window.STUDY_DATA.sessions) return;
  window.STUDY_DATA.sessions.forEach(function (s) {
    const manual = window.DEEP_CONTENT_PART1[s.id];
    if (manual) {
      s.jargon = manual.jargon;
      s.diagram = manual.diagram;
      s.deepSections = manual.deepSections;
      s.quizzes = manual.quizzes;
    } else {
      // Tạo cấu trúc bài giảng chi tiết đầy đủ từ dữ liệu mở rộng của buổi học
      s.jargon = s.jargon || [
        {
          term: "High Availability (HA) vs Fault Tolerance",
          plain: "High Availability = Sập 1 máy/AZ thì hệ thống tự chuyển sang máy dự phòng ở AZ khác trong vài chục giây. Fault Tolerance = Không có bất kỳ giây gián đoạn nào (Zero downtime)."
        },
        {
          term: "Least Operational Overhead",
          plain: "Cụm từ xuất hiện nhiều nhất đề thi! Nghĩa là: 'Cách nào làm cho lập trình viên nhàn nhất, không phải tự cài đặt, vá lỗi hay quản lý máy chủ?' -> Luôn ưu tiên dịch vụ Managed hoặc Serverless!"
        }
      ];

      s.deepSections = s.deepSections || s.corePoints.map(function (pt, idx) {
        return {
          title: "Phần " + (idx + 1) + ": Phân tích chi tiết kiến thức & Cơ chế hoạt động",
          content: pt + "<br><br>💡 <strong>Giải thích dễ hiểu (Không hàn lâm)</strong>: Trong đề thi SAA-C03, bạn không cần nhớ câu lệnh cấu hình chi tiết của tính năng này. Điều giám khảo kiểm tra là khi bài toán đưa ra yêu cầu về <em>Chi phí (Cost)</em>, <em>Hiệu năng (Performance)</em> hay <em>Độ sẵn sàng (Availability)</em>, bạn biết chính xác tại sao tính năng này được chọn thay vì các phương án nhiễu khác."
        };
      });

      s.quizzes = s.quizzes || s.cards.map(function (c, idx) {
        return {
          qEn: "Scenario Question #" + (idx + 1) + " (" + s.title + "): " + c.q,
          qVi: "Câu hỏi thực chiến #" + (idx + 1) + ": " + c.q,
          options: [
            "A. " + c.a,
            "B. Tự cài đặt thủ công phần mềm tương đương trên một máy chủ EC2 đơn lẻ ở 1 AZ (Sai vì tốn công vận hành và thiếu High Availability).",
            "C. Lưu trữ tạm thời vào bộ nhớ EC2 Instance Store (Sai vì dữ liệu sẽ mất khi máy chủ dừng).",
            "D. Sử dụng AWS Classic Load Balancer thế hệ cũ (Sai vì AWS không khuyến nghị cho kiến trúc mới)."
          ],
          correctIdx: 0,
          explanation: "Đáp án chuẩn SAA-C03: " + c.a
        };
      });
    }
  });
});
