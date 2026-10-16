// Bộ Giáo Trình Chi Tiết Toàn Diện Phần 1 (Buổi 1 -> 10)
window.DEEP_CONTENT_PART1 = {
  1: {
    jargon: [
      { term: "Principal (Chủ thể)", plain: "Trong tài liệu AWS hay viết 'The Principal requests access...' — Dịch bình dân: Principal chính là 'Ai đang đòi mở cửa?' (Có thể là 1 IAM User, 1 ứng dụng Java trên EC2, hoặc 1 tài khoản AWS khác)." },
      { term: "Authentication vs Authorization", plain: "Authentication (Xác thực) = Chứng minh bạn là ai (nhập username/password + mã MFA). Authorization (Phân quyền) = Sau khi vào cửa rồi, bạn được phép vào phòng nào (kiểm tra file JSON IAM Policy)." },
      { term: "ARN (Amazon Resource Name)", plain: "Giống như số Căn cước công dân duy nhất của từng tài nguyên trên AWS. Ví dụ: arn:aws:s3:::ten-bucket-cua-ban." },
      { term: "Managed Policy vs Inline Policy", plain: "Managed Policy = Bản nội quy dùng chung (gắn cho 10 người cùng lúc, sửa 1 chỗ cả 10 người cập nhật). Inline Policy = Giấy phép viết tay dán chặt vào duy nhất 1 người (xóa người đó là mất luôn policy)." },
      { term: "Permissions Boundary (Ranh giới quyền)", plain: "Trần quyền hạn tối đa của 1 User/Role. Ví dụ bạn cấp cho Dev quyền Admin (Allow *), nhưng đặt Permissions Boundary chỉ cho phép S3 và EC2 -> Kết quả Dev đó chỉ làm việc được trên S3 và EC2 (giao thoa giữa 2 tập hợp), không đụng được vào RDS!" }
    ],
    diagram: `
[Người dùng / Dev] 
       │
       ├── 1. Đăng nhập (Authentication) ──► Username + Password + Mã MFA 6 số
       │
       └── 2. Gọi lệnh AWS (Authorization) ──► AWS kiểm tra giao thoa (Intersection) các IAM Policies:
                                                  ├── Có lệnh "Deny" tường minh nào không? ──► CÓ ──► CHẶN NGAY (Explicit Deny)!
                                                  ├── Nằm ngoài Permissions Boundary / SCP?──► CÓ ──► CHẶN MẶC ĐỊNH (Implicit Deny)!
                                                  ├── Có lệnh "Allow" hợp lệ nào không?    ──► CÓ ──► CHO PHÉP (Allow)!
                                                  └── Không nói gì cả?                     ──► CHẶN MẶC ĐỊNH (Implicit Deny)!`,
    deepSections: [
      {
        title: "1. Tại sao IAM là dịch vụ Global (Toàn cầu) và cấu trúc 4 thành phần cốt lõi?",
        content: "Khác với máy chủ EC2 phải chọn đặt ở Singapore hay Tokyo, <strong>IAM là dịch vụ Toàn cầu (Global Service)</strong> — bạn tạo 1 User là có hiệu lực trên toàn thế giới.<br>• <strong>Root Account</strong>: Tài khoản tạo ra đầu tiên bằng email. Nó có quyền tối thượng không thể bị giới hạn bởi IAM Policy. Do đó, quy tắc bắt buộc là: Cất Root đi, bật MFA cho Root, không tạo Access Key cho Root.<br>• <strong>IAM User</strong>: Đại diện cho 1 con người cụ thể (vd: <code>dat-dev</code>). Mặc định khi mới tạo ra, User này <strong>trắng tay (không có bất kỳ quyền gì - Implicit Deny)</strong>.<br>• <strong>IAM Group</strong>: Nhóm các Users cùng phòng ban (vd: <code>Java-Devs</code>, <code>DB-Admins</code>). Nhớ kỹ 2 luật: <strong>Group chỉ chứa User (không chứa được Group con)</strong>, và <strong>Group không phải là một Identity (không thể đăng nhập bằng tên Group hay cấp quyền trực tiếp cho Group trong S3 Bucket Policy)</strong>."
      },
      {
        title: "2. Giải phẫu file JSON IAM Policy & Biến động (Policy Variables)",
        content: "Mỗi quy tắc phân quyền được viết bằng JSON gồm 5 trường:<br>• <code>Effect</code>: Chỉ có 2 giá trị là <code>Allow</code> (Cho phép) hoặc <code>Deny</code> (Cấm).<br>• <code>Principal</code>: Ai được áp dụng (Chỉ xuất hiện trong <em>Resource-based policy</em> như S3 Bucket Policy).<br>• <code>Action</code>: Mảng các hàm API được gọi, ví dụ <code>[\"s3:GetObject\", \"ec2:StartInstances\"]</code>.<br>• <code>Resource</code>: ARN của tài nguyên bị tác động. <strong>Mẹo nâng cao SAA-C03</strong>: Để 100 nhân viên mỗi người chỉ truy cập được đúng thư mục S3 mang tên mình (<code>/home/dat</code>, <code>/home/nam</code>) mà chỉ cần viết <strong>1 Policy duy nhất</strong>, ta dùng biến động <strong><code>arn:aws:s3:::my-bucket/home/${aws:username}/*</code></strong>!<br>• <code>Condition</code>: Điều kiện đi kèm (Ví dụ: <code>\"aws:MultiFactorAuthPresent\": \"true\"</code> = Chỉ cho phép xóa máy chủ nếu đã đăng nhập bằng MFA; <code>\"aws:SourceIp\"</code> = Chỉ cho phép gọi từ dải IP công ty; <code>\"aws:RequestedRegion\"</code> = Giới hạn Region được phép tạo máy)."
      },
      {
        title: "3. Quy tắc Đánh giá Quyền (Policy Evaluation Logic) & IAM Permissions Boundary",
        content: "Khi một User bấm nút xóa ổ cứng EBS, AWS sẽ gom tất cả các Policy mà User đó đang mang (từ Group, từ User, từ Permission Boundary, từ SCP của Organization) và chấm theo thứ tự:<br>1. <strong>Bắt đầu ở mức Mặc định Cấm (Implicit Deny)</strong>.<br>2. <strong>Quét tìm chữ <code>Effect: Deny</code> (Explicit Deny)</strong>: Chỉ cần có <strong>1 dòng Deny tường minh</strong> ở bất kỳ đâu → <strong>TỪ CHỐI NGAY LẬP TỨC</strong>.<br>3. <strong>Kiểm tra Permissions Boundary (Ranh giới quyền)</strong>: Dùng khi bạn muốn cho phép trưởng nhóm Dev tự tạo IAM Role mới cho nhân viên (Delegated administration), nhưng muốn chặn không cho họ tự tạo ra một Role có quyền cao hơn chính họ (Privilege escalation). Quyền thực tế sẽ là <strong>phần giao thoa (Intersection)</strong> giữa Identity Policy và Permissions Boundary."
      },
      {
        title: "4. Ba loại Policy trong AWS: AWS Managed vs Customer Managed vs Inline",
        content: "• <strong>AWS Managed Policy</strong>: Do AWS viết sẵn (như <code>AdministratorAccess</code>, <code>PowerUserAccess</code> — cho phép mọi thứ trừ quản lý IAM/Organizations). Bạn không sửa nội dung của nó được.<br>• <strong>Customer Managed Policy (Khuyên dùng nhất trong đề thi!)</strong>: Do chính bạn tự tạo ra để tái sử dụng cho nhiều Groups/Users/Roles, có quản lý phiên bản (Versioning & Rollback).<br>• <strong>Inline Policy</strong>: Gắn chết 1-1 vào duy nhất 1 User/Role. Khi xóa User đó thì Inline Policy biến mất theo."
      }
    ],
    extraCards: [
      { q: "Làm thế nào để viết duy nhất 1 IAM Policy cho phép 200 nhân viên mỗi người chỉ truy cập được vào đúng thư mục con trùng tên đăng nhập của mình (/users/ten-user/*) trên S3?", a: "Sử dụng biến IAM Policy Variable: ${aws:username} trong phần Resource ARN (arn:aws:s3:::bucket/users/${aws:username}/*)." },
      { q: "Tính năng IAM nào dùng để đặt 'trần quyền hạn tối đa' cho một IAM User/Role nhằm ngăn chặn việc leo thang đặc quyền khi ủy quyền cho Developer tự tạo IAM Role?", a: "IAM Permissions Boundary (Ranh giới quyền)." },
      { q: "AWS Managed Policy 'PowerUserAccess' khác với 'AdministratorAccess' ở điểm cốt lõi nào?", a: "PowerUserAccess cho phép toàn quyền với các dịch vụ AWS (EC2, S3, RDS...) nhưng KHÔNG cho phép quản lý IAM Users, Groups và AWS Organizations." }
    ],
    quizzes: [
      {
        qEn: "An IAM user belongs to two IAM groups: 'Developers' and 'Contractors'. The 'Developers' group has a policy that allows all Amazon S3 actions (s3:*). The 'Contractors' group has a policy that explicitly denies s3:DeleteBucket. What happens when this user tries to delete an S3 bucket?",
        qVi: "Một IAM user thuộc cả 2 nhóm 'Developers' và 'Contractors'. Nhóm Developers cho phép mọi thao tác S3 (s3:*). Nhóm Contractors có lệnh cấm tường minh (Explicit Deny) hành động s3:DeleteBucket. Chuyện gì xảy ra khi user này xóa 1 S3 bucket?",
        options: [
          "A. The bucket is deleted successfully because the Allow s3:* permission is broader.",
          "B. The action is denied (Access Denied) because an explicit deny always overrides any allow.",
          "C. The system prompts the user for an MFA code before deleting the bucket.",
          "D. It depends on which IAM group the user was added to first."
        ],
        correctIdx: 1,
        explanation: "Theo quy tắc vàng của AWS IAM: Một lệnh cấm tường minh (Explicit Deny) ở bất kỳ Policy nào sẽ LUÔN LUÔN thắng mọi lệnh Allow."
      },
      {
        qEn: "A company hires 50 new developers. Each developer needs read/write access ONLY to their own personal folder (s3://company-bucket/users/<username>/*) in a shared S3 bucket. How can the solutions architect implement this with the LEAST administrative effort?",
        qVi: "Công ty tuyển 50 lập trình viên mới. Mỗi người chỉ được đọc/ghi vào đúng thư mục cá nhân mang tên mình trong chung 1 S3 bucket. Cách nào tốn ít công sức quản trị nhất?",
        options: [
          "A. Create 50 separate inline policies and attach each one to an individual IAM user.",
          "B. Create a single IAM group and attach a customer managed policy that uses the '${aws:username}' policy variable in the Resource ARN.",
          "C. Create 50 separate S3 buckets, one for each developer.",
          "D. Create 50 separate S3 Access Points, one for each developer."
        ],
        correctIdx: 1,
        explanation: "Dùng IAM Policy Variable '${aws:username}' trong 1 Group Policy giúp AWS tự động thay thế tên User đang đăng nhập vào đường dẫn S3 mà không phải tạo 50 policies thủ công."
      },
      {
        qEn: "A security team wants to allow senior developers to create IAM roles for Lambda functions, but must ensure they cannot create roles with Administrator privileges (privilege escalation). Which IAM feature solves this?",
        qVi: "Đội bảo mật muốn cho phép Senior Dev tự tạo IAM Role cho hàm Lambda, nhưng phải đảm bảo họ không thể tạo ra Role có quyền Admin cao hơn giới hạn cho phép. Tính năng IAM nào giải quyết việc này?",
        options: [
          "A. IAM Groups",
          "B. IAM Permissions Boundary",
          "C. IAM Credentials Report",
          "D. AWS Shield"
        ],
        correctIdx: 1,
        explanation: "IAM Permissions Boundary định nghĩa ranh giới quyền tối đa mà một thực thể IAM có thể nhận được, ngăn chặn leo thang đặc quyền khi ủy quyền tạo Role."
      }
    ]
  },

  2: {
    jargon: [
      { term: "IAM Role vs IAM User", plain: "IAM User là 'con người' có mật khẩu cố định lâu dài. IAM Role là 'chiếc mũ quyền lực tạm thời' không có mật khẩu cố định — ai (hoặc máy chủ EC2 nào) đội chiếc mũ này lên sẽ được cấp 1 thẻ ra vào tạm thời có hạn từ 15 phút đến 12 tiếng." },
      { term: "AWS STS (Security Token Service)", plain: "Cỗ máy đứng đằng sau IAM Role. Khi EC2 hoặc User đội chiếc mũ IAM Role (gọi hàm AssumeRole), STS sẽ in ra bộ 3 chìa khóa tạm thời (AccessKeyId + SecretAccessKey + SessionToken) tự hủy khi hết giờ." },
      { term: "Identity Federation (SAML 2.0 / Active Directory)", plain: "Liên kết danh tính: Cho phép nhân viên dùng tài khoản Microsoft Active Directory sẵn có ở công ty để đăng nhập thẳng vào AWS mà không cần tạo lại hàng nghìn IAM Users trên AWS." },
      { term: "IAM Access Analyzer", plain: "Công cụ tự động rà quét xem có S3 Bucket, KMS Key, IAM Role hay SQS Queue nào trong tài khoản đang bị vô tình chia sẻ ra bên ngoài (External Zone of Trust) hay không." }
    ],
    diagram: `
[Ứng dụng Java trên EC2] ──(1. Xin token tự động qua Instance Metadata)──► [AWS STS]
                                                                               │
[S3 Bucket / DynamoDB]   ◄──(3. Gọi API kèm Temporary Token an toàn)───── (2. Trả về Temporary Token)`,
    deepSections: [
      {
        title: "1. Tại sao CẤM nhúng Access Key vào code Java mà phải dùng IAM Role (Instance Profile)?",
        content: "Khi bạn chạy ứng dụng Spring Boot trên máy chủ EC2 và cần upload ảnh lên S3:<br>• <strong>Cách sai lầm (Đề thi luôn bẫy)</strong>: Tạo IAM User, lấy cặp <code>AWS_ACCESS_KEY_ID</code> và <code>AWS_SECRET_ACCESS_KEY</code> điền vào file <code>application.properties</code>. Nếu lộ code hoặc máy chủ bị hack, kẻ gian lấy được chìa khóa vĩnh viễn!<br>• <strong>Cách chuẩn AWS (Đáp án đúng 100% mọi đề thi)</strong>: Tạo một <strong>IAM Role</strong> (gắn quyền S3), sau đó gắn IAM Role này vào máy chủ EC2 (thông qua <em>EC2 Instance Profile</em>). Thư viện AWS SDK for Java bên trong code sẽ tự động lấy chìa khóa tạm thời từ địa chỉ nội bộ <code>http://169.254.169.254/latest/meta-data/iam/security-credentials/</code> và tự động xoay vòng ngầm!"
      },
      {
        title: "2. Khi nào dùng Resource-based Policy vs IAM Role (Cross-Account Access)?",
        content: "Giả sử Tài khoản A muốn truy cập vào một S3 Bucket (hoặc SQS Queue, SNS Topic) nằm ở Tài khoản B. Có 2 cách:<br>• <strong>Cách 1 - Dùng IAM Role (AssumeRole)</strong>: User ở Tài khoản A tạm thời 'nhảy' sang đóng vai một IAM Role bên Tài khoản B. Khi đang đóng vai này, User sẽ <strong>tạm mất quyền cũ ở Tài khoản A</strong> và chỉ mang quyền của Role mới bên Tài khoản B.<br>• <strong>Cách 2 - Dùng Resource-based Policy (S3 Bucket Policy / SQS Queue Policy)</strong>: Gắn giấy phép trực tiếp lên S3 Bucket ở Tài khoản B cho phép User của Tài khoản A đọc/ghi. Ưu điểm lớn nhất: User ở Tài khoản A <strong>VỪA giữ nguyên được quyền ở Tài khoản A, VỪA thao tác được sang Tài khoản B cùng một lúc</strong> (rất tiện khi cần copy file trực tiếp từ S3 của Tài khoản A sang S3 của Tài khoản B!)."
      },
      {
        title: "3. Ba công cụ Kiểm toán Quyền của IAM (Hay hỏi ở Domain 1 - Security)",
        content: "• <strong>IAM Credentials Report</strong>: Báo cáo cấp độ toàn bộ Account (file CSV) cho biết danh sách mọi User, ai chưa bật MFA, ai có Access Key đã quá 90 ngày chưa đổi.<br>• <strong>IAM Access Advisor</strong>: Báo cáo cấp độ từng User/Role cho biết các dịch vụ được cấp quyền có thực sự được dùng hay không (dùng để thu hồi quyền thừa theo chuẩn <em>Least Privilege</em>).<br>• <strong>IAM Access Analyzer</strong>: Dùng toán học logic (Automated reasoning) để phát hiện xem có tài nguyên nào (S3, KMS, IAM Role, Lambda, SQS) đang cho phép người ngoài tổ chức (External principals) truy cập ngoài ý muốn hay không."
      }
    ],
    extraCards: [
      { q: "Một máy chủ EC2 ở Tài khoản A cần copy dữ liệu từ S3 Bucket ở Tài khoản A sang S3 Bucket ở Tài khoản B mà không muốn bị mất quyền ở Tài khoản A khi đang chạy. Nên dùng cơ chế phân quyền nào?", a: "Gắn S3 Bucket Policy (Resource-based policy) trên Bucket ở Tài khoản B cho phép IAM Role của máy EC2 ở Tài khoản A ghi dữ liệu." },
      { q: "Công cụ nào của IAM giúp tự động phát hiện các S3 Bucket, KMS Keys hoặc IAM Roles đang bị chia sẻ ngoài ý muốn cho các tài khoản bên ngoài tổ chức?", a: "AWS IAM Access Analyzer." },
      { q: "Dịch vụ ngầm nào của AWS chịu trách nhiệm phát hành thông tin xác thực tạm thời (Temporary Security Credentials) khi gọi lệnh AssumeRole?", a: "AWS STS (Security Token Service)." }
    ],
    quizzes: [
      {
        qEn: "A Java application running on an Amazon EC2 instance needs to read and write items to an Amazon DynamoDB table. What is the MOST secure way to grant the application access to the DynamoDB table?",
        qVi: "Một ứng dụng Java chạy trên máy chủ EC2 cần đọc và ghi dữ liệu vào bảng DynamoDB. Cách nào AN TOÀN NHẤT để cấp quyền cho ứng dụng?",
        options: [
          "A. Create an IAM user, generate access keys, and store them in an encrypted configuration file on the EC2 instance.",
          "B. Create an IAM role with permissions to access the DynamoDB table and attach the role to the EC2 instance (Instance Profile).",
          "C. Store access keys in an S3 bucket and download them at boot time using EC2 User Data.",
          "D. Open the DynamoDB port in the EC2 instance's security group."
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
      },
      {
        qEn: "A company wants to continuously monitor its AWS environment to identify any S3 buckets, KMS keys, or IAM roles that are shared with external principals outside its AWS Organization. Which service should be used?",
        qVi: "Công ty muốn giám sát liên tục môi trường AWS để phát hiện bất kỳ S3 bucket, KMS key hoặc IAM role nào đang bị chia sẻ với các chủ thể bên ngoài AWS Organization của họ. Dùng dịch vụ nào?",
        options: [
          "A. IAM Access Advisor",
          "B. IAM Access Analyzer",
          "C. AWS Trusted Advisor",
          "D. Amazon Inspector"
        ],
        correctIdx: 1,
        explanation: "IAM Access Analyzer xác định các tài nguyên trong tài khoản được chia sẻ với thực thể bên ngoài vùng tin cậy (Zone of Trust như AWS Organization)."
      }
    ]
  },

  3: {
    jargon: [
      { term: "AMI (Amazon Machine Image)", plain: "Bản ghost / khuôn đúc máy chủ: Chứa sẵn Hệ điều hành (Linux/Windows) + Phần mềm cài sẵn (Java, Docker, Nginx). Tạo 1 AMI chuẩn thì bật máy mới mất 10 giây không cần đợi cài lại phần mềm." },
      { term: "EC2 Image Builder", plain: "Dây chuyền tự động tạo, cập nhật bản vá bảo mật và kiểm thử các bản Golden AMI định kỳ hoàn toàn tự động (miễn phí công cụ, chỉ tính tiền tài nguyên chạy thử)." },
      { term: "Instance Metadata Service (IMDSv2)", plain: "Địa chỉ nội bộ đặc biệt (http://169.254.169.254) chỉ gọi được từ bên trong chính máy EC2 đó để máy tự hỏi thông tin của bản thân (IP của tôi là gì? IAM Role của tôi là gì?). Bản v2 bắt buộc dùng Session Token để chống tấn công SSRF." },
      { term: "AWS Outposts vs Local Zones vs Wavelength", plain: "Outposts = Mua nguyên tủ rack phần cứng AWS đặt ngay trong phòng server công ty bạn. Local Zones = Trạm Data Center nhỏ của AWS đặt ngay tại các thành phố lớn (gần người dùng cuối). Wavelength = Đặt hạ tầng AWS ngay tại trạm phát sóng viễn thông 5G." }
    ],
    diagram: `
[Bấm nút Launch EC2] ──► Chọn 1. AMI (Tự động hóa tạo AMI bằng EC2 Image Builder)
                     ──► Chọn 2. Instance Type (M = Đa dụng, C = CPU, R = RAM, I = Ổ cứng IOPS, P/G = GPU)
                     ──► Chạy 3. EC2 User Data (Chạy 1 lần duy nhất dưới quyền root khi First Boot)`,
    deepSections: [
      {
        title: "1. Quy ước đặt tên dòng máy EC2 (Ví dụ: m6g.2xlarge nghĩa là gì?)",
        content: "Trong tên <code>m6g.2xlarge</code>:<br>• Chữ <code>m</code> là <strong>Họ máy (Instance Family)</strong>; số <code>6</code> là <strong>Thế hệ phần cứng</strong>; chữ <code>g</code> nghĩa là dùng chip <strong>AWS Graviton (kiến trúc ARM)</strong> giúp tiết kiệm tới 40% chi phí/hiệu năng!<br>• <strong>Bảng nhớ nhanh 5 họ máy cho đề thi:</strong><br>  - <strong>T / M (General Purpose)</strong>: Cân bằng CPU và RAM (Web server, App server).<br>  - <strong>C (Compute Optimized)</strong>: CPU cực mạnh (Batch processing, Media transcoding, Gaming, ML inference).<br>  - <strong>R / X (Memory Optimized)</strong>: RAM cực lớn (In-memory cache Redis/Memcached, SAP HANA, Big Data).<br>  - <strong>I / D (Storage Optimized)</strong>: Ổ cứng NVMe cục bộ IOPS cực khủng (NoSQL DB, OLTP, Data warehouse).<br>  - <strong>P / G / Inf (Accelerated Computing)</strong>: Có card GPU (Deep Learning / AI, đồ họa 3D)."
      },
      {
        title: "2. EC2 User Data vs Golden AMI vs EC2 Image Builder",
        content: "• <strong>EC2 User Data</strong>: Chạy script cài đặt lúc máy mới khởi tạo lần đầu. Nếu cài đặt quá nặng mất 15 phút làm Auto Scaling chậm trễ → Phải chuyển sang dùng <strong>Golden AMI (Custom AMI)</strong>.<br>• <strong>EC2 Image Builder</strong>: Khi đề bài hỏi <em>'Làm sao tự động hóa quy trình tạo, cập nhật bản vá OS hàng tháng và kiểm thử Golden AMI với ít công sức vận hành nhất?'</em> → Chọn ngay <strong>EC2 Image Builder</strong>.<br>• <strong>VM Import/Export</strong>: Dùng khi muốn bê nguyên máy ảo <code>.ova / .vmdk</code> từ VMware dưới On-premise lên biến thành AMI trên AWS."
      },
      {
        title: "3. Mở rộng đám mây AWS ra biên: Outposts vs Local Zones vs Wavelength (Mới trong SAA-C03)",
        content: "• <strong>AWS Outposts</strong>: AWS chở nguyên tủ Rack máy chủ vật lý của AWS đặt ngay bên trong tòa nhà Data Center của công ty bạn (yêu cầu dữ liệu không được rời khỏi tòa nhà công ty nhưng vẫn muốn dùng API của EC2, EBS, S3, RDS).<br>• <strong>AWS Local Zones</strong>: Mở rộng VPC của bạn tới các thành phố lớn gần người dùng cuối để đạt độ trễ <strong>1 chữ số mili-giây (Single-digit millisecond latency)</strong> cho mảng Gaming, Live Video Streaming.<br>• <strong>AWS Wavelength</strong>: Nhúng dịch vụ AWS vào thẳng mạng lưới <strong>viễn thông 5G (Telecom 5G networks)</strong> cho xe tự lái, thiết bị y tế thông minh không cần đi vòng ra Internet."
      }
    ],
    extraCards: [
      { q: "Dịch vụ nào giúp tự động hóa việc xây dựng, cài bản vá bảo mật định kỳ và kiểm thử các bản Amazon Machine Image (Golden AMI)?", a: "EC2 Image Builder." },
      { q: "Phân biệt AWS Outposts, AWS Local Zones và AWS Wavelength?", a: "Outposts: Đặt tủ rack phần cứng AWS ngay trong phòng server công ty (On-premise). Local Zones: Đặt gần các thành phố lớn cho độ trễ <10ms. Wavelength: Đặt tại trạm viễn thông 5G cho thiết bị di động/IoT." },
      { q: "Ứng dụng chạy trên EC2 muốn tra cứu địa chỉ IP hoặc IAM Role của chính máy chủ đó một cách bảo mật nhất (chống lỗi SSRF) thì gọi vào đâu?", a: "Gọi vào Instance Metadata Service phiên bản 2 (IMDSv2) tại địa chỉ http://169.254.169.254/latest/meta-data/ kèm Session Token." }
    ],
    quizzes: [
      {
        qEn: "An Auto Scaling group launches new EC2 instances during traffic spikes, but the instances take 15 minutes to become healthy because the EC2 User Data script downloads and compiles large software packages. How can a solutions architect reduce the launch time to under 2 minutes?",
        qVi: "Cụm Auto Scaling bật thêm máy EC2 khi lưu lượng tăng đột biến, nhưng mất tới 15 phút máy mới sẵn sàng vì script User Data phải tải và biên dịch các gói phần mềm rất nặng. Làm sao giảm thời gian khởi động xuống dưới 2 phút?",
        options: [
          "A. Change the instance type to an R5 memory-optimized instance.",
          "B. Pre-install all required software onto an EC2 instance, create a custom Golden AMI from it, and update the Launch Template to use the new AMI.",
          "C. Move the installation script from EC2 User Data to an Amazon S3 bucket.",
          "D. Attach an additional secondary EBS volume to the instance."
        ],
        correctIdx: 1,
        explanation: "Đóng gói sẵn hệ điều hành và các phần mềm nặng thành một Custom AMI (hoặc dùng EC2 Image Builder) giúp máy mới bật lên là chạy được ngay không cần chờ tải và cài đặt lại."
      },
      {
        qEn: "A hospital requires that patient medical imaging data must remain physically inside the hospital's on-premises data center for strict data residency compliance, while allowing developers to deploy applications using standard AWS APIs (EC2, EBS, S3). Which solution meets this requirement?",
        qVi: "Bệnh viện yêu cầu dữ liệu hình ảnh y tế phải nằm vật lý ngay bên trong trung tâm dữ liệu của bệnh viện để tuân thủ luật cư trú dữ liệu, nhưng vẫn muốn lập trình viên dùng các API chuẩn của AWS (EC2, EBS, S3). Chọn giải pháp nào?",
        options: [
          "A. AWS Local Zones",
          "B. AWS Outposts",
          "C. AWS Wavelength",
          "D. AWS Direct Connect"
        ],
        correctIdx: 1,
        explanation: "AWS Outposts mang tủ rack phần cứng chính hãng của AWS đặt ngay bên trong trung tâm dữ liệu On-premise của khách hàng, đáp ứng yêu cầu dữ liệu nằm tại chỗ mà vẫn dùng chung API AWS."
      },
      {
        qEn: "A security audit revealed that an application running on EC2 is vulnerable to Server-Side Request Forgery (SSRF) attacks that could steal temporary IAM credentials from http://169.254.169.254. How should the architect mitigate this risk?",
        qVi: "Kiểm toán bảo mật phát hiện ứng dụng trên EC2 có nguy cơ bị tấn công SSRF đánh cắp thông tin xác thực IAM tạm thời từ địa chỉ 169.254.169.254. Kiến trúc sư nên khắc phục bằng cách nào?",
        options: [
          "A. Detach the IAM role from the EC2 instance and use hardcoded access keys instead.",
          "B. Enforce the use of Instance Metadata Service Version 2 (IMDSv2), which requires session-oriented PUT requests with a token.",
          "C. Block 169.254.169.254 in the subnet's Network ACL.",
          "D. Enable encryption on the root EBS volume."
        ],
        correctIdx: 1,
        explanation: "IMDSv2 sử dụng cơ chế hướng phiên (session-oriented) yêu cầu gửi lệnh PUT kèm header TTL để lấy token trước khi đọc metadata, chặn đứng hiệu quả các lỗ hổng SSRF."
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
        content: "• Khi bạn tạo mới một Security Group: Mặc định nó <strong>chặn toàn bộ chiều vào (0 Inbound rules)</strong> và <strong>cho phép toàn bộ chiều ra (Outbound Allow 0.0.0.0/0 mọi cổng)</strong>.<br>• Security Group <strong>chỉ chứa các quy tắc Cho phép (Allow)</strong>. Bạn không thể viết một quy tắc 'Cấm IP 1.2.3.4' trong Security Group (muốn cấm đích danh 1 IP phải dùng <em>Network ACL</em> ở tầng Subnet hoặc <em>AWS WAF</em>).<br>• Một máy EC2 có thể gắn nhiều Security Groups cùng lúc (quyền được cộng gộp lại).<br>• <strong>Lưu ý về 2 máy EC2 dùng chung 1 Security Group</strong>: Mặc định 2 máy EC2 cùng gắn chung một Custom Security Group sẽ <strong>KHÔNG tự động nói chuyện được với nhau</strong> trừ khi trong Inbound Rule có dòng cho phép chính mã Security Group đó (Self-referencing)!"
      },
      {
        title: "2. Thiết kế chuỗi Security Group 3 tầng chuẩn mực (3-Tier Architecture)",
        content: "Trong đề thi SAA-C03 rất hay hỏi cách khóa bảo mật giữa 3 tầng (Load Balancer → Web/App EC2 → Database RDS) sao cho người ngoài không thể nhảy cóc vào thẳng EC2 hay Database:<br>1. <strong>SG của Load Balancer (ALB-SG)</strong>: Mở Inbound cổng <code>80/443</code> cho nguồn <code>0.0.0.0/0</code> (toàn bộ Internet).<br>2. <strong>SG của máy chủ Java (App-SG)</strong>: Mở Inbound cổng <code>8080</code> nhưng ở cột Source (Nguồn), <strong>KHÔNG điền IP mà điền mã <code>ALB-SG</code></strong>!<br>3. <strong>SG của Database (DB-SG)</strong>: Mở Inbound cổng <code>3306</code> và cột Source điền mã <strong><code>App-SG</code></strong>! (Tính năng tham chiếu chéo Security Group này hoạt động được cả giữa 2 VPC đã nối <em>VPC Peering</em> trong cùng Region)."
      },
      {
        title: "3. Bắt bệnh khi không SSH hoặc không gọi được vào EC2",
        content: "• Nếu màn hình treo một lúc rồi báo <strong><code>Connection Timed Out</code></strong> → Gói tin bị tường lửa chặn đứng dọc đường (Kiểm tra ngay <strong>Security Group</strong> chưa mở cổng, hoặc <strong>Network ACL</strong> chặn, hoặc <strong>Route Table</strong> thiếu đường ra Internet Gateway).<br>• Nếu báo lỗi ngay lập tức <strong><code>Connection Refused</code></strong> → Đã đi xuyên qua Security Group thành công vào tới tận cửa máy EC2 rồi, nhưng dịch vụ/ứng dụng bên trong EC2 chưa bật hoặc đang lắng nghe ở cổng khác!"
      }
    ],
    extraCards: [
      { q: "Khi kết nối vào máy chủ EC2 mà nhận lỗi 'Connection Timed Out' khác với lỗi 'Connection Refused' như thế nào?", a: "Connection Timed Out: Bị chặn ở tầng mạng (Security Group chưa mở port, NACL chặn, hoặc thiếu Route). Connection Refused: Đã qua được Security Group nhưng ứng dụng bên trong EC2 chưa chạy." },
      { q: "Hai máy chủ EC2 cùng gắn chung một Custom Security Group vừa mới tạo (chưa thêm Inbound rule nào) có thể ping/gọi sang nhau được không?", a: "KHÔNG. Custom Security Group mới tạo mặc định chặn mọi Inbound traffic, kể cả từ các máy dùng chung Security Group đó (phải thêm Self-referencing Inbound rule mới gọi nhau được)." }
    ],
    quizzes: [
      {
        qEn: "A 3-tier web application consists of an Application Load Balancer (ALB), a fleet of EC2 instances in an Auto Scaling group, and an Amazon RDS MySQL database. How should the solutions architect configure the security groups to ensure that the EC2 instances only accept traffic from the ALB?",
        qVi: "Ứng dụng web 3 tầng gồm ALB, dàn máy chủ EC2 tự động co giãn (Auto Scaling) và cơ sở dữ liệu RDS MySQL. Cấu hình Security Group như thế nào để đảm bảo các máy EC2 chỉ nhận lưu lượng đi qua từ ALB?",
        options: [
          "A. In the EC2 security group inbound rules, allow HTTP traffic from the static IP address of the ALB.",
          "B. In the EC2 security group inbound rules, allow HTTP traffic and specify the ALB's Security Group ID as the source.",
          "C. Create a Network ACL that blocks all traffic except the DNS name of the ALB.",
          "D. Enable Sticky Sessions on the ALB."
        ],
        correctIdx: 1,
        explanation: "Vì địa chỉ IP của ALB có thể thay đổi linh hoạt, cách chuẩn xác và an toàn nhất là tham chiếu trực tiếp Security Group ID của ALB làm Source trong Inbound Rule của EC2 Security Group."
      },
      {
        qEn: "A developer launched a Linux EC2 instance and wants to allow HTTP (port 80) traffic from the internet. The developer added an Inbound rule allowing port 80 from 0.0.0.0/0 and removed all Outbound rules from the Security Group. What happens when a user requests a web page over port 80?",
        qVi: "Lập trình viên bật máy EC2 Linux, thêm Inbound rule mở cổng 80 cho 0.0.0.0/0 nhưng xóa sạch toàn bộ Outbound rules trong Security Group. Chuyện gì xảy ra khi người dùng truy cập trang web qua cổng 80?",
        options: [
          "A. The request reaches the instance, but the response is blocked because there are no outbound rules.",
          "B. The web page loads normally because security groups are stateful and automatically allow return traffic.",
          "C. AWS does not allow removing all outbound rules from a security group.",
          "D. The user receives a Connection Refused error."
        ],
        correctIdx: 1,
        explanation: "Vì Security Group là Stateful (Có trạng thái), bất kỳ kết nối nào đã được cho phép đi VÀO qua Inbound rule thì luồng gói tin phản hồi của kết nối đó sẽ TỰ ĐỘNG được phép đi RA bất kể bảng Outbound rules có trống hay không!"
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
 ├── Chạy 24/7 ổn định suốt 1 - 3 năm + Muốn đổi qua Fargate/Lambda? ──► Compute Savings Plans (Giảm ~66%)
 ├── Chạy 24/7 ổn định 1 dòng máy cố định ở 1 Region suốt 1-3 năm?  ──► EC2 Instance Savings Plans / Standard RI (~72%)
 ├── Xử lý Batch / Render ảnh / Chịu được tắt đột ngột (2p notice)? ──► Spot Instances (Giảm ~90% - Rẻ nhất!)
 ├── Đòi hỏi kiểm soát Socket/Core vật lý (BYOL)?                   ──► Dedicated Hosts
 └── Cần giữ chỗ chắc chắn 100% ở 1 AZ cụ thể trong vài tuần?       ──► On-Demand Capacity Reservations`,
    deepSections: [
      {
        title: "1. Phân biệt rõ Reserved Instances (Standard vs Convertible) và Savings Plans",
        content: "Cả hai đều yêu cầu bạn cam kết sử dụng trong <strong>1 năm hoặc 3 năm</strong> để đổi lấy mức giảm giá lên tới 72%:<br>• <strong>Standard Reserved Instances (RI)</strong>: Giảm giá nhiều nhất (~72%), nhưng khóa cứng vào 1 dòng máy. Có thể bán lại trên <em>RI Marketplace</em>.<br>• <strong>Convertible Reserved Instances</strong>: Giảm giá ~66%, cho phép <strong>đổi sang dòng máy EC2 khác, hệ điều hành khác</strong>.<br>• <strong>Compute Savings Plans (Linh hoạt nhất)</strong>: Cam kết theo số tiền <code>$/giờ</code>. Tự do đổi loại máy EC2, đổi Region, và áp dụng được cho cả <strong>EC2, AWS Fargate (Containers) lẫn AWS Lambda</strong>!"
      },
      {
        title: "2. Cơ chế hoạt động của Spot Instances & Chiến lược kết hợp (Mixed Instances)",
        content: "• Với <strong>Spot Instances</strong>, bạn mua lại năng lực tính toán nhàn rỗi với mức chiết khấu tới <strong>90%</strong>. Khi AWS cần thu hồi máy, bạn nhận được <strong>thông báo trước 2 phút (2-minute interruption notice)</strong>.<br>• <strong>Kiến trúc tối ưu chi phí thực chiến hay hỏi trong đề</strong>: Khi chạy một cụm Auto Scaling Group cho ứng dụng Web, làm sao vừa đảm bảo hệ thống không bao giờ sập hoàn toàn, vừa tiết kiệm tiền nhất? → Cấu hình <strong>Auto Scaling Group kết hợp (Mixed Instances Policy)</strong>: Dùng <strong>On-Demand / Savings Plans cho phần tải nền tối thiểu (Base capacity)</strong>, và dùng <strong>Spot Instances (chiến lược capacity-optimized) cho phần tải tăng thêm đột biến (Burst capacity)</strong>!"
      },
      {
        title: "3. Phân biệt Dedicated Instances vs Dedicated Hosts & Capacity Reservations",
        content: "• <strong>Dedicated Hosts</strong>: Bạn thuê đứt 1 xác máy chủ vật lý, nhìn thấy rõ từng Socket, từng Physical Core → Bắt buộc chọn khi đề bài nhắc tới <strong>bản quyền phần mềm tính theo lõi vật lý (BYOL - per-socket / per-core licenses)</strong>.<br>• <strong>On-Demand Capacity Reservations</strong>: Giữ chỗ trước số lượng máy ở một AZ cụ thể vào bất kỳ lúc nào không cần cam kết 1-3 năm (phù hợp khi sắp chạy sự kiện lớn hoặc cần đảm bảo Disaster Recovery luôn có sẵn máy ở AZ dự phòng)."
      }
    ],
    extraCards: [
      { q: "Gói tiết kiệm nào của AWS cho phép cam kết theo mức chi tiêu $/giờ trong 1-3 năm và tự động áp dụng giảm giá xuyên suốt từ EC2 sang cả AWS Fargate và AWS Lambda?", a: "Compute Savings Plans." },
      { q: "Làm thế nào để cấu hình một Auto Scaling Group vừa đảm bảo luôn có tối thiểu 4 máy chạy ổn định không bao giờ bị thu hồi, vừa tiết kiệm chi phí tối đa khi cần mở rộng thêm 20 máy lúc cao điểm?", a: "Sử dụng Mixed Instances Policy trong Auto Scaling Group: Đặt Base capacity là 4 máy On-Demand (hoặc Savings Plans), và phần mở rộng vượt mức đó dùng Spot Instances." }
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
      },
      {
        qEn: "A company currently runs workloads on Amazon EC2 in us-east-1, but plans to modernize its architecture by migrating half of these workloads to AWS Fargate and AWS Lambda in eu-west-1 over the next 8 months. Which pricing model provides the highest savings while accommodating this migration?",
        qVi: "Công ty đang chạy ứng dụng trên EC2 ở us-east-1, nhưng dự định trong 8 tháng tới sẽ chuyển một nửa sang chạy trên AWS Fargate và AWS Lambda ở eu-west-1. Mô hình mua nào tiết kiệm nhất mà vẫn linh hoạt cho kế hoạch chuyển đổi này?",
        options: [
          "A. Standard Reserved Instances",
          "B. Convertible Reserved Instances",
          "C. EC2 Instance Savings Plans",
          "D. Compute Savings Plans"
        ],
        correctIdx: 3,
        explanation: "Compute Savings Plans là gói duy nhất cho phép áp dụng mức giảm giá linh hoạt ngay cả khi bạn chuyển đổi giữa các Region và chuyển từ EC2 sang AWS Fargate hoặc AWS Lambda."
      }
    ]
  },

  6: {
    jargon: [
      { term: "ENI (Elastic Network Interface)", plain: "Card mạng ảo cắm vào máy chủ EC2 (chứa địa chỉ Private IP, Public IP, địa chỉ vật lý MAC, và gắn kèm Security Group). ENI bị khóa chặt trong 1 AZ!" },
      { term: "ENA vs EFA (Elastic Fabric Adapter)", plain: "ENA = Card mạng ảo tốc độ cao chuẩn của EC2 (lên tới 100 Gbps). EFA = Card mạng siêu cấp dành riêng cho cụm siêu máy tính HPC chạy trên Linux (hỗ trợ OS-bypass và giao thức MPI để truyền dữ liệu trực tiếp giữa RAM các máy)." },
      { term: "HPC (High Performance Computing)", plain: "Siêu máy tính tính toán hiệu năng cao (dự báo thời tiết, mô phỏng tài chính, giải mã gen) cần hàng chục máy chủ truyền dữ liệu cho nhau với tốc độ cực đại và độ trễ gần bằng 0." }
    ],
    diagram: `
3 Chiến lược EC2 Placement Groups:
1. [CLUSTER]   : [EC2][EC2][EC2] (Chung 1 tủ Rack, chung 1 AZ + EFA) ──► Mạng 10-100Gbps cực nhanh (HPC), sập Rack là chết hết!
2. [SPREAD]    : [EC2 ở Rack 1] ... [EC2 ở Rack 2] ... [EC2 ở Rack 3] ──► Khác phần cứng 100%, Tối đa 7 máy/AZ!
3. [PARTITION] : [Rack A: 50 máy EC2]  |  [Rack B: 50 máy EC2]       ──► Tối đa 7 phân vùng/AZ, chứa hàng trăm máy (Kafka/Hadoop)`,
    deepSections: [
      {
        title: "1. Chuyện gì xảy ra với địa chỉ IP khi bạn Stop, Start hay Reboot máy EC2?",
        content: "• <strong>Private IPv4</strong>: Được gắn vĩnh viễn cho máy EC2 đó từ lúc tạo cho đến khi bạn xóa bỏ (Terminate) máy.<br>• <strong>Public IPv4 mặc định</strong>: Khi bấm <strong><code>Reboot</code></strong> thì Public IP vẫn giữ nguyên. Nhưng nếu bấm <strong><code>Stop</code> rồi <code>Start</code> lại</strong>, máy EC2 sẽ nhả Public IP cũ ra và nhận một Public IP mới tinh!<br>• <strong>Elastic IP (EIP)</strong>: Địa chỉ Public IPv4 tĩnh cố định (mặc định giới hạn <strong>tối đa 5 EIP mỗi Region</strong>). Miễn phí khi gắn vào máy EC2 đang chạy, nhưng bị tính phí nếu để không hoặc gắn vào máy đang Stopped."
      },
      {
        title: "2. Phân biệt sâu 3 loại Placement Groups (Đề thi rất chuộng hỏi phần này)",
        content: "• <strong>1. Cluster Placement Group</strong>: Nhét tất cả máy EC2 vào cùng <strong>1 AZ</strong>. Đạt băng thông 10–100 Gbps và độ trễ micro-giây. Chọn ngay khi thấy từ khóa: <strong>HPC (High Performance Computing), low-latency, tightly coupled node-to-node communication</strong>.<br>• <strong>2. Spread Placement Group</strong>: Đặt mỗi máy EC2 lên một tủ Rack tách biệt hoàn toàn. <strong>Giới hạn cứng cần thuộc lòng: Tối đa chỉ được 7 instances đang chạy trên mỗi AZ!</strong> Chọn khi có một số lượng nhỏ các máy chủ cực kỳ quan trọng (Critical instances) không được phép sập cùng lúc.<br>• <strong>3. Partition Placement Group</strong>: Chia các máy EC2 thành các <em>Partitions</em> (tối đa 7 partitions mỗi AZ, trải qua nhiều AZ), mỗi Partition chứa được hàng trăm máy EC2. Chọn ngay khi thấy tên các hệ thống dữ liệu phân tán lớn: <strong>Apache Hadoop, HDFS, HBase, Apache Kafka, Apache Cassandra</strong>."
      },
      {
        title: "3. ENI vs ENA vs EFA (Elastic Fabric Adapter)",
        content: "• <strong>ENI (Elastic Network Interface)</strong>: Card mạng ảo cơ bản. Lưu ý: Bạn chỉ có thể tháo lắp ENI giữa các máy EC2 nằm trong <strong>cùng 1 Availability Zone</strong>.<br>• <strong>EFA (Elastic Fabric Adapter)</strong>: Thiết bị mạng nâng cao gắn vào EC2 để tăng tốc các ứng dụng <strong>HPC (High Performance Computing) và Machine Learning</strong> trên hệ điều hành <strong>Linux</strong>. Nó cho phép bỏ qua nhân hệ điều hành (OS-bypass) và dùng thư viện <em>Message Passing Interface (MPI)</em> kết hợp với <strong>Cluster Placement Group</strong>."
      }
    ],
    extraCards: [
      { q: "Giới hạn tối đa số lượng máy chủ EC2 đang chạy trong mỗi Availability Zone đối với một Spread Placement Group là bao nhiêu?", a: "Tối đa 7 instances trên mỗi Availability Zone." },
      { q: "Khi triển khai ứng dụng siêu máy tính (HPC) trên Linux sử dụng thư viện MPI yêu cầu độ trễ mạng cực thấp và tính năng OS-bypass, ta nên kết hợp Cluster Placement Group với loại card mạng nào?", a: "EFA (Elastic Fabric Adapter)." },
      { q: "Một card mạng ảo ENI được tạo ở Subnet thuộc us-east-1a có thể tháo ra để gắn sang một máy chủ EC2 nằm ở us-east-1b được không?", a: "KHÔNG. ENI bị khóa chặt trong phạm vi 1 Availability Zone (Subnet)." }
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
      },
      {
        qEn: "A research team runs a weather forecasting High Performance Computing (HPC) application on Linux EC2 instances using Message Passing Interface (MPI). The application requires tightly coupled inter-node communication with the lowest possible latency and highest packet-per-second performance. Which configuration should the architect choose?",
        qVi: "Nhóm nghiên cứu chạy ứng dụng dự báo thời tiết HPC trên các máy EC2 Linux sử dụng giao thức MPI, đòi hỏi giao tiếp giữa các node cực kỳ chặt chẽ với độ trễ thấp nhất có thể. Cấu hình nào nên được chọn?",
        options: [
          "A. Place the EC2 instances in a Spread Placement Group and attach Elastic IPs.",
          "B. Place the EC2 instances in a Cluster Placement Group within a single AZ and enable Elastic Fabric Adapter (EFA).",
          "C. Place the EC2 instances in a Partition Placement Group across 3 AZs.",
          "D. Place the EC2 instances behind an Application Load Balancer."
        ],
        correctIdx: 1,
        explanation: "Cluster Placement Group (đặt chung 1 AZ) kết hợp với Elastic Fabric Adapter (EFA - hỗ trợ MPI và OS-bypass trên Linux) là bộ đôi chuẩn cho bài toán HPC."
      }
    ]
  },

  7: {
    jargon: [
      { term: "In-Memory State (RAM State)", plain: "Dữ liệu đang nằm trực tiếp trên thanh RAM của máy chủ (ví dụ biến toàn cục, bộ nhớ đệm cache đã mất công tính toán suốt 15 phút lúc khởi động)." },
      { term: "AWS Nitro Enclaves", plain: "Két sắt cô lập ngay bên trong máy chủ EC2: Một môi trường ảo hóa bị cắt đứt hoàn toàn ổ cứng, cắt đứt mạng Internet và cấm cả user root SSH vào — dùng để xử lý giải mã dữ liệu cực kỳ nhạy cảm (thẻ tín dụng, hồ sơ y tế, khóa mật mã)." }
    ],
    diagram: `
[Đang chạy: RAM có 32GB Cache] ──(Bấm Hibernate)──► Chép 32GB RAM xuống ổ [Root EBS Volume (Phải mã hóa!)] ──► Tắt máy (Không tốn tiền EC2)
                                                                                      │
[Khởi động lại siêu tốc trong vài giây!] ◄────────── Nạp ngược từ EBS lên RAM ────────┘`,
    deepSections: [
      {
        title: "1. Phân biệt rõ Stop vs Terminate vs Hibernate trên EC2",
        content: "• <strong>Stop (Tắt máy thường)</strong>: Hệ điều hành tắt, dữ liệu trên thanh RAM bị xóa sạch. Ổ cứng gắn kèm (EBS) vẫn giữ nguyên.<br>• <strong>Terminate (Xóa máy)</strong>: Hủy bỏ hoàn toàn máy ảo EC2. Mặc định ổ đĩa cài hệ điều hành (Root EBS Volume) sẽ bị xóa theo luôn (trừ khi bỏ tích ô <em>Delete on Termination</em>), còn các ổ EBS phụ gắn thêm thì được giữ lại.<br>• <strong>Hibernate (Ngủ đông)</strong>: Giữ nguyên toàn bộ trạng thái các tiến trình đang chạy trên RAM bằng cách ghi toàn bộ nội dung RAM xuống ổ đĩa Root EBS trước khi tắt máy."
      },
      {
        title: "2. Các điều kiện kỹ thuật của EC2 Hibernate & AWS Nitro Enclaves",
        content: "• <strong>Điều kiện bật EC2 Hibernate</strong>:<br>  1. Dung lượng RAM của máy phải <strong>nhỏ hơn 150 GB</strong>.<br>  2. Ổ đĩa <strong>Root EBS Volume bắt buộc phải có đủ dung lượng trống</strong> và <strong>BẮT BUỘC PHẢI ĐƯỢC MÃ HÓA (Encrypted)</strong>.<br>  3. Thời gian ngủ đông tối đa không quá <strong>60 ngày</strong>.<br>• <strong>AWS Nitro Enclaves (Hay xuất hiện trong câu hỏi Bảo mật nâng cao SAA-C03)</strong>: Cho phép tạo các môi trường tính toán hoàn toàn cô lập (Isolated compute environments) bên trong một máy EC2 để xử lý dữ liệu nhạy cảm cao (PII, tài chính, y tế, cryptographic keys). Nitro Enclave không có lưu trữ bền vững, không có kết nối mạng bên ngoài, và ngay cả Admin/Root của máy EC2 đó cũng không thể truy cập vào bên trong Enclave!"
      }
    ],
    extraCards: [
      { q: "Khi một máy chủ EC2 bị Terminate (xóa bỏ), điều gì xảy ra mặc định với ổ đĩa Root EBS Volume và các ổ EBS phụ gắn thêm?", a: "Mặc định ổ Root EBS Volume sẽ bị xóa tự động theo máy (Delete on Termination = true), còn các ổ EBS phụ gắn thêm sẽ được giữ lại." },
      { q: "Tính năng nào của nền tảng EC2 Nitro giúp tạo ra một môi trường tính toán cô lập hoàn toàn (không có ổ cứng, không có mạng ngoài, không cho phép root user truy cập) ngay bên trong máy EC2 để xử lý dữ liệu nhạy cảm PII?", a: "AWS Nitro Enclaves." }
    ],
    quizzes: [
      {
        qEn: "A legacy Java application running on an EC2 instance takes 12 minutes to initialize its in-memory cache upon startup. The instance is only needed during business hours. How can the solutions architect minimize the startup time each morning while saving compute costs overnight?",
        qVi: "Một ứng dụng Java cũ chạy trên EC2 mất 12 phút để nạp bộ nhớ đệm lên RAM mỗi khi khởi động. Máy chủ chỉ cần dùng trong giờ hành chính. Làm sao giảm tối đa thời gian bật máy mỗi sáng mà vẫn tiết kiệm tiền máy chủ ban đêm?",
        options: [
          "A. Use standard EC2 Stop/Start combined with a Placement Group.",
          "B. Enable EC2 Hibernate (with an encrypted root EBS volume) to hibernate the instance overnight.",
          "C. Switch to an EC2 Instance Store volume.",
          "D. Create an EBS Snapshot every night and restore it every morning."
        ],
        correctIdx: 1,
        explanation: "EC2 Hibernate lưu trạng thái in-memory (RAM) xuống ổ Root EBS được mã hóa, giúp máy bật lại vào sáng hôm sau giữ nguyên cache trong RAM mà không tốn tiền thuê CPU/RAM ban đêm."
      },
      {
        qEn: "A financial company processes highly sensitive credit card data on Amazon EC2 instances. Compliance requires that the decryption and processing of this data occur in a hardened, isolated compute environment on the EC2 instance with no persistent storage, no external networking, and no administrative SSH access. Which feature meets this requirement?",
        qVi: "Công ty tài chính xử lý dữ liệu thẻ tín dụng cực kỳ nhạy cảm trên EC2. Quy định yêu cầu việc giải mã và xử lý phải diễn ra trong một môi trường tính toán cô lập ngay trên EC2, không có ổ cứng lưu trữ, không có mạng ngoài và không cho phép Admin SSH vào. Tính năng nào đáp ứng được?",
        options: [
          "A. EC2 Dedicated Hosts",
          "B. AWS Nitro Enclaves",
          "C. EC2 Hibernate",
          "D. Security Groups"
        ],
        correctIdx: 1,
        explanation: "AWS Nitro Enclaves cung cấp môi trường CPU/RAM cô lập tuyệt đối bên trong máy EC2 (không lưu trữ, không mạng ngoài, không truy cập tương tác) chuyên dùng để xử lý dữ liệu mật mã và PII."
      }
    ]
  },

  8: {
    jargon: [
      { term: "Block Storage (Lưu trữ dạng khối)", plain: "Giống như ổ cứng C:, D: trong máy tính của bạn. Hệ điều hành có thể chia phân vùng, format định dạng ext4/XFS/NTFS và cài đặt phần mềm hay Database trực tiếp lên đó." },
      { term: "Incremental Backup (Sao lưu gia tăng)", plain: "Lần chụp Snapshot đầu tiên lưu 100GB. Lần chụp thứ 2 nếu chỉ có 5GB dữ liệu mới thay đổi thì AWS chỉ lưu đúng 5GB đó thôi (giúp tiết kiệm tối đa tiền lưu trữ S3)!" },
      { term: "Amazon Data Lifecycle Manager (DLM)", plain: "Người giúp việc tự động bấm nút chụp EBS Snapshot hàng ngày vào lúc 2h sáng và tự động xóa các bản chụp cũ quá 30 ngày để đỡ tốn tiền." }
    ],
    diagram: `
[AZ-a: EC2 #1] ◄──(Gắn trực tiếp)──► [Ổ đĩa EBS ở AZ-a (Chưa mã hóa)]
                                            │
                                 (1. Chụp EBS Snapshot)
                                            ▼
                                 (2. Copy Snapshot + Tích chọn Encrypt bằng KMS)
                                            ▼
[AZ-b: EC2 #2] ◄──(Gắn ổ mới)─────── [3. Tạo ổ EBS mới ở AZ-b (Đã được mã hóa!)]`,
    deepSections: [
      {
        title: "1. Đặc tính cốt lõi của Amazon EBS (Elastic Block Store)",
        content: "• EBS là ổ đĩa mạng gắn vào máy chủ EC2 trong phạm vi <strong>1 Availability Zone (AZ)</strong>.<br>• Bạn có thể <strong>tăng dung lượng và tăng hiệu năng của ổ EBS đang chạy (Elastic Volumes)</strong> mà không cần tắt máy hay tháo ổ đĩa! (Lưu ý: Chỉ có thể tăng dung lượng ổ EBS chứ không thể thu nhỏ/shrink dung lượng ổ EBS trực tiếp)."
      },
      {
        title: "2. Toàn bộ tính năng của EBS Snapshot cần nhớ để đi thi",
        content: "• <strong>Di chuyển liên AZ / liên Region</strong>: Để copy một ổ EBS từ <code>ap-southeast-1a</code> sang <code>ap-southeast-1b</code> (hoặc sang Region Tokyo), bạn chụp <strong>EBS Snapshot</strong> rồi tạo Volume mới từ Snapshot đó ở nơi đến.<br>• <strong>Mã hóa ổ EBS chưa mã hóa</strong>: Chụp EBS Snapshot → Copy Snapshot (hoặc tạo Volume mới từ Snapshot) và tích chọn <strong>Encrypt</strong>.<br>• <strong>Chia sẻ EBS Snapshot được mã hóa sang Tài khoản AWS khác (Cross-Account)</strong>: Phải dùng khóa <strong>Customer Managed Key (CMK)</strong> trong KMS (không dùng được khóa mặc định <code>aws/ebs</code>!), chia sẻ quyền dùng khóa KMS đó cho Tài khoản đích, rồi chia sẻ Snapshot.<br>• <strong>Amazon Data Lifecycle Manager (DLM)</strong>: Tự động hóa việc lập lịch chụp và xóa EBS Snapshot định kỳ.<br>• <strong>EBS Snapshot Archive</strong> (tiết kiệm 75% phí lưu trữ cho snapshot giữ lâu trên 90 ngày, khôi phục mất 24–72h) & <strong>Fast Snapshot Restore (FSR)</strong> (làm nóng sẵn snapshot để ổ EBS mới đạt 100% tốc độ IOPS ngay giây đầu tiên)."
      }
    ],
    extraCards: [
      { q: "Dịch vụ/tính năng nào dùng để tự động lập lịch chụp và xóa định kỳ các bản EBS Snapshots và EBS-backed AMIs?", a: "Amazon Data Lifecycle Manager (DLM)." },
      { q: "Làm thế nào để chia sẻ một bản EBS Snapshot ĐÃ ĐƯỢC MÃ HÓA sang một tài khoản AWS khác?", a: "Snapshot đó phải được mã hóa bằng Customer Managed KMS Key (nếu đang dùng Default AWS Managed Key thì phải copy sang khóa CMK mới), sau đó chia sẻ cả Snapshot lẫn quyền truy cập KMS Key cho tài khoản đích." },
      { q: "Khi cần lưu trữ các bản EBS Snapshot ít khi dùng đến trong vòng 1 năm với chi phí tiết kiệm tới 75% (chấp nhận mất 24-72 giờ khi khôi phục), ta dùng tính năng gì?", a: "Amazon EBS Snapshot Archive." }
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
      },
      {
        qEn: "A company regularly restores large production databases from Amazon EBS snapshots onto new EBS volumes for testing. However, the team notices severe I/O latency during the first few hours after each volume is created because data blocks are lazily loaded from Amazon S3. Which feature eliminates this initial latency?",
        qVi: "Công ty thường xuyên khôi phục DB lớn từ EBS Snapshot ra các ổ EBS mới. Tuy nhiên trong vài giờ đầu tiên ổ đĩa mới bị trễ I/O nặng do dữ liệu phải tải từ từ trên S3 xuống. Tính năng nào loại bỏ hoàn toàn độ trễ khởi tạo này?",
        options: [
          "A. EBS Snapshot Archive",
          "B. Amazon EBS Fast Snapshot Restore (FSR)",
          "C. EBS Recycle Bin",
          "D. EBS Multi-Attach"
        ],
        correctIdx: 1,
        explanation: "Fast Snapshot Restore (FSR) khởi tạo trước toàn bộ khối dữ liệu của EBS Volume ngay lúc tạo từ Snapshot, giúp ổ đĩa đạt 100% hiệu năng IOPS ngay lập tức."
      }
    ]
  },

  9: {
    jargon: [
      { term: "IOPS (Input/Output Operations Per Second)", plain: "Số lần đọc/ghi ngẫu nhiên mỗi giây. Cơ sở dữ liệu (MySQL, Oracle, MongoDB) cực kỳ khát chỉ số IOPS này!" },
      { term: "Throughput (MB/s)", plain: "Tổng lưu lượng megabyte truyền đi mỗi giây. Phù hợp khi đọc các file video lớn hoặc quét log tuần tự từ đầu đến cuối." },
      { term: "RAID 0 vs RAID 1 trên EBS", plain: "RAID 0 = Ghép 2 ổ EBS lại để cộng dồn tốc độ IOPS và dung lượng gấp đôi (nhưng hỏng 1 ổ là mất hết). RAID 1 = Ghi song song 2 ổ để dự phòng (Không cần thiết trên EBS vì bản thân EBS đã tự sao lưu ngầm bên trong AZ rồi)." }
    ],
    diagram: `
Chọn loại ổ cứng cho EC2:
 ├── Cần > 16,000 IOPS (hoặc tới 256,000 IOPS cho DB khủng)? ──► EBS io1 / io2 Block Express
 ├── Cần gắn 1 ổ EBS vào nhiều máy EC2 trong CÙNG 1 AZ?      ──► EBS io1 / io2 (Bật Multi-Attach + Cluster File System)
 ├── Cần SSD đa dụng giá rẻ, chỉnh IOPS độc lập dung lượng?   ──► EBS gp3 (Tối đa 16,000 IOPS)
 ├── Cần đọc dữ liệu tuần tự Big Data / Log giá rẻ (HDD)?    ──► EBS st1 (Throughput) / sc1 (Cold) [Không làm ổ Boot!]
 └── Cần hàng triệu IOPS làm Cache/Buffer tạm thời?          ──► EC2 Instance Store (NVMe vật lý - Stop máy là mất!)`,
    deepSections: [
      {
        title: "1. So sánh chi tiết gp2 vs gp3 và io1 vs io2 (Đề thi rất hay hỏi con số 16,000 IOPS)",
        content: "• <strong>EBS gp2 (Thế hệ cũ)</strong>: Dung lượng ổ càng to thì IOPS mới càng cao (3 IOPS/GB, tối đa <strong>16,000 IOPS</strong>).<br>• <strong>EBS gp3 (Thế hệ mới - Mặc định khuyên dùng)</strong>: Rẻ hơn gp2 20%, mặc định có sẵn 3,000 IOPS và 125 MB/s. Bạn có thể <strong>tăng IOPS lên tối đa 16,000 IOPS và Throughput lên 1,000 MB/s hoàn toàn độc lập với dung lượng ổ đĩa</strong>.<br>• <strong>EBS io1 / io2 Block Express (Provisioned IOPS SSD)</strong>: Khi đề bài yêu cầu hiệu năng <strong>trên 16,000 IOPS</strong> (ví dụ: 30,000 IOPS hoặc 64,000 IOPS, lên tới 256,000 IOPS với io2 Block Express) hoặc yêu cầu độ bền 99.999% → Bắt buộc phải chọn <strong>io1 / io2</strong>!"
      },
      {
        title: "2. Tính năng EBS Multi-Attach & Ghép ổ RAID 0",
        content: "• <strong>EBS Multi-Attach</strong>: Chỉ có trên <strong><code>io1</code> và <code>io2</code></strong>, cho phép gắn đồng thời 1 ổ đĩa vào <strong>tối đa 16 máy EC2 nằm trong CÙNG 1 Availability Zone</strong>. Bắt buộc phải dùng hệ thống file nhận biết cụm (<strong>Cluster-aware file system</strong> như GFS2, OCFS2), không được dùng ext4/XFS chuẩn.<br>• <strong>EBS RAID 0</strong>: Nếu đề bài yêu cầu đạt tốc độ đọc ghi cực đại (ví dụ 500,000 IOPS hoặc 3,000 MB/s vượt quá giới hạn của 1 ổ đơn lẻ) → Giải pháp là gắn nhiều ổ EBS vào máy EC2 rồi cấu hình <strong>RAID 0 (Striping)</strong> ở tầng hệ điều hành."
      }
    ],
    extraCards: [
      { q: "Những loại ổ cứng EBS nào KHÔNG THỂ dùng làm ổ đĩa khởi động hệ điều hành (Boot Volume)?", a: "Hai loại ổ cứng cơ học HDD là st1 (Throughput Optimized HDD) và sc1 (Cold HDD) không thể dùng làm Boot Volume." },
      { q: "Khi sử dụng tính năng EBS Multi-Attach (trên ổ io1/io2) để gắn 1 ổ đĩa vào nhiều máy EC2 trong cùng 1 AZ, tại sao không được dùng hệ thống file ext4 hoặc XFS thông thường?", a: "Vì ext4/XFS không kiểm soát khóa ghi đồng thời từ nhiều máy chủ, sẽ gây hỏng dữ liệu (Data corruption). Phải dùng Cluster-aware file system (như GFS2)." }
    ],
    quizzes: [
      {
        qEn: "A production relational database runs on an EC2 instance using a 1 TB gp2 EBS volume. The database is experiencing I/O bottlenecks and requires 12,000 IOPS consistently, but does not need additional storage capacity. What is the MOST cost-effective way to meet the performance requirement?",
        qVi: "Một cơ sở dữ liệu chạy trên EC2 đang dùng ổ EBS gp2 dung lượng 1 TB (chỉ đạt 3,000 IOPS). Hiện DB bị nghẽn I/O và cần 12,000 IOPS ổn định nhưng không cần tăng thêm dung lượng lưu trữ. Cách nào tiết kiệm chi phí nhất?",
        options: [
          "A. Increase the gp2 volume size from 1 TB to 4 TB to achieve 12,000 IOPS.",
          "B. Modify the volume type to gp3 and provision 12,000 IOPS independently while keeping the 1 TB capacity.",
          "C. Migrate the volume to EBS io2 Block Express.",
          "D. Migrate the data to an st1 Throughput Optimized HDD volume."
        ],
        correctIdx: 1,
        explanation: "Vì mức 12,000 IOPS vẫn nằm dưới ngưỡng tối đa 16,000 IOPS của gp3, việc chuyển từ gp2 sang gp3 cho phép tăng riêng chỉ số IOPS lên 12,000 mà không cần mua thừa dung lượng hay trả giá đắt cho io2."
      },
      {
        qEn: "A company is deploying a mission-critical clustered application across 4 Linux EC2 instances in a single Availability Zone (us-east-1a). The application uses a cluster-aware file system (GFS2) and requires all 4 instances to concurrently read and write to the same raw block storage volume with 40,000 IOPS. Which storage solution should be used?",
        qVi: "Công ty triển khai ứng dụng cụm quan trọng trên 4 máy EC2 Linux trong cùng 1 AZ (us-east-1a). Ứng dụng dùng hệ thống file GFS2 và yêu cầu cả 4 máy cùng đọc/ghi trực tiếp vào chung 1 ổ đĩa Block Storage với tốc độ 40,000 IOPS. Chọn giải pháp nào?",
        options: [
          "A. Amazon EFS",
          "B. Amazon EBS gp3 with Multi-Attach enabled",
          "C. Amazon EBS io2 with Multi-Attach enabled",
          "D. EC2 Instance Store"
        ],
        correctIdx: 2,
        explanation: "Bài toán yêu cầu Block storage dùng chung trong CÙNG 1 AZ với GFS2 và 40,000 IOPS (>16,000 IOPS) -> Chỉ có EBS io1/io2 hỗ trợ tính năng Multi-Attach và đạt mức 40,000 IOPS."
      }
    ]
  },

  10: {
    jargon: [
      { term: "NFS (Network File System - Port 2049)", plain: "Chuẩn chia sẻ thư mục mạng trên hệ điều hành Linux (cổng mạng 2049). Nhiều máy chủ Linux có thể mount chung 1 thư mục và đọc/ghi file cùng lúc." },
      { term: "General Purpose vs Max I/O Mode (EFS)", plain: "General Purpose = Độ trễ thấp cho từng file (Web server, CMS, WordPress). Max I/O = Thông lượng tổng cực lớn cho hàng nghìn máy cùng đọc dữ liệu lớn (Big Data, Media)." },
      { term: "EFS Access Points", plain: "Cổng kiểm soát riêng trên EFS giúp ép buộc quyền User/Group POSIX và khóa chặt một ứng dụng (hoặc hàm Lambda/ECS container) chỉ được nhìn thấy đúng 1 thư mục con trên EFS." }
    ],
    diagram: `
   [AZ-a: EC2 Linux #1] ──┐
   [AZ-b: EC2 Linux #2] ──┼──(Mount qua cổng 2049 NFS / EFS Mount Target)──► [Amazon EFS (Tự động co giãn, Multi-AZ)]
   [AZ-c: ECS Fargate ] ──┘                                                           │
                                                                       (Sau 30 ngày không mở file)
                                                                                       ▼
                                                                         [Tầng EFS Standard-IA (Giảm 90% phí!)]`,
    deepSections: [
      {
        title: "1. Tại sao Amazon EFS là đáp án vàng cho bài toán 'Nhiều máy Linux chia sẻ file qua nhiều AZ'?",
        content: "• Khác với EBS (chỉ nằm ở 1 AZ), <strong>Amazon EFS tự động trải rộng trên nhiều AZ (Multi-AZ)</strong>. Bạn đặt một <em>Mount Target</em> ở mỗi AZ để hàng trăm máy EC2, container ECS hoặc hàm Lambda cùng truy cập chung một kho file.<br>• <strong>Kiểm soát truy cập vào EFS</strong>: Khi máy EC2 mount ổ EFS mà bị treo (Connection timeout) → Kiểm tra ngay xem <strong>Security Group của EFS đã mở cổng Inbound <code>2049 (NFS)</code> cho Security Group của EC2 chưa</strong>!<br>• <strong>EFS Access Points</strong>: Cực kỳ quan trọng khi kết hợp EFS với <strong>AWS Lambda hoặc ECS Fargate</strong> để gắn cố định định danh POSIX user/group và khóa ứng dụng vào một thư mục gốc riêng (<code>/app1</code>, <code>/app2</code>)."
      },
      {
        title: "2. Các chế độ Hiệu năng (Performance Modes) & Thông lượng (Throughput Modes) của EFS",
        content: "• <strong>Performance Modes</strong>:<br>  1. <code>General Purpose</code> (Mặc định): Độ trễ thấp nhất cho từng thao tác file (Web serving, WordPress, CMS).<br>  2. <code>Max I/O</code>: Đánh đổi độ trễ tăng nhẹ để lấy tổng số IOPS cao nhất khi có hàng trăm/nghìn máy chủ cùng đọc ghi song song (Big Data, Media processing).<br>• <strong>Throughput Modes</strong>:<br>  1. <code>Elastic</code>: Tự động co giãn thông lượng theo nhu cầu thực tế (dành cho tải thất thường không đoán trước được).<br>  2. <code>Bursting</code>: Dung lượng file càng nhiều thì băng thông càng lớn.<br>  3. <code>Provisioned</code>: Khai báo băng thông MB/s cao cố định ngay cả khi dung lượng dữ liệu lưu trữ rất ít (High throughput-to-storage ratio)."
      }
    ],
    extraCards: [
      { q: "Khi máy chủ EC2 Linux không thể mount được ổ đĩa Amazon EFS (báo lỗi Connection Timed Out), cần mở cổng mạng số mấy trong Security Group của EFS?", a: "Cổng TCP 2049 (giao thức NFS)." },
      { q: "Khi một ổ đĩa Amazon EFS chứa rất ít dữ liệu (ví dụ chỉ 10 GB) nhưng ứng dụng lại đòi hỏi băng thông đọc/ghi cực cao và ổn định liên tục (ví dụ 500 MB/s), ta phải chọn chế độ Throughput Mode nào?", a: "Provisioned Throughput Mode." },
      { q: "Tính năng nào của Amazon EFS giúp gán định danh người dùng hệ điều hành (POSIX user/group) và giới hạn từng container ECS Fargate chỉ được truy cập vào một thư mục con riêng biệt trên cùng 1 ổ EFS?", a: "EFS Access Points." }
    ],
    quizzes: [
      {
        qEn: "A company hosts a content management system (CMS) on a fleet of Linux EC2 instances distributed across three Availability Zones behind an Application Load Balancer. All instances must read and write user-uploaded documents to a shared POSIX-compliant file system concurrently. Which storage solution should be used?",
        qVi: "Công ty chạy hệ thống quản trị nội dung (CMS) trên dàn máy Linux EC2 trải rộng qua 3 AZ phía sau ALB. Tất cả các máy chủ phải đọc và ghi tài liệu do người dùng tải lên vào chung một hệ thống file chuẩn POSIX đồng thời. Chọn giải pháp lưu trữ nào?",
        options: [
          "A. Amazon EBS io2 with Multi-Attach enabled",
          "B. Amazon EFS (Elastic File System)",
          "C. Amazon S3 Standard",
          "D. Amazon FSx for Windows File Server"
        ],
        correctIdx: 1,
        explanation: "EBS Multi-Attach chỉ hoạt động trong CÙNG 1 AZ. Để chia sẻ hệ thống file POSIX đồng thời cho nhiều máy Linux EC2 trải trên NHIỀU AZ (Multi-AZ), đáp án duy nhất đúng là Amazon EFS."
      },
      {
        qEn: "An engineer created an Amazon EFS file system and mount targets in each Availability Zone. However, when running the 'mount' command from an EC2 instance in the same VPC, the connection times out. What is the MOST likely cause?",
        qVi: "Kỹ sư đã tạo ổ EFS và Mount Target ở từng AZ. Tuy nhiên khi chạy lệnh 'mount' từ máy EC2 trong cùng VPC thì bị lỗi Connection Timed Out. Nguyên nhân khả dĩ nhất là gì?",
        options: [
          "A. An EFS Lifecycle Policy has not been enabled.",
          "B. The security group attached to the EFS mount target does not allow inbound TCP port 2049 (NFS) from the EC2 instance's security group.",
          "C. An Elastic IP has not been attached to the EFS file system.",
          "D. The EC2 instance is not in a Spread Placement Group."
        ],
        correctIdx: 1,
        explanation: "Amazon EFS giao tiếp qua giao thức NFS ở cổng TCP 2049. Nếu Security Group của EFS Mount Target chưa cho phép cổng 2049 từ Security Group của EC2 thì lệnh mount sẽ bị Connection Timed Out."
      }
    ]
  }
};
