window.LAB_DATA = window.LAB_DATA || {};
Object.assign(window.LAB_DATA, {
  1: {
    title: "Bảo vệ Root, tạo IAM Group/User, bật MFA và kiểm chứng Explicit Deny",
    type: "console",
    duration: "30-40 phút",
    cost: "Miễn phí (IAM và 2 budget đầu tiên không mất phí)",
    goal: "Thiết lập tài khoản AWS an toàn theo chuẩn: Root có MFA, làm việc bằng IAM User thuộc Group, có cảnh báo chi phí, và tự tay chứng minh Explicit Deny luôn thắng Allow.",
    prerequisites: ["Tài khoản AWS mới (đăng nhập bằng Root email)", "Ứng dụng MFA trên điện thoại (Google Authenticator, Microsoft Authenticator, Authy...)", "Region làm việc: ap-southeast-1 (Singapore)"],
    steps: [
      { title: "Bật MFA cho Root", detail: "Đăng nhập Root → góc phải bấm tên tài khoản → <strong>Security credentials</strong> → mục <strong>Multi-factor authentication (MFA)</strong> → <strong>Assign MFA device</strong> → chọn <strong>Authenticator app</strong>, quét QR và nhập 2 mã liên tiếp.<br>Kiểm tra mục <strong>Access keys</strong> của Root: phải trống, nếu có thì xóa ngay." },
      { title: "Tạo cảnh báo ngân sách", detail: "Vào <strong>Billing and Cost Management → Budgets → Create budget</strong> → chọn template <strong>Zero spend budget</strong> hoặc <strong>Monthly cost budget</strong> với số tiền <code>3 USD</code> → nhập email nhận cảnh báo → <strong>Create budget</strong>." },
      { title: "Tạo Group Developers và gắn policy", detail: "<strong>IAM → User groups → Create group</strong> → tên <code>Developers</code> → tick policy <code>PowerUserAccess</code> và <code>IAMUserChangePassword</code> → <strong>Create user group</strong>.", cli: "aws iam create-group --group-name Developers\naws iam attach-group-policy --group-name Developers --policy-arn arn:aws:iam::aws:policy/PowerUserAccess" },
      { title: "Tạo IAM User cho chính bạn", detail: "<strong>IAM → Users → Create user</strong> → tên <code>dev-yourname</code> → tick <strong>Provide user access to the AWS Management Console</strong> → chọn <strong>I want to create an IAM user</strong> → đặt mật khẩu → <strong>Add user to group</strong>: <code>Developers</code> → Create. Sau đó vào user → tab <strong>Security credentials</strong> → <strong>Assign MFA device</strong>.", cli: "aws iam create-user --user-name dev-yourname\naws iam add-user-to-group --user-name dev-yourname --group-name Developers" },
      { title: "Thêm inline policy Deny để thử nghiệm", detail: "Vào user <code>dev-yourname</code> → <strong>Add permissions → Create inline policy</strong> → tab JSON, dán policy có <code>Effect: Deny</code>, <code>Action: s3:*</code>, <code>Resource: *</code> → đặt tên <code>DenyS3Test</code> → Create.<br>Lưu ý: PowerUserAccess vẫn đang Allow <code>s3:*</code>." },
      { title: "Đăng nhập bằng IAM User và kiểm chứng", detail: "Mở cửa sổ ẩn danh, đăng nhập qua URL <code>https://ACCOUNT_ID.signin.aws.amazon.com/console</code> bằng <code>dev-yourname</code>. Mở <strong>S3</strong> → sẽ thấy lỗi <strong>Access Denied</strong> dù group có Allow. Mở <strong>EC2</strong> → vẫn xem được bình thường." },
      { title: "Dùng Policy Simulator để xác nhận", detail: "Mở <code>https://policysim.aws.amazon.com</code> → chọn user <code>dev-yourname</code> → service S3 → action <code>ListAllMyBuckets</code> → <strong>Run Simulation</strong> → kết quả <strong>denied</strong> với lý do <em>explicitly denied</em> bởi <code>DenyS3Test</code>." }
    ],
    verify: ["Root có MFA và không có Access Key (IAM → Dashboard không còn cảnh báo bảo mật)", "Budget hiển thị trạng thái OK trong Budgets", "User dev-yourname thuộc group Developers và có MFA", "Truy cập S3 bị từ chối do Explicit Deny dù có PowerUserAccess"],
    cleanup: ["Xóa inline policy DenyS3Test khỏi user (giữ lại user để dùng cho các lab sau)", "Từ nay đăng xuất Root, chỉ dùng IAM User dev-yourname", "GIỮ NGUYÊN budget cảnh báo cho toàn bộ khóa học"],
    examLink: "Bẫy kinh điển: Explicit Deny luôn thắng mọi Allow. Câu hỏi 'phân quyền cho 50 dev mới dễ bảo trì nhất' → tạo IAM Group, gắn policy vào group. Group không lồng group được. Root: bật MFA, không tạo Access Key."
  },
  2: {
    title: "Gắn IAM Role cho EC2 truy cập S3 không cần Access Key + Credentials Report & Access Advisor",
    type: "console",
    duration: "35-45 phút",
    cost: "Miễn phí (Free Tier: t3.micro/t2.micro 750 giờ/tháng)",
    goal: "Chứng minh ứng dụng trên EC2 lấy credential tạm thời từ STS qua IAM Role (không lưu key trong code Java), và biết dùng 2 công cụ kiểm toán IAM.",
    prerequisites: ["Đã hoàn thành Lab 1 (IAM User có quyền quản trị)", "Ít nhất 1 S3 bucket bất kỳ (hoặc tạo mới trong bài)"],
    steps: [
      { title: "Tạo IAM Role cho EC2", detail: "<strong>IAM → Roles → Create role</strong> → Trusted entity: <strong>AWS service</strong> → Use case: <strong>EC2</strong> → gắn policy <code>AmazonS3ReadOnlyAccess</code> → tên <code>EC2-S3-ReadOnly-Role</code> → Create role.", cli: "aws iam create-role --role-name EC2-S3-ReadOnly-Role --assume-role-policy-document file://ec2-trust.json\naws iam attach-role-policy --role-name EC2-S3-ReadOnly-Role --policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess\naws iam create-instance-profile --instance-profile-name EC2-S3-ReadOnly-Role\naws iam add-role-to-instance-profile --instance-profile-name EC2-S3-ReadOnly-Role --role-name EC2-S3-ReadOnly-Role" },
      { title: "Launch EC2 KHÔNG có role", detail: "<strong>EC2 → Instances → Launch instances</strong> → tên <code>role-lab</code> → AMI <strong>Amazon Linux 2023</strong> → type <code>t3.micro</code> → Key pair: <em>Proceed without a key pair</em> (dùng EC2 Instance Connect) → SG cho phép SSH 22 từ <strong>My IP</strong> → Launch." },
      { title: "Thử gọi S3 khi chưa có role", detail: "Chọn instance → <strong>Connect → EC2 Instance Connect → Connect</strong>. Chạy lệnh bên dưới → nhận lỗi <code>Unable to locate credentials</code>.", cli: "aws s3 ls --region ap-southeast-1" },
      { title: "Gắn role và thử lại", detail: "Chọn instance → <strong>Actions → Security → Modify IAM role</strong> → chọn <code>EC2-S3-ReadOnly-Role</code> → Update. Quay lại terminal chạy lại lệnh: liệt kê được bucket. Xem credential tạm thời từ Instance Metadata (IMDSv2) để thấy có <code>Expiration</code>.", cli: "aws s3 ls\naws sts get-caller-identity\nTOKEN=$(curl -s -X PUT http://169.254.169.254/latest/api/token -H 'X-aws-ec2-metadata-token-ttl-seconds: 300')\ncurl -s -H \"X-aws-ec2-metadata-token: $TOKEN\" http://169.254.169.254/latest/meta-data/iam/security-credentials/EC2-S3-ReadOnly-Role" },
      { title: "Thử quyền ghi bị chặn", detail: "Chạy lệnh tạo bucket hoặc upload → lỗi <code>AccessDenied</code> vì role chỉ ReadOnly. Với Java: <code>S3Client.builder().build()</code> dùng <strong>DefaultCredentialsProvider</strong> sẽ tự lấy credential từ role, không cần cấu hình gì thêm.", cli: "echo hello > a.txt\naws s3 cp a.txt s3://TEN-BUCKET-CUA-BAN/" },
      { title: "Tải IAM Credentials Report", detail: "<strong>IAM → Credential report → Download credentials report</strong> → mở file CSV, xem cột <code>mfa_active</code>, <code>password_last_used</code>, <code>access_key_1_active</code> của mọi user.", cli: "aws iam generate-credential-report\naws iam get-credential-report --query Content --output text | base64 -d > report.csv" },
      { title: "Xem Access Advisor", detail: "<strong>IAM → Users → dev-yourname → tab Last Accessed</strong> (Access Advisor) → xem dịch vụ nào được dùng lần cuối khi nào → dịch vụ chưa từng dùng là ứng viên cần cắt bỏ (Least Privilege). Làm tương tự với role <code>EC2-S3-ReadOnly-Role</code>." }
    ],
    verify: ["Trước khi gắn role: lỗi Unable to locate credentials", "Sau khi gắn role: aws s3 ls thành công, get-caller-identity trả về ARN dạng assumed-role/EC2-S3-ReadOnly-Role/i-xxxx", "Credential từ metadata có AccessKeyId bắt đầu bằng ASIA (tạm thời) và có Expiration", "Có file CSV Credentials Report"],
    cleanup: ["Terminate instance role-lab", "Giữ role EC2-S3-ReadOnly-Role để dùng lại cho các lab sau (không tốn phí)"],
    examLink: "'Ứng dụng trên EC2 truy cập S3/DynamoDB an toàn nhất' → Attach IAM Role (loại ngay đáp án lưu Access Key trong code/file). Kiểm tra toàn account ai chưa bật MFA → Credentials Report; thu gọn quyền 1 user/role → Access Advisor."
  },
  3: {
    title: "Launch EC2 với User Data tự cài Java + web server",
    type: "console",
    duration: "30-40 phút",
    cost: "Miễn phí (Free Tier t3.micro). Public IPv4 tính 0.005 USD/giờ nếu đã hết ưu đãi Free Tier - terminate ngay sau lab",
    goal: "Dùng User Data để bootstrap EC2 (cài Amazon Corretto 17 và chạy một HTTP server Java) và chứng minh User Data chỉ chạy ở lần boot đầu tiên.",
    prerequisites: ["IAM User có quyền EC2", "Biết cơ bản về bash"],
    steps: [
      { title: "Chuẩn bị Security Group", detail: "<strong>EC2 → Security Groups → Create security group</strong> → tên <code>web-sg</code> → Inbound: <code>HTTP 80</code> từ <code>0.0.0.0/0</code>, <code>SSH 22</code> từ <strong>My IP</strong> → Create." },
      { title: "Launch instance kèm User Data", detail: "<strong>EC2 → Launch instances</strong> → tên <code>userdata-lab</code> → AMI <strong>Amazon Linux 2023</strong> → <code>t3.micro</code> → SG <code>web-sg</code> → mở <strong>Advanced details</strong> → ô <strong>User data</strong> dán script bên dưới → Launch.<br>Script cài Corretto 17, tạo trang bằng <code>jwebserver</code> (có sẵn từ JDK 18+ nên dùng Corretto 21) và ghi thời điểm chạy vào file log.", cli: "#!/bin/bash\ndnf install -y java-21-amazon-corretto-headless\nmkdir -p /opt/web\necho \"<h1>Hello from $(hostname -f) - boot at $(date)</h1>\" > /opt/web/index.html\necho \"UserData ran at $(date)\" >> /var/log/userdata-run.log\nnohup jwebserver -b 0.0.0.0 -p 80 -d /opt/web > /var/log/jweb.log 2>&1 &" },
      { title: "Kiểm tra trang web", detail: "Chờ trạng thái <strong>2/2 checks passed</strong> → copy <strong>Public IPv4 address</strong> → mở <code>http://PUBLIC_IP</code> trên trình duyệt → thấy dòng Hello kèm hostname." },
      { title: "Xem log cloud-init", detail: "Connect bằng <strong>EC2 Instance Connect</strong> và kiểm tra User Data đã chạy với quyền root.", cli: "sudo cat /var/log/userdata-run.log\nsudo tail -n 30 /var/log/cloud-init-output.log\njava -version" },
      { title: "Reboot và chứng minh User Data không chạy lại", detail: "<strong>Instance state → Reboot instance</strong>. Sau khi máy lên lại, kết nối và xem <code>/var/log/userdata-run.log</code> vẫn chỉ có 1 dòng; trang web không còn chạy vì <code>jwebserver</code> không được khởi động lại (muốn chạy bền vững phải tạo systemd service).", cli: "sudo cat /var/log/userdata-run.log\ncurl -s localhost || echo 'web server khong chay sau reboot'" },
      { title: "Xem các Instance Family", detail: "<strong>EC2 → Instance types</strong> → lọc <code>m7g</code>, <code>c7i</code>, <code>r7i</code>, <code>i4i</code> → so sánh vCPU/Memory/Instance storage để nhớ: M cân bằng, C nhiều CPU, R nhiều RAM, I ổ NVMe IOPS cao." }
    ],
    verify: ["Trình duyệt hiển thị trang Hello từ EC2", "/var/log/userdata-run.log chỉ có 1 dòng sau reboot", "java -version hiển thị Corretto"],
    cleanup: ["Terminate instance userdata-lab", "Có thể giữ web-sg cho lab sau"],
    examLink: "User Data chạy 1 lần ở first boot với quyền root. Đề hỏi 'In-memory cache / high-performance database' → dòng R; 'batch, video encoding, HPC' → dòng C; 'NoSQL/OLTP cần IOPS cục bộ cao' → dòng I."
  },
  4: {
    title: "Security Group: Stateful, Timeout vs Refused và SG Referencing",
    type: "console",
    duration: "40-50 phút",
    cost: "Miễn phí (Free Tier, 2 x t3.micro)",
    goal: "Phân biệt lỗi Connection timed out (do SG) và Connection refused (do app), và cấu hình tầng DB chỉ nhận kết nối từ SG của tầng Web.",
    prerequisites: ["Đã làm Lab 3", "Biết dùng EC2 Instance Connect"],
    steps: [
      { title: "Tạo 2 Security Group", detail: "<strong>EC2 → Security Groups → Create</strong>:<br>1) <code>web-tier-sg</code>: Inbound SSH 22 từ My IP, HTTP 80 từ 0.0.0.0/0.<br>2) <code>app-tier-sg</code>: Inbound SSH 22 từ My IP. Chưa mở cổng 8080.", cli: "aws ec2 create-security-group --group-name web-tier-sg --description web --vpc-id VPC_ID\naws ec2 create-security-group --group-name app-tier-sg --description app --vpc-id VPC_ID" },
      { title: "Launch 2 instance", detail: "Launch 2 máy Amazon Linux 2023 <code>t3.micro</code>: <code>web-1</code> gắn <code>web-tier-sg</code>, <code>app-1</code> gắn <code>app-tier-sg</code>. Ghi lại <strong>Private IPv4</strong> của <code>app-1</code>." },
      { title: "Tái hiện Connection timed out", detail: "Từ <code>web-1</code> (Instance Connect) gọi sang cổng 8080 của <code>app-1</code> → treo rồi báo <strong>timed out</strong> vì SG chặn (gói tin bị drop im lặng).", cli: "curl -v --connect-timeout 5 http://APP_PRIVATE_IP:8080" },
      { title: "Mở cổng bằng SG Referencing", detail: "<code>app-tier-sg</code> → <strong>Edit inbound rules → Add rule</strong> → Custom TCP <code>8080</code> → Source: chọn <strong>Custom</strong> và gõ <code>sg-</code> rồi chọn <code>web-tier-sg</code> (không nhập IP) → Save.", cli: "aws ec2 authorize-security-group-ingress --group-id APP_SG_ID --protocol tcp --port 8080 --source-group WEB_SG_ID" },
      { title: "Tái hiện Connection refused", detail: "Gọi lại từ <code>web-1</code> → lần này báo ngay <strong>Connection refused</strong>: gói tin đã qua SG nhưng chưa có app nào lắng nghe cổng 8080.", cli: "curl -v --connect-timeout 5 http://APP_PRIVATE_IP:8080" },
      { title: "Chạy app và kiểm chứng Stateful", detail: "Trên <code>app-1</code> chạy web server Java ở cổng 8080 rồi gọi lại từ <code>web-1</code> → thành công. Mở Outbound rules của <code>app-tier-sg</code>: dù bạn xóa hết outbound rule, response vẫn quay về được vì SG là <strong>stateful</strong>.", cli: "sudo dnf install -y java-21-amazon-corretto-headless\nmkdir -p ~/w && echo ok-from-app > ~/w/index.html\njwebserver -b 0.0.0.0 -p 8080 -d ~/w" },
      { title: "Thử nghiệm thêm", detail: "Từ máy cá nhân gọi thẳng <code>http://APP_PUBLIC_IP:8080</code> → timed out vì nguồn không thuộc <code>web-tier-sg</code>. Quan sát: SG không có lựa chọn <strong>Deny</strong>, muốn chặn 1 IP cụ thể phải dùng NACL." }
    ],
    verify: ["Lần 1: timed out; lần 2: connection refused; lần 3: nhận được ok-from-app", "Rule 8080 của app-tier-sg có Source là ID của web-tier-sg", "Máy cá nhân không gọi được cổng 8080"],
    cleanup: ["Terminate web-1 và app-1", "Xóa app-tier-sg và web-tier-sg (xóa rule tham chiếu chéo trước nếu báo lỗi dependency)"],
    examLink: "Timed out → SG/NACL chặn; Connection refused → app chưa chạy. SG stateful, chỉ có Allow, mặc định chặn hết inbound/mở hết outbound. Tầng DB nên tham chiếu SG của tầng Web/App thay vì IP."
  },
  5: {
    title: "Chọn phương án mua EC2: khảo sát Spot, Savings Plans và tình huống tối ưu chi phí",
    type: "design",
    duration: "30-40 phút",
    cost: "Miễn phí (chỉ xem console và tính toán, không tạo tài nguyên)",
    goal: "Biết tra cứu giá Spot, xem đề xuất Savings Plans và tự quyết định phương án mua cho từng loại workload như đề thi.",
    prerequisites: ["IAM User có quyền đọc EC2 và Cost Management"],
    steps: [
      { title: "Xem lịch sử giá Spot", detail: "<strong>EC2 → Spot Requests → Pricing history</strong> → chọn instance type <code>m5.large</code>, Platform Linux, khoảng 1 tháng → so sánh với giá On-Demand trên trang pricing để thấy mức giảm 60-90%.", cli: "aws ec2 describe-spot-price-history --instance-types m5.large --product-descriptions Linux/UNIX --max-items 5 --region ap-southeast-1" },
      { title: "Xem Spot placement score", detail: "<strong>EC2 → Spot Requests → Spot placement score</strong> → nhập yêu cầu 10 instance <code>m5.large</code>, <code>m6i.large</code> → xem điểm khả năng có capacity theo Region/AZ. Hiểu vì sao nên đa dạng hóa instance type khi dùng Spot." },
      { title: "Xem Savings Plans và Reserved Instances", detail: "<strong>Billing and Cost Management → Savings Plans → Recommendations</strong> (tài khoản mới có thể chưa có dữ liệu) và <strong>EC2 → Reserved Instances → Purchase Reserved Instances</strong> → chọn Standard vs Convertible, 1 năm vs 3 năm, No/Partial/All Upfront để xem giá. <strong>KHÔNG bấm mua.</strong>" },
      { title: "Xem Dedicated Hosts và Capacity Reservations", detail: "<strong>EC2 → Dedicated Hosts → Allocate Dedicated Host</strong> và <strong>EC2 → Capacity Reservations → Create</strong>: chỉ đọc các tùy chọn (số socket/core, instance family, AZ) rồi <strong>Cancel</strong>. Không tạo vì sẽ bị tính phí ngay." },
      { title: "Bài tập thiết kế", detail: "Ghi ra giấy phương án tối ưu cho từng workload:<br>1) Spring Boot API chạy 24/7 suốt 3 năm.<br>2) Job Spark xử lý log hằng đêm, chạy lại được nếu bị ngắt.<br>3) Oracle DB cần license tính theo core vật lý.<br>4) Môi trường test chạy 2 tuần.<br>5) Hệ thống phải chắc chắn có 20 máy ở 1 AZ trong ngày Black Friday.<br>6) Công ty có nhiều loại instance, thay đổi family thường xuyên, muốn tiết kiệm linh hoạt." }
    ],
    verify: ["Đáp án: 1) Reserved Instance/Compute Savings Plan 3 năm; 2) Spot; 3) Dedicated Host; 4) On-Demand; 5) On-Demand Capacity Reservation; 6) Compute Savings Plans hoặc Convertible RI", "Giải thích được vì sao Dedicated Instance không phù hợp cho BYOL theo core"],
    cleanup: ["Không có tài nguyên nào được tạo", "Kiểm tra EC2 → Spot Requests và Reserved Instances không có mục nào được tạo nhầm"],
    examLink: "'Fault-tolerant, flexible start/end, cheapest' → Spot. 'Steady-state 24/7' → RI/Savings Plans. 'Per-socket/per-core license, compliance' → Dedicated Hosts. 'Đảm bảo capacity ở 1 AZ, không cam kết dài hạn' → Capacity Reservation."
  },
  6: {
    title: "Elastic IP, ENI chuyển đổi dự phòng và tạo Placement Groups",
    type: "console",
    duration: "35-45 phút",
    cost: "Gần như miễn phí: từ 02/2024 mọi Public IPv4 (kể cả EIP đang gắn) tính 0.005 USD/giờ, Free Tier 12 tháng có 750 giờ/tháng. EIP không gắn vẫn bị tính phí - Release ngay sau lab",
    goal: "Hiểu vòng đời Elastic IP, chuyển ENI phụ giữa 2 instance để failover IP private, và tạo 3 loại Placement Group.",
    prerequisites: ["Đã làm Lab 3 (biết launch EC2)", "2 instance t3.micro Amazon Linux 2023 trong cùng 1 AZ (ap-southeast-1a)"],
    steps: [
      { title: "Cấp phát và gắn Elastic IP", detail: "<strong>EC2 → Network & Security → Elastic IPs → Allocate Elastic IP address</strong> → Allocate. Chọn EIP → <strong>Actions → Associate Elastic IP address</strong> → chọn instance <code>eni-a</code> → Associate.", cli: "aws ec2 allocate-address --domain vpc\naws ec2 associate-address --instance-id i-AAAA --allocation-id eipalloc-xxxx" },
      { title: "Stop/Start để thấy IP cố định", detail: "Ghi lại Public IP → <strong>Stop instance</strong> rồi <strong>Start</strong> → Public IP vẫn giữ nguyên (máy không có EIP sẽ đổi IP). Trong lúc Stop, EIP vẫn bị tính phí." },
      { title: "Tạo ENI phụ và gắn vào instance A", detail: "<strong>EC2 → Network Interfaces → Create network interface</strong> → chọn subnet cùng AZ với 2 instance, SG phù hợp → Create. Chọn ENI → <strong>Actions → Attach</strong> → chọn <code>eni-a</code>. Ghi lại Private IP của ENI.", cli: "aws ec2 create-network-interface --subnet-id subnet-xxxx --groups sg-xxxx\naws ec2 attach-network-interface --network-interface-id eni-xxxx --instance-id i-AAAA --device-index 1" },
      { title: "Failover ENI sang instance B", detail: "<strong>Actions → Detach</strong> ENI khỏi <code>eni-a</code> → <strong>Attach</strong> vào <code>eni-b</code>. Private IP và MAC của ENI đi theo sang máy B - đây là cách failover nhanh không cần đổi cấu hình phía client.", cli: "aws ec2 detach-network-interface --attachment-id eni-attach-xxxx\naws ec2 attach-network-interface --network-interface-id eni-xxxx --instance-id i-BBBB --device-index 1" },
      { title: "Tạo 3 Placement Group", detail: "<strong>EC2 → Placement Groups → Create placement group</strong> 3 lần: <code>pg-cluster</code> (Cluster), <code>pg-spread</code> (Spread, level Rack), <code>pg-partition</code> (Partition, 3 partitions). Khi launch instance, chọn ở <strong>Advanced details → Placement group</strong>. Lưu ý: t3.micro không hỗ trợ Cluster, chỉ quan sát lỗi để hiểu giới hạn.", cli: "aws ec2 create-placement-group --group-name pg-cluster --strategy cluster\naws ec2 create-placement-group --group-name pg-spread --strategy spread\naws ec2 create-placement-group --group-name pg-partition --strategy partition --partition-count 3" },
      { title: "Launch thử vào Spread", detail: "Launch 2 instance t3.micro vào <code>pg-spread</code> → thành công; mỗi máy nằm trên phần cứng khác nhau. Ghi nhớ giới hạn 7 instance/AZ cho Spread." }
    ],
    verify: ["Public IP không đổi sau Stop/Start khi có EIP", "ENI phụ hiển thị Attached với instance B và giữ nguyên Private IP", "Có 3 placement group ở trạng thái available"],
    cleanup: ["Disassociate rồi <strong>Release</strong> Elastic IP (quan trọng, tránh bị tính phí)", "Detach và Delete ENI phụ", "Terminate toàn bộ instance", "Xóa 3 placement group"],
    examLink: "HPC, low-latency, node-to-node → Cluster. Ít máy quan trọng, tách phần cứng → Spread (tối đa 7/AZ). Hadoop/Cassandra/Kafka → Partition. EIP không gắn bị tính phí, mặc định 5 EIP/Region."
  },
  7: {
    title: "EC2 Hibernate: giữ nguyên RAM khi tắt máy",
    type: "console",
    duration: "30-40 phút",
    cost: "Miễn phí (Free Tier t3.micro + 8 GB gp3, mã hóa EBS bằng khóa aws/ebs không mất phí)",
    goal: "Launch instance hỗ trợ Hibernate với Root EBS mã hóa và chứng minh trạng thái RAM (process, uptime) được giữ lại sau khi bật lại.",
    prerequisites: ["Đã làm Lab 3", "Hiểu EBS encryption cơ bản"],
    steps: [
      { title: "Launch instance có bật Hibernate", detail: "<strong>EC2 → Launch instances</strong> → tên <code>hibernate-lab</code> → Amazon Linux 2023 → <code>t3.micro</code> → <strong>Configure storage</strong>: 8 GiB gp3, bấm <strong>Advanced</strong> → <strong>Encrypted: Encrypted</strong> (KMS key aws/ebs) → <strong>Advanced details → Stop - Hibernate behavior: Enable</strong> → Launch.", cli: "aws ec2 run-instances --image-id resolve:ssm:/aws/service/ami-amazon-linux-latest/al2023-ami-kernel-default-x86_64 --instance-type t3.micro --hibernation-options Configured=true --block-device-mappings 'DeviceName=/dev/xvda,Ebs={VolumeSize=8,VolumeType=gp3,Encrypted=true}'" },
      { title: "Tạo trạng thái trong RAM", detail: "Connect bằng Instance Connect, ghi lại uptime, tạo file trong RAM disk <code>/dev/shm</code> và chạy một process nền (mô phỏng cache của ứng dụng Java đã warm-up).", cli: "uptime -s\necho cache-warm > /dev/shm/cache.txt\nnohup sleep 100000 &\necho $!" },
      { title: "Hibernate instance", detail: "Chờ vài phút sau khi boot (agent cần sẵn sàng) → <strong>Instance state → Hibernate instance</strong> → xác nhận. Trạng thái chuyển <code>stopping</code> → <code>stopped</code>.", cli: "aws ec2 stop-instances --instance-ids i-xxxx --hibernate" },
      { title: "Start và kiểm chứng", detail: "<strong>Instance state → Start instance</strong> → Connect lại. <code>uptime -s</code> giữ nguyên thời điểm boot ban đầu, file <code>/dev/shm/cache.txt</code> vẫn còn, process sleep vẫn chạy với PID cũ.", cli: "uptime -s\ncat /dev/shm/cache.txt\npgrep -a sleep" },
      { title: "So sánh với Stop thường", detail: "Bây giờ chọn <strong>Stop instance</strong> (không phải Hibernate) rồi Start lại → <code>uptime -s</code> đổi, <code>/dev/shm/cache.txt</code> biến mất. Đây chính là khác biệt RAM được ghi xuống Root EBS." }
    ],
    verify: ["Sau Hibernate/Start: uptime -s không đổi, file trong /dev/shm còn nguyên", "Sau Stop/Start thường: dữ liệu RAM mất", "Tab Details hiển thị Stop - Hibernate behavior: Enabled"],
    cleanup: ["Terminate instance hibernate-lab (Root EBS tự xóa theo Delete on termination)"],
    examLink: "'Ứng dụng khởi tạo cache trong RAM rất lâu, cần khởi động lại nhanh' → EC2 Hibernate. Điều kiện: Root EBS mã hóa, đủ dung lượng chứa RAM, RAM < 150 GB, ngủ tối đa 60 ngày. Hibernate phải bật lúc launch."
  },
  8: {
    title: "EBS Volume, Snapshot di chuyển giữa AZ/Region và Recycle Bin",
    type: "console",
    duration: "40-50 phút",
    cost: "Gần như miễn phí (Free Tier 30 GB EBS + 1 GB snapshot). Snapshot copy sang Region khác tốn phí truyền dữ liệu rất nhỏ - xóa ngay sau lab",
    goal: "Gắn và format ổ EBS, sau đó dùng Snapshot để chuyển dữ liệu sang AZ khác và Region khác, đồng thời khôi phục snapshot bị xóa nhầm bằng Recycle Bin.",
    prerequisites: ["1 instance t3.micro Amazon Linux 2023 ở ap-southeast-1a", "1 instance khác (hoặc launch sau) ở ap-southeast-1b"],
    steps: [
      { title: "Tạo và gắn EBS volume", detail: "<strong>EC2 → Elastic Block Store → Volumes → Create volume</strong> → gp3, 1 GiB, AZ <code>ap-southeast-1a</code> → Create. Chọn volume → <strong>Actions → Attach volume</strong> → chọn instance ở 1a. Thử attach vào instance ở 1b → không xuất hiện trong danh sách (EBS gắn chặt với AZ).", cli: "aws ec2 create-volume --availability-zone ap-southeast-1a --size 1 --volume-type gp3\naws ec2 attach-volume --volume-id vol-xxxx --instance-id i-AAAA --device /dev/sdf" },
      { title: "Format, mount và ghi dữ liệu", detail: "Trên instance 1a (Instance Connect). Với Nitro, ổ hiển thị dạng <code>/dev/nvme1n1</code> - kiểm tra bằng <code>lsblk</code>.", cli: "lsblk\nsudo mkfs -t xfs /dev/nvme1n1\nsudo mkdir /data && sudo mount /dev/nvme1n1 /data\necho 'du lieu tu AZ-a' | sudo tee /data/hello.txt" },
      { title: "Tạo Snapshot", detail: "Chọn volume → <strong>Actions → Create snapshot</strong> → mô tả <code>lab8-snap</code> → Create. Chờ trạng thái <code>Completed</code> ở <strong>Snapshots</strong>.", cli: "aws ec2 create-snapshot --volume-id vol-xxxx --description lab8-snap" },
      { title: "Khôi phục sang AZ khác", detail: "Chọn snapshot → <strong>Actions → Create volume from snapshot</strong> → AZ <code>ap-southeast-1b</code> → Create → Attach vào instance ở 1b → mount (không format lại!) và đọc file.", cli: "aws ec2 create-volume --snapshot-id snap-xxxx --availability-zone ap-southeast-1b --volume-type gp3\nsudo mkdir /data && sudo mount /dev/nvme1n1 /data && cat /data/hello.txt" },
      { title: "Copy snapshot sang Region khác", detail: "Chọn snapshot → <strong>Actions → Copy snapshot</strong> → Destination Region <code>ap-northeast-1</code> (Tokyo) → Copy. Chuyển sang Region Tokyo → Snapshots để thấy bản sao.", cli: "aws ec2 copy-snapshot --source-region ap-southeast-1 --source-snapshot-id snap-xxxx --region ap-northeast-1" },
      { title: "Recycle Bin: khôi phục snapshot xóa nhầm", detail: "<strong>Recycle Bin → Create retention rule</strong> → Resource type <strong>EBS snapshots</strong> → <strong>Apply to all resources</strong> → Retention 1 day → Create. Quay lại xóa <code>lab8-snap</code> → vào <strong>Recycle Bin → Resources</strong> → chọn snapshot → <strong>Recover</strong>." },
      { title: "Tìm hiểu Archive và FSR", detail: "Chọn snapshot → <strong>Actions</strong> xem các mục <strong>Archive snapshot</strong> và <strong>Manage fast snapshot restore</strong>. Chỉ đọc, KHÔNG bật FSR (tính phí theo giờ mỗi AZ, khá đắt); Archive có thời gian lưu tối thiểu 90 ngày." }
    ],
    verify: ["Instance ở 1b đọc được file hello.txt từ volume tạo bằng snapshot", "Snapshot xuất hiện ở Region Tokyo", "Snapshot đã xóa được Recover từ Recycle Bin"],
    cleanup: ["Unmount, Detach và Delete các volume tạo trong lab", "Xóa snapshot ở Singapore và Tokyo", "Xóa retention rule trong Recycle Bin (nếu không, snapshot đã xóa vẫn bị giữ và tính phí 1 ngày)", "Terminate các instance"],
    examLink: "'Chuyển EBS từ AZ-a sang AZ-b' → Snapshot rồi tạo volume mới ở AZ-b. Snapshot là incremental, lưu trên S3, copy được sang Region khác (DR). Xóa nhầm → Recycle Bin; khôi phục hiệu năng tối đa ngay → Fast Snapshot Restore; tiết kiệm 75% cho snapshot ít dùng → Snapshot Archive."
  },
  9: {
    title: "Chuyển gp2 sang gp3, điều chỉnh IOPS độc lập và so sánh các loại ổ EBS",
    type: "console",
    duration: "30-40 phút",
    cost: "Miễn phí trong Free Tier (gp3 baseline 3000 IOPS/125 MB/s miễn phí). KHÔNG tạo io2/st1 vì tính phí ngay",
    goal: "Thực hành Elastic Volumes đổi gp2 → gp3 không downtime, chỉnh IOPS độc lập với dung lượng, và đo hiệu năng bằng fio.",
    prerequisites: ["1 instance t3.micro Amazon Linux 2023", "Đã làm Lab 8"],
    steps: [
      { title: "Tạo volume gp2 và đo hiệu năng", detail: "<strong>Volumes → Create volume</strong> → <strong>gp2</strong>, 10 GiB (baseline 100 IOPS = 3 IOPS/GB, có burst) → Attach vào instance → format, mount <code>/data</code>, cài <code>fio</code> và đo.", cli: "sudo dnf install -y fio\nsudo mkfs -t xfs /dev/nvme1n1 && sudo mkdir -p /data && sudo mount /dev/nvme1n1 /data\nsudo fio --name=randrw --directory=/data --rw=randread --bs=4k --size=512M --numjobs=4 --iodepth=32 --ioengine=libaio --direct=1 --runtime=30 --time_based --group_reporting" },
      { title: "Modify sang gp3 không cần detach", detail: "Chọn volume → <strong>Actions → Modify volume</strong> → Volume type <strong>gp3</strong>, giữ 10 GiB, IOPS <code>3000</code>, Throughput <code>125</code> → Modify. Theo dõi trạng thái <code>modifying → optimizing → completed</code> trong khi file system vẫn đang mount.", cli: "aws ec2 modify-volume --volume-id vol-xxxx --volume-type gp3 --iops 3000 --throughput 125\naws ec2 describe-volumes-modifications --volume-ids vol-xxxx" },
      { title: "Đo lại hiệu năng", detail: "Chạy lại lệnh fio ở bước 1 và so sánh IOPS. Lưu ý t3.micro có giới hạn băng thông EBS riêng của instance nên có thể không đạt tối đa." },
      { title: "Quan sát giới hạn các loại ổ", detail: "Mở <strong>Create volume</strong> và đổi lần lượt Volume type để đọc giới hạn trên form (không bấm Create):<br>• gp3: tối đa 16,000 IOPS<br>• io2 Block Express: tối đa 256,000 IOPS, có tùy chọn <strong>Multi-Attach</strong><br>• st1/sc1: không nhập IOPS, chỉ HDD theo throughput, không dùng làm ổ boot." },
      { title: "Tìm hiểu Instance Store", detail: "<strong>EC2 → Instance types</strong> → lọc cột <strong>Instance storage</strong> = supported (ví dụ <code>i4i.large</code>, <code>m6id.large</code>). t3.micro không có Instance Store. Ghi nhớ: dữ liệu Instance Store mất khi Stop/Terminate hoặc lỗi phần cứng." }
    ],
    verify: ["Volume hiển thị Volume type gp3 với IOPS 3000, Throughput 125", "File system không bị gián đoạn trong lúc modify", "Có số liệu fio trước/sau để so sánh"],
    cleanup: ["Unmount /data, Detach và Delete volume", "Terminate instance nếu không dùng tiếp"],
    examLink: "IOPS > 16,000 → io1/io2. Tối ưu chi phí, chỉnh IOPS độc lập dung lượng → gp2 sang gp3. Multi-Attach chỉ io1/io2, tối đa 16 instance cùng AZ, cần cluster-aware FS. st1/sc1 không làm ổ boot. IOPS cực cao, dữ liệu tạm → Instance Store."
  },
  10: {
    title: "Amazon EFS: mount chung 1 file system cho 2 EC2 ở 2 AZ",
    type: "console",
    duration: "40-50 phút",
    cost: "Gần như miễn phí (Free Tier EFS 5 GB Standard trong 12 tháng; ngoài ra ~0.36 USD/GB-tháng ở Singapore) - xóa ngay sau lab",
    goal: "Tạo EFS Multi-AZ, mount từ 2 instance Amazon Linux 2023 ở 2 AZ khác nhau, chứng minh dữ liệu chia sẻ tức thời và bật Lifecycle sang Infrequent Access.",
    prerequisites: ["Default VPC ở ap-southeast-1", "2 instance t3.micro ở ap-southeast-1a và ap-southeast-1b, gắn SG <code>efs-client-sg</code>"],
    steps: [
      { title: "Tạo Security Group cho EFS", detail: "<strong>EC2 → Security Groups → Create</strong> → <code>efs-sg</code> → Inbound: <strong>NFS</strong> (TCP 2049) với Source là SG <code>efs-client-sg</code> của các instance → Create." },
      { title: "Tạo EFS file system", detail: "<strong>EFS → Create file system → Customize</strong> → tên <code>lab-efs</code> → File system type <strong>Regional</strong> (Multi-AZ) → Lifecycle: Transition into IA <strong>30 days since last access</strong> → bước Network: mỗi AZ chọn mount target với SG <code>efs-sg</code> → Create.", cli: "aws efs create-file-system --performance-mode generalPurpose --throughput-mode elastic --encrypted --tags Key=Name,Value=lab-efs\naws efs create-mount-target --file-system-id fs-xxxx --subnet-id subnet-1a --security-groups sg-efs\naws efs put-lifecycle-configuration --file-system-id fs-xxxx --lifecycle-policies TransitionToIA=AFTER_30_DAYS" },
      { title: "Mount trên instance ở AZ-a", detail: "Connect vào instance 1a, cài EFS mount helper và mount qua TLS.", cli: "sudo dnf install -y amazon-efs-utils\nsudo mkdir -p /mnt/efs\nsudo mount -t efs -o tls fs-xxxx:/ /mnt/efs\necho \"tu AZ-a $(date)\" | sudo tee /mnt/efs/shared.txt" },
      { title: "Mount trên instance ở AZ-b và đọc", detail: "Lặp lại cài đặt và mount trên instance 1b, đọc file vừa ghi và ghi thêm. Quay lại máy 1a đọc lại để thấy dữ liệu cập nhật hai chiều.", cli: "sudo dnf install -y amazon-efs-utils\nsudo mkdir -p /mnt/efs && sudo mount -t efs -o tls fs-xxxx:/ /mnt/efs\ncat /mnt/efs/shared.txt\necho 'tu AZ-b' | sudo tee -a /mnt/efs/shared.txt" },
      { title: "Mount tự động khi reboot", detail: "Thêm dòng vào <code>/etc/fstab</code> trên mỗi máy để mount lại sau reboot.", cli: "echo 'fs-xxxx:/ /mnt/efs efs _netdev,tls 0 0' | sudo tee -a /etc/fstab\nsudo mount -a" },
      { title: "Xem Lifecycle và Storage classes", detail: "<strong>EFS → lab-efs → tab General → Lifecycle management</strong> để xem chính sách IA/Archive và <strong>Transition into Standard: On first access</strong>. Đọc tùy chọn <strong>One Zone</strong> khi tạo mới để so sánh giá cho môi trường Dev/Test." }
    ],
    verify: ["df -h trên cả 2 máy hiển thị /mnt/efs dung lượng 8.0E", "Cả 2 máy đọc/ghi chung file shared.txt", "Lifecycle hiển thị Transition into IA: 30 days"],
    cleanup: ["Umount /mnt/efs và xóa dòng trong /etc/fstab", "Xóa file system lab-efs (mount target tự xóa theo)", "Terminate 2 instance, xóa efs-sg và efs-client-sg"],
    examLink: "'Shared file storage, nhiều AZ, Linux, POSIX, tự co giãn' → EFS (Windows → FSx for Windows). Nhiều file cũ ít mở làm tăng chi phí → bật EFS Lifecycle sang Standard-IA. Dev/Test rẻ hơn → EFS One Zone. EBS chỉ gắn trong 1 AZ."
  },
  11: {
    title: "Application Load Balancer: path-based routing và X-Forwarded-For",
    type: "console",
    duration: "45-60 phút",
    cost: "ALB có Free Tier 750 giờ/tháng (tài khoản 12 tháng); ngoài Free Tier ~0.025 USD/giờ + LCU. XÓA ALB NGAY sau lab",
    goal: "Dựng ALB phân tải cho 2 nhóm EC2 theo URL path (/api và mặc định) và xem IP thật của client qua header X-Forwarded-For.",
    prerequisites: ["Default VPC có ít nhất 2 public subnet ở 2 AZ", "Đã làm Lab 3 và Lab 4"],
    steps: [
      { title: "Tạo SG và 2 instance", detail: "Tạo <code>alb-sg</code> (Inbound HTTP 80 từ 0.0.0.0/0) và <code>web-behind-alb-sg</code> (Inbound HTTP 80 chỉ từ SG <code>alb-sg</code>). Launch 2 instance AL2023 t3.micro ở 2 AZ với User Data bên dưới (Apache ghi log có X-Forwarded-For). Máy <code>web-a</code> sửa nội dung thành <code>WEB</code>, máy <code>api-b</code> tạo thêm thư mục <code>/api</code>.", cli: "#!/bin/bash\ndnf install -y httpd\necho \"<h1>$(hostname -f)</h1>\" > /var/www/html/index.html\nmkdir -p /var/www/html/api && echo \"API from $(hostname -f)\" > /var/www/html/api/index.html\nsed -i 's/LogFormat \\\"%h /LogFormat \\\"%{X-Forwarded-For}i %h /' /etc/httpd/conf/httpd.conf\nsystemctl enable --now httpd" },
      { title: "Tạo 2 Target Group", detail: "<strong>EC2 → Target Groups → Create target group</strong> → Instances → <code>tg-web</code>, HTTP 80, health check path <code>/</code> → Register <code>web-a</code>. Tạo tiếp <code>tg-api</code>, health check <code>/api/</code> → Register <code>api-b</code>." },
      { title: "Tạo ALB", detail: "<strong>EC2 → Load Balancers → Create load balancer → Application Load Balancer</strong> → tên <code>lab-alb</code>, Internet-facing, IPv4 → chọn ít nhất 2 AZ → SG <code>alb-sg</code> → Listener HTTP:80 default action forward tới <code>tg-web</code> → Create.", cli: "aws elbv2 create-load-balancer --name lab-alb --subnets subnet-1a subnet-1b --security-groups sg-alb\naws elbv2 create-listener --load-balancer-arn ALB_ARN --protocol HTTP --port 80 --default-actions Type=forward,TargetGroupArn=TG_WEB_ARN" },
      { title: "Thêm rule theo path", detail: "Chọn <code>lab-alb</code> → tab <strong>Listeners and rules</strong> → HTTP:80 → <strong>Manage rules → Add rule</strong> → Condition <strong>Path</strong> = <code>/api/*</code> → Action forward tới <code>tg-api</code> → Priority 10 → Save.", cli: "aws elbv2 create-rule --listener-arn LISTENER_ARN --priority 10 --conditions Field=path-pattern,Values='/api/*' --actions Type=forward,TargetGroupArn=TG_API_ARN" },
      { title: "Kiểm tra routing", detail: "Chờ target <strong>healthy</strong> → mở <code>http://DNS-cua-ALB/</code> (trả về web-a) và <code>http://DNS-cua-ALB/api/</code> (trả về api-b). Gọi thẳng Public IP của EC2 → timed out vì SG chỉ cho ALB vào.", cli: "curl http://lab-alb-xxxx.ap-southeast-1.elb.amazonaws.com/\ncurl http://lab-alb-xxxx.ap-southeast-1.elb.amazonaws.com/api/" },
      { title: "Xem IP thật của client", detail: "Trên <code>web-a</code> xem access log: cột đầu là IP thật (X-Forwarded-For), cột thứ hai là IP private của node ALB. Trong Spring Boot, đọc <code>request.getHeader('X-Forwarded-For')</code> hoặc bật <code>server.forward-headers-strategy=native</code>.", cli: "sudo tail -n 5 /var/log/httpd/access_log" }
    ],
    verify: ["/ trả về web-a, /api/ trả về api-b", "Cả 2 target group ở trạng thái healthy", "Access log thấy IP public của bạn ở cột X-Forwarded-For"],
    cleanup: ["Delete load balancer lab-alb (quan trọng nhất - tính phí theo giờ)", "Delete 2 target group", "Terminate 2 instance, xóa 2 SG"],
    examLink: "Routing theo path/host/header/query string, microservices, container, redirect HTTP→HTTPS → ALB (Layer 7). Server chỉ thấy IP của ALB → đọc X-Forwarded-For. Target của ALB: EC2, IP, Lambda, ECS task."
  },
  12: {
    title: "Network Load Balancer với Elastic IP tĩnh + thiết kế Gateway Load Balancer",
    type: "console",
    duration: "40-50 phút",
    cost: "NLB ~0.025 USD/giờ + NLCU (Free Tier 12 tháng có 750 giờ). EIP gắn NLB tính phí IPv4. XÓA NLB và Release EIP ngay sau lab",
    goal: "Tạo NLB TCP có địa chỉ Elastic IP cố định để đối tác whitelist, và vẽ được luồng traffic qua GWLB tới firewall bên thứ 3.",
    prerequisites: ["Đã làm Lab 11", "1-2 instance chạy httpd (User Data như Lab 11)"],
    steps: [
      { title: "Cấp phát Elastic IP", detail: "<strong>EC2 → Elastic IPs → Allocate</strong> 1 EIP (dùng cho AZ ap-southeast-1a). Đây sẽ là IP tĩnh của NLB.", cli: "aws ec2 allocate-address --domain vpc" },
      { title: "Tạo Target Group TCP", detail: "<strong>Target Groups → Create</strong> → Instances → <code>tg-nlb-tcp</code> → Protocol <strong>TCP</strong> port 80 → Register instance → Create. SG của instance phải mở port 80 cho client (NLB có thể gắn SG từ 2023, hoặc mở theo CIDR VPC + IP client)." },
      { title: "Tạo NLB gắn EIP", detail: "<strong>Load Balancers → Create → Network Load Balancer</strong> → <code>lab-nlb</code>, Internet-facing → Mappings: chọn <code>ap-southeast-1a</code>, ở <strong>IPv4 address</strong> chọn <strong>Use an Elastic IP address</strong> → chọn EIP vừa tạo → Listener TCP:80 → <code>tg-nlb-tcp</code> → Create.", cli: "aws elbv2 create-load-balancer --name lab-nlb --type network --subnet-mappings SubnetId=subnet-1a,AllocationId=eipalloc-xxxx" },
      { title: "Kiểm tra IP tĩnh", detail: "Khi target healthy, gọi bằng chính EIP và bằng DNS của NLB. Dùng <code>nslookup</code> thấy DNS phân giải đúng về EIP. So sánh: DNS của ALB phân giải ra các IP thay đổi theo thời gian.", cli: "curl http://EIP_ADDRESS/\nnslookup lab-nlb-xxxx.elb.ap-southeast-1.amazonaws.com" },
      { title: "Quan sát IP client được giữ nguyên", detail: "Xem <code>/var/log/httpd/access_log</code> trên instance: với target type instance, NLB giữ nguyên source IP của client (Client IP preservation) nên không cần X-Forwarded-For.", cli: "sudo tail -n 5 /var/log/httpd/access_log" },
      { title: "Bài tập thiết kế GWLB", detail: "Vẽ sơ đồ: Internet → IGW → (Ingress route table) → <strong>GWLB Endpoint</strong> → GWLB (GENEVE port 6081) → cụm firewall Palo Alto/Fortinet trong Security VPC → quay lại GWLB Endpoint → App subnet. Ghi chú: GWLB ở Layer 3, scale và health check cho appliance; không tạo thật vì cần AMI appliance trả phí." }
    ],
    verify: ["curl tới EIP trả về trang web", "nslookup DNS NLB trả về đúng EIP", "Access log thấy IP public thật của bạn", "Sơ đồ GWLB có đủ GWLB Endpoint, route table, GENEVE 6081"],
    cleanup: ["Delete lab-nlb", "Release Elastic IP", "Delete tg-nlb-tcp và terminate instance"],
    examLink: "Static IP/EIP để whitelist, TCP/UDP, hàng triệu request/giây, độ trễ cực thấp → NLB (Layer 4). Triển khai/scale firewall, IDS/IPS bên thứ 3, deep packet inspection → GWLB (Layer 3, GENEVE 6081)."
  },
  13: {
    title: "Sticky Sessions, Deregistration Delay, Cross-Zone và SNI trên ALB",
    type: "console",
    duration: "40-50 phút",
    cost: "Như Lab 11 (ALB Free Tier 750 giờ/tháng hoặc ~0.025 USD/giờ). Phần SNI làm dạng thiết kế nếu chưa có domain. Xóa ALB ngay sau lab",
    goal: "Bật sticky session bằng cookie và quan sát request bám 1 instance, cấu hình connection draining, xem thiết lập cross-zone và hiểu SNI nhiều chứng chỉ trên 1 listener.",
    prerequisites: ["Dựng lại ALB của Lab 11 với 1 target group <code>tg-web</code> chứa 2 instance ở 2 AZ (mỗi máy in hostname riêng)"],
    steps: [
      { title: "Quan sát round-robin khi chưa sticky", detail: "Gọi DNS ALB nhiều lần → hostname luân phiên giữa 2 máy.", cli: "for i in $(seq 1 6); do curl -s http://ALB_DNS/; echo; done" },
      { title: "Bật Sticky Sessions", detail: "<strong>Target Groups → tg-web → tab Attributes → Edit</strong> → tick <strong>Turn on stickiness</strong> → Type <strong>Load balancer generated cookie</strong> → duration 1 phút → Save.", cli: "aws elbv2 modify-target-group-attributes --target-group-arn TG_ARN --attributes Key=stickiness.enabled,Value=true Key=stickiness.type,Value=lb_cookie Key=stickiness.lb_cookie.duration_seconds,Value=60" },
      { title: "Kiểm chứng bằng cookie AWSALB", detail: "Dùng curl lưu cookie và gửi lại → luôn về cùng 1 hostname. Mở trình duyệt → DevTools → Application → Cookies thấy cookie <code>AWSALB</code>.", cli: "curl -s -c c.txt http://ALB_DNS/ ; echo\nfor i in $(seq 1 6); do curl -s -b c.txt http://ALB_DNS/; echo; done" },
      { title: "Cấu hình Deregistration Delay", detail: "Cùng tab <strong>Attributes</strong> → <strong>Deregistration delay</strong> đổi từ 300 thành <code>30</code> giây → Save. Sau đó vào tab <strong>Targets</strong> → Deregister 1 instance → trạng thái <code>draining</code> trong 30 giây rồi biến mất.", cli: "aws elbv2 modify-target-group-attributes --target-group-arn TG_ARN --attributes Key=deregistration_delay.timeout_seconds,Value=30" },
      { title: "Xem Cross-Zone Load Balancing", detail: "Với ALB: <strong>Load balancer → Attributes</strong> thấy cross-zone luôn bật (có thể tắt ở cấp target group). Với NLB (Lab 12): <strong>Attributes → Cross-zone load balancing</strong> mặc định Off, bật lên sẽ phát sinh phí data transfer liên AZ." },
      { title: "SNI: nhiều chứng chỉ trên 1 listener", detail: "Nếu có domain: <strong>ACM → Request certificate</strong> cho <code>a.example.com</code> và <code>b.example.com</code> (DNS validation, miễn phí) → ALB → <strong>Add listener HTTPS:443</strong> → default cert là a → tab <strong>Certificates → Add certificate</strong> thêm b vào <strong>Listener certificates for SNI</strong>. Nếu không có domain: vẽ sơ đồ 1 ALB, 1 listener 443, 10 cert, rule theo Host header." }
    ],
    verify: ["Không sticky: hostname luân phiên; có sticky: luôn 1 hostname", "Cookie AWSALB xuất hiện trong trình duyệt", "Target chuyển trạng thái draining khi deregister"],
    cleanup: ["Delete ALB, target group, terminate instance", "Xóa certificate ACM nếu đã tạo (ACM public cert miễn phí nhưng nên dọn)"],
    examLink: "10 domain HTTPS, 10 cert trên 1 ALB → SNI. Giữ user trên 1 máy → Sticky Session (tốt hơn: lưu session ra ElastiCache/DynamoDB). Cho request đang xử lý hoàn tất trước khi gỡ máy → Deregistration Delay. Cross-zone: ALB bật mặc định miễn phí; NLB/GWLB tắt mặc định."
  },
  14: {
    title: "Auto Scaling Group với Launch Template, Target Tracking và tự thay máy hỏng",
    type: "console",
    duration: "50-60 phút",
    cost: "Miễn phí với t3.micro trong Free Tier (ASG không mất phí). Nếu gắn ALB thì tính như Lab 11 - xóa ngay sau lab",
    goal: "Tạo ASG từ Launch Template, cấu hình Target Tracking CPU 40%, tạo tải để scale-out, và chứng minh ASG terminate rồi thay máy unhealthy.",
    prerequisites: ["Đã làm Lab 3 và Lab 11", "SG cho phép HTTP 80 và SSH từ My IP"],
    steps: [
      { title: "Tạo Launch Template", detail: "<strong>EC2 → Launch Templates → Create launch template</strong> → tên <code>lt-web</code> → tick <strong>Provide guidance to help me set up a template for EC2 Auto Scaling</strong> → AMI Amazon Linux 2023, <code>t3.micro</code>, SG web → <strong>Advanced details → User data</strong> cài httpd và <code>stress-ng</code>.", cli: "#!/bin/bash\ndnf install -y httpd stress-ng\necho \"<h1>$(hostname -f)</h1>\" > /var/www/html/index.html\nsystemctl enable --now httpd" },
      { title: "Tạo Auto Scaling Group", detail: "<strong>EC2 → Auto Scaling Groups → Create</strong> → tên <code>asg-web</code> → chọn <code>lt-web</code> (Latest) → chọn 2-3 subnet ở các AZ khác nhau → (tùy chọn) gắn vào target group của ALB → Group size: Desired 1, Min 1, Max 3.", cli: "aws autoscaling create-auto-scaling-group --auto-scaling-group-name asg-web --launch-template LaunchTemplateName=lt-web,Version='$Latest' --min-size 1 --max-size 3 --desired-capacity 1 --vpc-zone-identifier 'subnet-1a,subnet-1b'" },
      { title: "Thêm Target Tracking Policy", detail: "<code>asg-web</code> → tab <strong>Automatic scaling → Create dynamic scaling policy</strong> → Type <strong>Target tracking scaling</strong> → Metric <strong>Average CPU utilization</strong> = <code>40</code> → Instance warmup 60 giây → Create.", cli: "aws autoscaling put-scaling-policy --auto-scaling-group-name asg-web --policy-name cpu40 --policy-type TargetTrackingScaling --target-tracking-configuration 'PredefinedMetricSpecification={PredefinedMetricType=ASGAverageCPUUtilization},TargetValue=40.0'" },
      { title: "Tạo tải để scale-out", detail: "Connect vào instance của ASG và chạy stress 10 phút. Theo dõi tab <strong>Activity</strong> và <strong>Monitoring</strong>: CloudWatch alarm <code>AlarmHigh</code> chuyển ALARM, ASG tăng Desired lên 2-3.", cli: "stress-ng --cpu 2 --timeout 600s" },
      { title: "Quan sát scale-in", detail: "Khi stress kết thúc, sau khoảng 15 phút alarm <code>AlarmLow</code> kích hoạt và ASG giảm dần về 1 instance. Đọc lý do trong tab <strong>Activity</strong>." },
      { title: "Chứng minh ASG thay máy hỏng", detail: "Chọn 1 instance của ASG → <strong>Instance state → Stop</strong> (hoặc Terminate). ASG đánh dấu Unhealthy, <strong>terminate</strong> máy đó và launch máy mới thay thế, không khởi động lại máy cũ.", cli: "aws autoscaling set-instance-health --instance-id i-xxxx --health-status Unhealthy" },
      { title: "Thêm Scheduled Action", detail: "Tab <strong>Automatic scaling → Scheduled actions → Create</strong> → Desired 2, Recurrence <code>0 2 * * 1</code> (UTC, tức 9h sáng thứ Hai giờ VN). Xem thêm mục <strong>Predictive scaling</strong> (cần dữ liệu lịch sử tối thiểu 24 giờ)." }
    ],
    verify: ["Activity history có sự kiện Launching do alarm cpu40", "Số instance tăng khi stress và giảm về 1 sau đó", "Instance bị stop được ASG terminate và thay bằng instance mới"],
    cleanup: ["Delete Auto Scaling Group asg-web (tự terminate các instance)", "Delete launch template lt-web", "Xóa ALB/target group nếu có gắn"],
    examLink: "Luôn chọn Launch Template (không dùng Launch Configuration). Dễ nhất → Target Tracking; theo ngưỡng alarm → Step; giờ biết trước → Scheduled; ML dự báo theo chu kỳ → Predictive. Máy unhealthy bị terminate và thay mới. Cooldown mặc định 300 giây."
  },
  15: {
    title: "S3 Bucket Policy, Versioning, Delete Marker và Cross-Region Replication",
    type: "console",
    duration: "40-50 phút",
    cost: "Miễn phí trong Free Tier S3 (5 GB). Replication sang Region khác tốn phí truyền dữ liệu rất nhỏ với file test",
    goal: "Bật versioning, khôi phục file bị xóa bằng cách xóa Delete Marker, cấu hình CRR sang Tokyo và chứng minh file cũ không được replicate.",
    prerequisites: ["IAM User có quyền S3 đầy đủ", "AWS CLI đã cấu hình (tùy chọn)"],
    steps: [
      { title: "Tạo bucket nguồn và bật Versioning", detail: "<strong>S3 → Create bucket</strong> → tên duy nhất toàn cầu, ví dụ <code>saa-lab15-src-yourname</code> → Region ap-southeast-1 → giữ <strong>Block all public access</strong> → <strong>Bucket Versioning: Enable</strong> → Create.", cli: "aws s3 mb s3://saa-lab15-src-yourname --region ap-southeast-1\naws s3api put-bucket-versioning --bucket saa-lab15-src-yourname --versioning-configuration Status=Enabled" },
      { title: "Upload file cũ và ghi đè", detail: "Upload <code>old.txt</code> (file có sẵn TRƯỚC khi bật replication). Upload <code>note.txt</code> 2 lần với nội dung khác nhau. Bật <strong>Show versions</strong> trong console để thấy 2 Version ID.", cli: "echo old > old.txt && aws s3 cp old.txt s3://saa-lab15-src-yourname/\necho v1 > note.txt && aws s3 cp note.txt s3://saa-lab15-src-yourname/\necho v2 > note.txt && aws s3 cp note.txt s3://saa-lab15-src-yourname/\naws s3api list-object-versions --bucket saa-lab15-src-yourname --prefix note.txt" },
      { title: "Xóa file và khôi phục bằng Delete Marker", detail: "Xóa <code>note.txt</code> (không chọn version) → file biến mất khỏi danh sách. Bật <strong>Show versions</strong> → thấy <strong>Delete marker</strong> → chọn delete marker → Delete → file xuất hiện trở lại với nội dung v2.", cli: "aws s3 rm s3://saa-lab15-src-yourname/note.txt\naws s3api delete-object --bucket saa-lab15-src-yourname --key note.txt --version-id DELETE_MARKER_VERSION_ID" },
      { title: "Tạo bucket đích ở Tokyo", detail: "Tạo bucket <code>saa-lab15-dst-yourname</code> ở <code>ap-northeast-1</code>, <strong>bật Versioning</strong> (bắt buộc cho replication).", cli: "aws s3 mb s3://saa-lab15-dst-yourname --region ap-northeast-1\naws s3api put-bucket-versioning --bucket saa-lab15-dst-yourname --versioning-configuration Status=Enabled" },
      { title: "Cấu hình Replication rule", detail: "Bucket nguồn → <strong>Management → Replication rules → Create replication rule</strong> → tên <code>to-tokyo</code> → Scope <strong>Apply to all objects</strong> → Destination: bucket <code>saa-lab15-dst-yourname</code> → IAM role: <strong>Create new role</strong> → Save. Khi console hỏi <strong>Replicate existing objects?</strong> chọn <strong>No</strong> để quan sát bẫy đề." },
      { title: "Kiểm chứng file cũ vs mới", detail: "Upload <code>new.txt</code> vào bucket nguồn → sau vài giây xuất hiện ở bucket Tokyo, trạng thái replication của object nguồn là <code>COMPLETED</code>. Kiểm tra <code>old.txt</code> KHÔNG có trong bucket đích → muốn chép phải dùng <strong>S3 Batch Replication</strong> (Batch Operations).", cli: "echo new > new.txt && aws s3 cp new.txt s3://saa-lab15-src-yourname/\naws s3api head-object --bucket saa-lab15-src-yourname --key new.txt --query ReplicationStatus\naws s3 ls s3://saa-lab15-dst-yourname/" }
    ],
    verify: ["note.txt có nhiều version và được khôi phục sau khi xóa delete marker", "new.txt có trong bucket Tokyo, old.txt thì không", "ReplicationStatus của new.txt là COMPLETED"],
    cleanup: ["Xóa replication rule", "Với từng bucket: <strong>Empty</strong> (xóa cả mọi version) rồi <strong>Delete bucket</strong>", "Xóa IAM role replication do S3 tạo (tên dạng s3crr_role_for_...)"],
    examLink: "Replication bắt buộc bật Versioning ở cả nguồn và đích; file có sẵn trước đó không tự replicate → S3 Batch Replication/Batch Operations. Xóa khi có versioning chỉ tạo Delete Marker; xóa vĩnh viễn khi chỉ định Version ID. PUT đơn tối đa 5 GB, object tối đa 5 TB."
  },
  16: {
    title: "S3 Storage Classes và Lifecycle Rules tự động chuyển tầng/xóa",
    type: "console",
    duration: "30-40 phút",
    cost: "Gần như miễn phí với file vài KB. Lưu ý các tầng IA/Glacier có thời gian lưu tối thiểu (30/90/180 ngày) và phí tối thiểu 128 KB - chỉ dùng file nhỏ",
    goal: "Upload object vào các storage class khác nhau, thử restore từ Glacier Flexible Retrieval và tạo lifecycle rule theo vòng đời dữ liệu thực tế.",
    prerequisites: ["Đã làm Lab 15", "1 bucket mới <code>saa-lab16-yourname</code> ở ap-southeast-1"],
    steps: [
      { title: "Upload với các storage class", detail: "Trong console: <strong>Upload → Properties → Storage class</strong> chọn từng loại. Hoặc dùng CLI bên dưới. Sau đó xem cột <strong>Storage class</strong> trong danh sách object.", cli: "echo a > a.txt\naws s3 cp a.txt s3://saa-lab16-yourname/std.txt\naws s3 cp a.txt s3://saa-lab16-yourname/ia.txt --storage-class STANDARD_IA\naws s3 cp a.txt s3://saa-lab16-yourname/onezone.txt --storage-class ONEZONE_IA\naws s3 cp a.txt s3://saa-lab16-yourname/it.txt --storage-class INTELLIGENT_TIERING\naws s3 cp a.txt s3://saa-lab16-yourname/gir.txt --storage-class GLACIER_IR\naws s3 cp a.txt s3://saa-lab16-yourname/gfr.txt --storage-class GLACIER" },
      { title: "Thử tải object Glacier Flexible", detail: "Tải <code>gir.txt</code> → thành công ngay (mili-giây). Tải <code>gfr.txt</code> → lỗi <code>InvalidObjectState</code> vì phải restore trước.", cli: "aws s3 cp s3://saa-lab16-yourname/gir.txt -\naws s3 cp s3://saa-lab16-yourname/gfr.txt -" },
      { title: "Restore từ Glacier Flexible Retrieval", detail: "Chọn <code>gfr.txt</code> → <strong>Actions → Initiate restore</strong> → số ngày 1 → Retrieval tier <strong>Standard</strong> (3-5 giờ) hoặc <strong>Bulk</strong>. Xem trạng thái <code>Restoration status</code>. (Expedited 1-5 phút tốn phí cao hơn.)", cli: "aws s3api restore-object --bucket saa-lab16-yourname --key gfr.txt --restore-request Days=1,GlacierJobParameters={Tier=Standard}\naws s3api head-object --bucket saa-lab16-yourname --key gfr.txt --query Restore" },
      { title: "Tạo Lifecycle rule", detail: "<strong>Management → Lifecycle rules → Create lifecycle rule</strong> → tên <code>logs-lifecycle</code> → prefix <code>logs/</code> → tick các action: chuyển <strong>Standard-IA sau 30 ngày</strong>, <strong>Glacier Flexible Retrieval sau 90 ngày</strong>, <strong>Deep Archive sau 180 ngày</strong>, <strong>Expire sau 2555 ngày</strong> (~7 năm), xóa noncurrent versions sau 30 ngày, <strong>Delete incomplete multipart uploads sau 7 ngày</strong> → Create." },
      { title: "Bài tập chọn storage class", detail: "Chọn tầng cho: 1) ảnh thumbnail tạo lại được từ ảnh gốc; 2) hồ sơ pháp lý lưu 7 năm, chờ 12 giờ được; 3) ảnh X-quang hiếm xem nhưng cần mở ngay; 4) dữ liệu không đoán được tần suất truy cập; 5) backup cần lấy lại trong 5 phút." }
    ],
    verify: ["Cột Storage class hiển thị đúng 6 loại", "gfr.txt báo InvalidObjectState trước restore", "Lifecycle rule hiển thị đủ transition và expiration", "Đáp án bài tập: 1) One Zone-IA; 2) Deep Archive; 3) Glacier Instant Retrieval; 4) Intelligent-Tiering; 5) Glacier Flexible Retrieval Expedited"],
    cleanup: ["Empty và Delete bucket saa-lab16-yourname (phí lưu tối thiểu của file vài byte gần như bằng 0)"],
    examLink: "Dễ tái tạo + ít truy cập → One Zone-IA. Lưu 7 năm rẻ nhất, chờ 12 giờ → Deep Archive. Truy cập không đoán trước → Intelligent-Tiering. Cần trong vài phút → Glacier Flexible Expedited; mili-giây → Glacier Instant Retrieval. Lifecycle tự chuyển tầng/xóa."
  },
  17: {
    title: "S3 Event Notifications tới SQS, Multipart Upload, Byte-Range và EventBridge",
    type: "cli",
    duration: "40-50 phút",
    cost: "Miễn phí (SQS 1 triệu request/tháng, EventBridge sự kiện từ dịch vụ AWS miễn phí, S3 Free Tier)",
    goal: "Đẩy sự kiện upload từ S3 sang SQS, kiểm chứng multipart upload và byte-range fetch, rồi bật EventBridge để lọc sự kiện nâng cao.",
    prerequisites: ["AWS CLI v2 đã cấu hình với region ap-southeast-1", "Bucket <code>saa-lab17-yourname</code>"],
    steps: [
      { title: "Tạo SQS queue và cho phép S3 gửi", detail: "<strong>SQS → Create queue</strong> → Standard → tên <code>s3-events</code> → mục <strong>Access policy → Advanced</strong>: thêm statement cho Principal <code>s3.amazonaws.com</code> được <code>sqs:SendMessage</code> với Condition <code>aws:SourceArn</code> = ARN bucket → Create.", cli: "aws sqs create-queue --queue-name s3-events" },
      { title: "Cấu hình Event Notification", detail: "Bucket → <strong>Properties → Event notifications → Create event notification</strong> → tên <code>on-upload</code> → Suffix <code>.jpg</code> → Event types <strong>All object create events</strong> → Destination <strong>SQS queue</strong> → <code>s3-events</code> → Save.", cli: "aws s3api put-bucket-notification-configuration --bucket saa-lab17-yourname --notification-configuration file://notif.json" },
      { title: "Upload và nhận message", detail: "Upload 1 file <code>.jpg</code> và 1 file <code>.txt</code>. Poll queue → chỉ có message cho file .jpg (đầu tiên là message <code>s3:TestEvent</code>). Trong Java dùng <code>SqsClient.receiveMessage</code> để xử lý tương tự.", cli: "echo img > photo.jpg && aws s3 cp photo.jpg s3://saa-lab17-yourname/\necho t > a.txt && aws s3 cp a.txt s3://saa-lab17-yourname/\naws sqs receive-message --queue-url QUEUE_URL --max-number-of-messages 10 --wait-time-seconds 10" },
      { title: "Multipart Upload file lớn", detail: "Tạo file 200 MB. <code>aws s3 cp</code> tự động dùng multipart khi file lớn hơn 8 MB; chỉnh kích thước part để thấy rõ. ETag của object multipart có hậu tố <code>-N</code> (số part).", cli: "dd if=/dev/urandom of=big.bin bs=1M count=200\naws configure set default.s3.multipart_chunksize 16MB\naws s3 cp big.bin s3://saa-lab17-yourname/big.bin\naws s3api head-object --bucket saa-lab17-yourname --key big.bin --query ETag" },
      { title: "Byte-Range Fetch", detail: "Chỉ tải 100 byte đầu tiên (đọc header file) bằng tham số <code>--range</code> (HTTP header <code>Range</code>). Trong Java: <code>GetObjectRequest.builder().range('bytes=0-99')</code>.", cli: "aws s3api get-object --bucket saa-lab17-yourname --key big.bin --range bytes=0-99 head.bin\nls -l head.bin" },
      { title: "Bật EventBridge và lọc theo kích thước", detail: "Bucket → <strong>Properties → Amazon EventBridge → Edit → On</strong>. Vào <strong>EventBridge → Rules → Create rule</strong> → event pattern source <code>aws.s3</code>, detail-type <code>Object Created</code>, lọc <code>detail.object.size</code> numeric lớn hơn 100000000 → target: CloudWatch Log group <code>/aws/events/s3-big</code>. Upload lại <code>big.bin</code> và kiểm tra log.", cli: "aws s3api put-bucket-notification-configuration --bucket saa-lab17-yourname --notification-configuration '{\"EventBridgeConfiguration\":{}}'" }
    ],
    verify: ["SQS nhận message chứa key photo.jpg, không có a.txt", "ETag của big.bin có dạng ...-13", "head.bin có kích thước đúng 100 byte", "Log group /aws/events/s3-big có sự kiện cho big.bin"],
    cleanup: ["Empty và Delete bucket", "Delete SQS queue s3-events", "Delete EventBridge rule và log group"],
    examLink: "File > 100 MB nên dùng (> 5 GB bắt buộc) Multipart Upload. Upload xuyên lục địa → Transfer Acceleration. Đọc 1 phần file → Byte-Range Fetch. 3,500 PUT và 5,500 GET/giây mỗi prefix. Lọc nâng cao, nhiều đích, replay → EventBridge; cơ bản → SNS/SQS/Lambda."
  },
  18: {
    title: "S3 Encryption: SSE-S3 vs SSE-KMS (Bucket Key, kms:Decrypt) và Presigned URL",
    type: "cli",
    duration: "40-50 phút",
    cost: "Gần như miễn phí: dùng khóa AWS managed aws/s3 (miễn phí). Nếu tạo Customer managed key tính 1 USD/tháng (chia theo giờ) - lên lịch xóa ngay sau lab",
    goal: "Kiểm tra mã hóa mặc định SSE-S3, chuyển sang SSE-KMS có Bucket Key, chứng minh user thiếu kms:Decrypt không đọc được object, và tạo Presigned URL cho người ngoài.",
    prerequisites: ["AWS CLI v2 cấu hình bằng user admin", "Bucket <code>saa-lab18-yourname</code> ở ap-southeast-1", "Một IAM user test <code>s3-reader</code> chỉ có <code>AmazonS3ReadOnlyAccess</code> (có access key tạm cho lab, xóa sau)"],
    steps: [
      { title: "Xem mã hóa mặc định SSE-S3", detail: "Upload 1 file rồi kiểm tra header <code>ServerSideEncryption</code> = <code>AES256</code>. Bucket → <strong>Properties → Default encryption</strong> hiển thị SSE-S3.", cli: "echo secret > s3file.txt\naws s3 cp s3file.txt s3://saa-lab18-yourname/\naws s3api head-object --bucket saa-lab18-yourname --key s3file.txt --query ServerSideEncryption" },
      { title: "Tạo KMS key và bật SSE-KMS + Bucket Key", detail: "<strong>KMS → Customer managed keys → Create key</strong> → Symmetric, Encrypt and decrypt → alias <code>lab18-key</code> → key administrators/users chỉ chọn user admin. Bucket → <strong>Default encryption → Edit</strong> → <strong>SSE-KMS</strong> → chọn <code>lab18-key</code> → <strong>Bucket Key: Enable</strong> → Save.", cli: "aws kms create-key --description lab18\naws kms create-alias --alias-name alias/lab18-key --target-key-id KEY_ID\naws s3api put-bucket-encryption --bucket saa-lab18-yourname --server-side-encryption-configuration '{\"Rules\":[{\"ApplyServerSideEncryptionByDefault\":{\"SSEAlgorithm\":\"aws:kms\",\"KMSMasterKeyID\":\"alias/lab18-key\"},\"BucketKeyEnabled\":true}]}'" },
      { title: "Upload object mã hóa KMS", detail: "Upload file mới và kiểm tra header trả về <code>aws:kms</code>, <code>SSEKMSKeyId</code> và <code>BucketKeyEnabled: true</code>.", cli: "echo topsecret > kmsfile.txt\naws s3 cp kmsfile.txt s3://saa-lab18-yourname/\naws s3api head-object --bucket saa-lab18-yourname --key kmsfile.txt" },
      { title: "Chứng minh cần cả s3:GetObject và kms:Decrypt", detail: "Dùng profile của <code>s3-reader</code>: đọc <code>s3file.txt</code> thành công, nhưng đọc <code>kmsfile.txt</code> lỗi <code>AccessDenied</code> do không có quyền <code>kms:Decrypt</code> trên <code>lab18-key</code>. Thêm user này vào <strong>Key users</strong> của key → đọc lại thành công.", cli: "aws configure --profile reader\naws s3 cp s3://saa-lab18-yourname/s3file.txt - --profile reader\naws s3 cp s3://saa-lab18-yourname/kmsfile.txt - --profile reader" },
      { title: "Tạo Presigned URL", detail: "Tạo URL tải xuống có hiệu lực 5 phút, mở bằng trình duyệt ẩn danh (không đăng nhập AWS) → tải được. Sau 5 phút mở lại → <code>Request has expired</code>. Trong Java dùng <code>S3Presigner.presignGetObject(...)</code> với <code>signatureDuration(Duration.ofMinutes(5))</code>.", cli: "aws s3 presign s3://saa-lab18-yourname/kmsfile.txt --expires-in 300 --region ap-southeast-1" },
      { title: "Xem CloudTrail ghi lại lệnh giải mã", detail: "<strong>CloudTrail → Event history</strong> → lọc Event source <code>kms.amazonaws.com</code>, Event name <code>Decrypt</code> / <code>GenerateDataKey</code> → thấy ai đã dùng khóa (lợi thế kiểm toán của SSE-KMS so với SSE-S3)." }
    ],
    verify: ["s3file.txt có ServerSideEncryption AES256, kmsfile.txt là aws:kms với BucketKeyEnabled true", "User s3-reader bị AccessDenied với kmsfile.txt trước khi được cấp kms:Decrypt", "Presigned URL tải được trong 5 phút rồi hết hạn", "CloudTrail có sự kiện KMS Decrypt"],
    cleanup: ["Empty và Delete bucket", "KMS → lab18-key → <strong>Key actions → Schedule key deletion</strong> → 7 ngày (thời gian chờ ngắn nhất)", "Xóa access key và user s3-reader, xóa profile reader trong ~/.aws"],
    examLink: "Cần kiểm soát/kiểm toán/xoay vòng khóa → SSE-KMS. KMS ThrottlingException khi request lớn → bật S3 Bucket Key. Đọc object SSE-KMS cần s3:GetObject VÀ kms:Decrypt. Khách tự giữ khóa gửi kèm request → SSE-C. Mã hóa trước khi upload → Client-side. Chia sẻ tạm file private → Presigned URL."
  },
  19: {
    title: "S3 Object Lock (Governance, Legal Hold), Access Points và CORS",
    type: "console",
    duration: "40-50 phút",
    cost: "Miễn phí (S3 Free Tier). CẢNH BÁO: KHÔNG dùng Compliance mode với thời hạn dài - bạn sẽ không thể xóa object/bucket cho tới khi hết hạn, kể cả bằng Root",
    goal: "Bật Object Lock, thử xóa object bị khóa ở Governance mode và gỡ bằng quyền bypass, dùng Legal Hold, tạo Access Point riêng cho phòng ban và cấu hình CORS.",
    prerequisites: ["IAM User admin", "AWS CLI v2 (để thử bypass governance)"],
    steps: [
      { title: "Tạo bucket có Object Lock", detail: "<strong>S3 → Create bucket</strong> → <code>saa-lab19-yourname</code> → Bucket Versioning tự bật → mục <strong>Advanced settings → Object Lock: Enable</strong> → tick xác nhận → Create. Sau đó <strong>Properties → Object Lock → Edit</strong> → Default retention: <strong>Governance</strong>, <code>1 day</code> → Save.", cli: "aws s3api create-bucket --bucket saa-lab19-yourname --region ap-southeast-1 --create-bucket-configuration LocationConstraint=ap-southeast-1 --object-lock-enabled-for-bucket\naws s3api put-object-lock-configuration --bucket saa-lab19-yourname --object-lock-configuration 'ObjectLockEnabled=Enabled,Rule={DefaultRetention={Mode=GOVERNANCE,Days=1}}'" },
      { title: "Thử xóa version bị khóa", detail: "Upload <code>invoice.pdf</code> (file bất kỳ). Xóa thường chỉ tạo delete marker. Bật <strong>Show versions</strong> → chọn đúng version → Delete → bị từ chối <code>AccessDenied</code> vì đang trong thời hạn retention.", cli: "aws s3api list-object-versions --bucket saa-lab19-yourname --prefix invoice.pdf\naws s3api delete-object --bucket saa-lab19-yourname --key invoice.pdf --version-id VERSION_ID" },
      { title: "Bypass Governance bằng quyền đặc biệt", detail: "User có quyền <code>s3:BypassGovernanceRetention</code> (admin có sẵn) gửi kèm header bypass → xóa được. Đây là điểm khác biệt với Compliance mode (không ai bypass được, kể cả Root).", cli: "aws s3api delete-object --bucket saa-lab19-yourname --key invoice.pdf --version-id VERSION_ID --bypass-governance-retention" },
      { title: "Thử Legal Hold", detail: "Upload <code>evidence.txt</code> → chọn object → <strong>Properties → Object Lock legal hold → Edit → Enable</strong>. Legal hold không có hạn, chặn xóa version cho tới khi gỡ (cần quyền <code>s3:PutObjectLegalHold</code>). Gỡ: chuyển về <strong>Disable</strong>.", cli: "aws s3api put-object-legal-hold --bucket saa-lab19-yourname --key evidence.txt --legal-hold Status=ON\naws s3api put-object-legal-hold --bucket saa-lab19-yourname --key evidence.txt --legal-hold Status=OFF" },
      { title: "Tạo Access Point cho phòng Finance", detail: "Bucket → <strong>Access Points → Create access point</strong> → tên <code>finance-ap</code> → Network origin <strong>Internet</strong> → Access point policy: chỉ cho phép một IAM user/role đọc ghi prefix <code>finance/*</code> → Create. Truy cập qua alias hoặc ARN của access point.", cli: "aws s3control create-access-point --account-id ACCOUNT_ID --name finance-ap --bucket saa-lab19-yourname\naws s3api list-objects-v2 --bucket arn:aws:s3:ap-southeast-1:ACCOUNT_ID:accesspoint/finance-ap --prefix finance/" },
      { title: "Cấu hình CORS", detail: "Bucket → <strong>Permissions → Cross-origin resource sharing (CORS) → Edit</strong> → cho phép <code>AllowedOrigins</code> là <code>http://localhost:8080</code> (frontend dev của bạn), <code>AllowedMethods</code> GET/PUT, <code>AllowedHeaders</code> * → Save. Kiểm tra bằng preflight OPTIONS với curl.", cli: "aws s3api put-bucket-cors --bucket saa-lab19-yourname --cors-configuration 'CORSRules=[{AllowedOrigins=[http://localhost:8080],AllowedMethods=[GET,PUT],AllowedHeaders=[*]}]'\ncurl -i -X OPTIONS -H 'Origin: http://localhost:8080' -H 'Access-Control-Request-Method: GET' https://saa-lab19-yourname.s3.ap-southeast-1.amazonaws.com/evidence.txt" }
    ],
    verify: ["Xóa version trong thời hạn Governance bị AccessDenied, xóa được khi có --bypass-governance-retention", "Object có Legal hold: ON không xóa được version cho tới khi tắt", "List objects qua ARN finance-ap thành công", "Preflight OPTIONS trả về header Access-Control-Allow-Origin"],
    cleanup: ["Tắt Legal Hold của mọi object", "Xóa các version còn lại bằng --bypass-governance-retention (hoặc chờ hết 1 ngày retention)", "Delete access point finance-ap, sau đó Empty và Delete bucket"],
    examLink: "WORM, không ai kể cả Root xóa/sửa được trong thời hạn → Object Lock Compliance mode. Admin đặc biệt được gỡ → Governance mode. Khóa vô thời hạn phục vụ điều tra → Legal Hold. Glacier → Vault Lock. Bucket policy quá dài cho nhiều phòng ban → S3 Access Points. Object Lock yêu cầu Versioning."
  }
});
