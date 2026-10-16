window.LAB_DATA = window.LAB_DATA || {};
Object.assign(window.LAB_DATA, {
  37: {
    title: "Tự tay dựng VPC, chia CIDR và kiểm chứng quy tắc 5 IP bị giữ lại",
    type: "console",
    duration: "30-40 phút",
    cost: "Miễn phí (VPC, Subnet, Route Table không tính phí)",
    goal: "Tạo một VPC tùy chỉnh 10.0.0.0/16 với Public/Private Subnet ở 2 AZ, tự kiểm chứng công thức tính IP và quy tắc AWS giữ lại 5 IP mỗi Subnet.",
    prerequisites: [
      "Tài khoản AWS đã bật MFA cho Root và có IAM User quyền AdministratorAccess",
      "Đã chọn Region <strong>Asia Pacific (Singapore) ap-southeast-1</strong> ở góc phải console",
      "Có thể dùng AWS CloudShell (biểu tượng terminal trên thanh console) để chạy CLI, không cần cài gì trên máy"
    ],
    steps: [
      {
        title: "Tạo VPC lab-vpc",
        detail: "Vào <strong>VPC → Your VPCs → Create VPC</strong>. Chọn <strong>VPC only</strong>, Name tag: <code>lab-vpc</code>, IPv4 CIDR manual input: <code>10.0.0.0/16</code> (65.536 IP), IPv6: No IPv6, Tenancy: Default. Bấm <strong>Create VPC</strong>.<br>Sau đó chọn VPC → <strong>Actions → Edit VPC settings</strong> → tích <strong>Enable DNS hostnames</strong> → Save (cần cho các lab Endpoint sau).",
        cli: "aws ec2 create-vpc --cidr-block 10.0.0.0/16 --tag-specifications 'ResourceType=vpc,Tags=[{Key=Name,Value=lab-vpc}]' --region ap-southeast-1\naws ec2 modify-vpc-attribute --vpc-id vpc-xxxx --enable-dns-hostnames Value=true"
      },
      {
        title: "Tạo Public Subnet và Private Subnet",
        detail: "Vào <strong>VPC → Subnets → Create subnet</strong>, chọn VPC <code>lab-vpc</code>, thêm 2 subnet:<br>• <code>lab-public-1a</code> – AZ <code>ap-southeast-1a</code> – CIDR <code>10.0.1.0/24</code><br>• <code>lab-private-1b</code> – AZ <code>ap-southeast-1b</code> – CIDR <code>10.0.2.0/24</code><br>Lưu ý: lúc này cả hai đều chưa phải public, tên gọi chỉ là nhãn. Một subnet chỉ nằm trong đúng 1 AZ.",
        cli: "aws ec2 create-subnet --vpc-id vpc-xxxx --cidr-block 10.0.1.0/24 --availability-zone ap-southeast-1a --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=lab-public-1a}]'\naws ec2 create-subnet --vpc-id vpc-xxxx --cidr-block 10.0.2.0/24 --availability-zone ap-southeast-1b --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=lab-private-1b}]'"
      },
      {
        title: "Kiểm chứng quy tắc 5 IP bị giữ lại",
        detail: "Trong danh sách Subnets, xem cột <strong>Available IPv4 addresses</strong>: subnet /24 hiển thị <strong>251</strong> chứ không phải 256 (= 256 − 5).<br>Với <code>10.0.1.0/24</code>, AWS giữ: <code>.0</code> (network), <code>.1</code> (VPC router), <code>.2</code> (DNS), <code>.3</code> (dự phòng), <code>.255</code> (broadcast).",
        cli: "aws ec2 describe-subnets --filters Name=vpc-id,Values=vpc-xxxx --query 'Subnets[].[Tags[0].Value,CidrBlock,AvailableIpAddressCount]' --output table"
      },
      {
        title: "Thử subnet nhỏ nhất /28 và lỗi trùng CIDR",
        detail: "Tạo thêm subnet <code>lab-tiny</code> CIDR <code>10.0.3.0/28</code> → Available IPv4 chỉ còn <strong>11</strong> (16 − 5).<br>Thử tạo subnet <code>10.0.1.128/25</code> → console báo lỗi <em>CIDR conflicts with another subnet</em> vì chồng lên <code>10.0.1.0/24</code>.<br>Thử tạo subnet <code>10.0.4.0/29</code> → bị từ chối vì nhỏ hơn /28.",
        cli: "aws ec2 create-subnet --vpc-id vpc-xxxx --cidr-block 10.0.3.0/28 --availability-zone ap-southeast-1a"
      },
      {
        title: "Quan sát Main Route Table",
        detail: "Vào <strong>VPC → Route tables</strong>, chọn route table có cột Main = Yes của <code>lab-vpc</code> → tab <strong>Routes</strong>: chỉ có <code>10.0.0.0/16 → local</code>. Tab <strong>Subnet associations</strong>: 2 subnet đang dùng ngầm định (implicit) bảng này → hiện tại <strong>cả hai đều là private</strong> vì không có route ra Internet Gateway."
      }
    ],
    verify: [
      "Subnet /24 hiển thị 251 IP khả dụng, subnet /28 hiển thị 11 IP khả dụng",
      "Tạo subnet trùng CIDR hoặc nhỏ hơn /28 bị từ chối",
      "Main route table chỉ có route local"
    ],
    cleanup: [
      "Xóa subnet <code>lab-tiny</code> (VPC → Subnets → Actions → Delete subnet)",
      "Nếu học tiếp Session 38-43: GIỮ LẠI <code>lab-vpc</code>, <code>lab-public-1a</code>, <code>lab-private-1b</code> (không tốn phí)",
      "Nếu dừng hẳn: VPC → Your VPCs → chọn lab-vpc → Actions → Delete VPC (xóa luôn subnet, route table đi kèm)"
    ],
    examLink: "Đề hỏi số IP khả dụng: luôn lấy 2^(32 − prefix) − 5. Cần 29 EC2 trong 1 subnet → /27 chỉ có 27 IP khả dụng (thiếu) → phải chọn /26 (59 IP). VPC lớn nhất /16, nhỏ nhất /28. Hai VPC muốn Peering thì CIDR không được trùng nhau – hãy quy hoạch CIDR ngay từ đầu."
  },

  38: {
    title: "Internet Gateway, Route Table và đăng nhập EC2 bằng SSM Session Manager (không mở cổng 22)",
    type: "console",
    duration: "40-50 phút",
    cost: "Miễn phí (Free Tier): EC2 t2.micro/t3.micro 750 giờ/tháng, Public IPv4 có 750 giờ miễn phí/tháng trong Free Tier; ngoài Free Tier khoảng 0.005 USD/giờ cho mỗi Public IPv4",
    goal: "Biến lab-public-1a thành Public Subnet thật sự bằng IGW + Route Table, chạy web server và quản trị EC2 qua Session Manager mà không cần SSH key hay mở cổng Inbound 22.",
    prerequisites: [
      "Đã hoàn thành Lab 37 (lab-vpc, lab-public-1a, lab-private-1b)",
      "Region ap-southeast-1"
    ],
    steps: [
      {
        title: "Tạo và gắn Internet Gateway",
        detail: "<strong>VPC → Internet gateways → Create internet gateway</strong>, Name: <code>lab-igw</code> → Create. Sau đó <strong>Actions → Attach to VPC</strong> → chọn <code>lab-vpc</code>. Thử tạo IGW thứ 2 và gắn vào cùng VPC → bị lỗi vì 1 VPC chỉ có tối đa 1 IGW (xóa IGW thừa đó đi).",
        cli: "aws ec2 create-internet-gateway --tag-specifications 'ResourceType=internet-gateway,Tags=[{Key=Name,Value=lab-igw}]'\naws ec2 attach-internet-gateway --internet-gateway-id igw-xxxx --vpc-id vpc-xxxx"
      },
      {
        title: "Tạo Public Route Table",
        detail: "<strong>VPC → Route tables → Create route table</strong>: Name <code>lab-public-rt</code>, VPC <code>lab-vpc</code>. Tab <strong>Routes → Edit routes → Add route</strong>: Destination <code>0.0.0.0/0</code>, Target <strong>Internet Gateway</strong> → <code>lab-igw</code>. Tab <strong>Subnet associations → Edit</strong> → chọn <code>lab-public-1a</code>.<br>Sau đó <strong>Subnets → lab-public-1a → Actions → Edit subnet settings</strong> → tích <strong>Enable auto-assign public IPv4 address</strong>.",
        cli: "aws ec2 create-route-table --vpc-id vpc-xxxx --tag-specifications 'ResourceType=route-table,Tags=[{Key=Name,Value=lab-public-rt}]'\naws ec2 create-route --route-table-id rtb-xxxx --destination-cidr-block 0.0.0.0/0 --gateway-id igw-xxxx\naws ec2 associate-route-table --route-table-id rtb-xxxx --subnet-id subnet-public\naws ec2 modify-subnet-attribute --subnet-id subnet-public --map-public-ip-on-launch"
      },
      {
        title: "Tạo IAM Role cho SSM",
        detail: "<strong>IAM → Roles → Create role</strong> → Trusted entity: <strong>AWS service</strong> → Use case: <strong>EC2</strong> → gắn policy <code>AmazonSSMManagedInstanceCore</code> → Role name <code>lab-ec2-ssm-role</code>. Console tự tạo Instance Profile cùng tên."
      },
      {
        title: "Launch EC2 web server không mở cổng 22",
        detail: "<strong>EC2 → Instances → Launch instances</strong>: Name <code>lab-web</code>, AMI <strong>Amazon Linux 2023</strong> (có sẵn SSM Agent), Type <code>t2.micro</code> hoặc <code>t3.micro</code> (Free tier eligible), Key pair: <strong>Proceed without a key pair</strong>. Network settings → Edit: VPC <code>lab-vpc</code>, Subnet <code>lab-public-1a</code>, Auto-assign public IP Enable, tạo SG mới <code>lab-web-sg</code> chỉ có rule <strong>HTTP 80 từ 0.0.0.0/0</strong> (xóa rule SSH 22). Advanced details → IAM instance profile <code>lab-ec2-ssm-role</code>, User data dán script bên dưới.",
        cli: "#!/bin/bash\ndnf install -y httpd\necho Hello from $(hostname -f) > /var/www/html/index.html\nsystemctl enable --now httpd"
      },
      {
        title: "Kết nối bằng Session Manager",
        detail: "Đợi 2-3 phút, chọn instance → <strong>Connect → tab Session Manager → Connect</strong>. Chạy <code>whoami</code>, <code>curl -s localhost</code>. Mở trình duyệt vào <code>http://PUBLIC_IP</code> để thấy trang web. Không có SSH key, không có cổng 22 mà vẫn quản trị được."
      },
      {
        title: "Tái hiện bẫy đề: quên route 0.0.0.0/0",
        detail: "Vào <code>lab-public-rt</code> → Edit routes → xóa route <code>0.0.0.0/0</code> → Save. Tải lại trang web → <strong>timeout</strong> dù EC2 vẫn có Public IP, SG vẫn mở 80, IGW vẫn gắn. Thêm lại route → web chạy lại ngay."
      }
    ],
    verify: [
      "Truy cập http://PUBLIC_IP thấy dòng Hello from ip-10-0-1-x...",
      "Session Manager mở được shell dù SG không có rule Inbound 22",
      "Xóa route 0.0.0.0/0 thì web timeout, thêm lại thì chạy"
    ],
    cleanup: [
      "Nếu học tiếp Lab 39-41: có thể giữ <code>lab-web</code> (Stop instance khi không dùng; Public IPv4 vẫn bị tính khi instance đang chạy)",
      "Dừng hẳn: Terminate <code>lab-web</code>, xóa SG <code>lab-web-sg</code>",
      "Giữ IGW và Route Table nếu học tiếp; khi dọn VPC thì Detach rồi Delete IGW trước khi Delete VPC"
    ],
    examLink: "Public Subnet = route table có 0.0.0.0/0 → igw-xxx. Đề mô tả đã có Public IP, SG mở 80, IGW đã gắn mà vẫn không vào được → thiếu route tới IGW. Truy cập quản trị EC2 an toàn nhất, không mở cổng, có ghi log lệnh → SSM Session Manager (thay cho Bastion Host)."
  },

  39: {
    title: "NAT Gateway: cho EC2 trong Private Subnet đi ra Internet một chiều",
    type: "console",
    duration: "40-50 phút",
    cost: "CÓ PHÍ: NAT Gateway khoảng 0.059 USD/giờ + 0.059 USD/GB dữ liệu xử lý tại Singapore, cộng phí Public IPv4 của Elastic IP. Làm xong trong 1 giờ và xóa ngay thì tổng dưới 0.1 USD. EC2 t2.micro/t3.micro trong Free Tier.",
    goal: "Đặt NAT Gateway đúng chỗ (Public Subnet + Elastic IP), trỏ route từ Private Subnet, và chứng minh EC2 private đi ra Internet được nhưng Internet không vào được.",
    prerequisites: [
      "Đã hoàn thành Lab 37, 38 (lab-vpc có IGW, lab-public-rt, role lab-ec2-ssm-role)",
      "Đặt AWS Budgets cảnh báo 1-3 USD trước khi làm"
    ],
    steps: [
      {
        title: "Tạo Private Route Table riêng",
        detail: "<strong>VPC → Route tables → Create route table</strong>: <code>lab-private-rt</code>, VPC <code>lab-vpc</code>. Tab Subnet associations → gắn <code>lab-private-1b</code>. Không chỉnh Main route table để tránh ảnh hưởng các subnet khác.",
        cli: "aws ec2 create-route-table --vpc-id vpc-xxxx --tag-specifications 'ResourceType=route-table,Tags=[{Key=Name,Value=lab-private-rt}]'\naws ec2 associate-route-table --route-table-id rtb-private --subnet-id subnet-private"
      },
      {
        title: "Launch EC2 trong Private Subnet",
        detail: "Launch <code>lab-private-ec2</code>: Amazon Linux 2023, t2.micro/t3.micro, không key pair, Subnet <code>lab-private-1b</code>, Auto-assign public IP <strong>Disable</strong>, SG mới không có Inbound rule nào, IAM instance profile <code>lab-ec2-ssm-role</code>. Sau 5 phút vào <strong>Systems Manager → Fleet Manager</strong>: instance <strong>KHÔNG xuất hiện</strong> vì SSM Agent không ra được Internet để gọi endpoint SSM."
      },
      {
        title: "Tạo NAT Gateway trong PUBLIC Subnet",
        detail: "<strong>VPC → NAT gateways → Create NAT gateway</strong>: Name <code>lab-nat</code>, Subnet <strong><code>lab-public-1a</code></strong> (bắt buộc là public!), Connectivity type <strong>Public</strong>, bấm <strong>Allocate Elastic IP</strong> → Create. Đợi State = Available (1-3 phút).",
        cli: "aws ec2 allocate-address --domain vpc\naws ec2 create-nat-gateway --subnet-id subnet-public --allocation-id eipalloc-xxxx --tag-specifications 'ResourceType=natgateway,Tags=[{Key=Name,Value=lab-nat}]'\naws ec2 wait nat-gateway-available --nat-gateway-ids nat-xxxx"
      },
      {
        title: "Thêm route 0.0.0.0/0 → NAT Gateway cho Private Subnet",
        detail: "<code>lab-private-rt</code> → Routes → Edit routes → Add route: <code>0.0.0.0/0</code> → Target <strong>NAT Gateway</strong> → <code>lab-nat</code>. Sau 2-5 phút (hoặc Reboot instance), instance private xuất hiện trong Fleet Manager.",
        cli: "aws ec2 create-route --route-table-id rtb-private --destination-cidr-block 0.0.0.0/0 --nat-gateway-id nat-xxxx"
      },
      {
        title: "Kiểm chứng đi ra một chiều",
        detail: "Connect vào <code>lab-private-ec2</code> bằng Session Manager, chạy lệnh bên dưới. IP trả về chính là <strong>Elastic IP của NAT Gateway</strong>. Cài thử gói phần mềm → thành công. Ngược lại, từ Internet không có cách nào khởi tạo kết nối vào instance (không có Public IP, NAT chỉ dịch chiều đi ra).",
        cli: "curl -s https://checkip.amazonaws.com\nsudo dnf install -y htop"
      },
      {
        title: "Suy ngẫm về HA đa AZ",
        detail: "NAT đang ở AZ 1a, EC2 ở AZ 1b → nếu AZ 1a sập thì 1b mất Internet, và còn tốn phí truyền dữ liệu liên AZ. Kiến trúc chuẩn: <strong>mỗi AZ một NAT Gateway</strong> trong public subnet của AZ đó, route table private của AZ nào trỏ về NAT của AZ đó."
      }
    ],
    verify: [
      "curl checkip.amazonaws.com trả về đúng Elastic IP của lab-nat",
      "Instance private chỉ xuất hiện trong Fleet Manager sau khi có route tới NAT",
      "Instance private không có Public IPv4"
    ],
    cleanup: [
      "XÓA NGAY: VPC → NAT gateways → lab-nat → Actions → Delete NAT gateway",
      "Đợi NAT ở trạng thái Deleted rồi vào VPC → Elastic IPs → Release Elastic IP address (EIP không gắn vẫn bị tính phí)",
      "Xóa route 0.0.0.0/0 (trạng thái Blackhole) trong lab-private-rt",
      "Terminate <code>lab-private-ec2</code> (hoặc giữ cho Lab 43 nhưng Stop lại)"
    ],
    examLink: "Bẫy kinh điển: NAT Gateway đặt trong Private Subnet → sai, phải đặt ở Public Subnet kèm Elastic IP, rồi route private 0.0.0.0/0 → nat-xxx. HA = mỗi AZ một NAT Gateway. Luôn ưu tiên NAT Gateway (managed, tới 100 Gbps) hơn NAT Instance (phải tắt Source/Destination Check). NAT chỉ dành cho IPv4; IPv6 dùng Egress-Only IGW."
  },

  40: {
    title: "NACL vs Security Group: chặn IP, cổng Ephemeral và đọc VPC Flow Logs",
    type: "console",
    duration: "45-60 phút",
    cost: "Gần như miễn phí: NACL miễn phí; Flow Logs gửi về S3 tính khoảng 0.25 USD/GB log (lab chỉ vài KB); EC2 trong Free Tier",
    goal: "Tự trải nghiệm tính Stateless của NACL (phải mở cổng Ephemeral chiều về), thứ tự đánh giá rule, chặn một IP cụ thể và tìm gói tin REJECT trong Flow Logs.",
    prerequisites: [
      "Có EC2 <code>lab-web</code> đang chạy web ở lab-public-1a (Lab 38)",
      "Biết IP public của máy bạn: mở https://checkip.amazonaws.com"
    ],
    steps: [
      {
        title: "Bật VPC Flow Logs về S3",
        detail: "Tạo bucket <code>lab-flowlogs-ACCOUNTID</code> (S3 → Create bucket, Region ap-southeast-1). Vào <strong>VPC → Your VPCs → lab-vpc → tab Flow logs → Create flow log</strong>: Filter <strong>All</strong>, Maximum aggregation interval <strong>1 minute</strong>, Destination <strong>Send to an Amazon S3 bucket</strong>, ARN <code>arn:aws:s3:::lab-flowlogs-ACCOUNTID</code>. AWS tự thêm bucket policy cho dịch vụ log delivery.",
        cli: "aws ec2 create-flow-logs --resource-type VPC --resource-ids vpc-xxxx --traffic-type ALL --log-destination-type s3 --log-destination arn:aws:s3:::lab-flowlogs-ACCOUNTID --max-aggregation-interval 60"
      },
      {
        title: "Tạo Custom NACL và thấy mặc định Deny All",
        detail: "<strong>VPC → Network ACLs → Create network ACL</strong>: <code>lab-nacl</code>, VPC <code>lab-vpc</code>. Xem Inbound/Outbound rules: chỉ có rule <code>*</code> DENY. So sánh với Default NACL của VPC: rule 100 ALLOW all. Chọn <code>lab-nacl</code> → <strong>Actions → Edit subnet associations</strong> → gắn <code>lab-public-1a</code>. Tải lại web → <strong>timeout</strong>.",
        cli: "aws ec2 create-network-acl --vpc-id vpc-xxxx --tag-specifications 'ResourceType=network-acl,Tags=[{Key=Name,Value=lab-nacl}]'"
      },
      {
        title: "Mở Inbound 80 – vẫn chưa chạy (Stateless!)",
        detail: "Inbound rules → Edit → Add: Rule 100, HTTP (80), Source <code>0.0.0.0/0</code>, ALLOW. Tải lại web → <strong>vẫn timeout</strong> vì gói trả lời đi ra cổng ngẫu nhiên của trình duyệt. Outbound rules → Add: Rule 100, Custom TCP <code>1024-65535</code>, Destination <code>0.0.0.0/0</code>, ALLOW → web chạy lại.<br>Muốn Session Manager vẫn hoạt động: thêm Outbound rule 110 TCP 443 ALLOW và Inbound rule 110 TCP 1024-65535 ALLOW.",
        cli: "aws ec2 create-network-acl-entry --network-acl-id acl-xxxx --ingress --rule-number 100 --protocol tcp --port-range From=80,To=80 --cidr-block 0.0.0.0/0 --rule-action allow\naws ec2 create-network-acl-entry --network-acl-id acl-xxxx --egress --rule-number 100 --protocol tcp --port-range From=1024,To=65535 --cidr-block 0.0.0.0/0 --rule-action allow"
      },
      {
        title: "Chặn đúng IP của bạn bằng rule DENY số nhỏ hơn",
        detail: "Inbound rules → Add: Rule <strong>90</strong>, HTTP 80, Source <code>YOUR_IP/32</code>, <strong>DENY</strong>. Tải lại web → timeout (rule 90 được đánh giá trước rule 100). Đổi số rule DENY thành <strong>110</strong> → web chạy lại vì rule 100 ALLOW khớp trước. Đây là điều Security Group không làm được (SG không có Deny).",
        cli: "aws ec2 create-network-acl-entry --network-acl-id acl-xxxx --ingress --rule-number 90 --protocol tcp --port-range From=80,To=80 --cidr-block YOUR_IP/32 --rule-action deny"
      },
      {
        title: "Đọc Flow Logs tìm REJECT",
        detail: "Sau ~10 phút, vào bucket → <code>AWSLogs/ACCOUNTID/vpcflowlogs/ap-southeast-1/...</code> → tải file .log.gz, giải nén. Định dạng: <code>version account-id interface-id srcaddr dstaddr srcport dstport protocol packets bytes start end action log-status</code>. Tìm dòng có srcaddr = IP của bạn, dstport = 80, action = <strong>REJECT</strong>."
      },
      {
        title: "So sánh với Security Group",
        detail: "Vào <code>lab-web-sg</code> → Edit inbound rules: chỉ có lựa chọn thêm rule cho phép, không có Deny. Outbound của SG không cần mở cổng Ephemeral vì SG là <strong>Stateful</strong>. Ghi lại bảng so sánh: SG ở mức ENI/instance, NACL ở mức subnet."
      }
    ],
    verify: [
      "Chỉ mở Inbound 80 trên NACL thì web vẫn timeout; thêm Outbound 1024-65535 thì chạy",
      "Rule DENY số 90 chặn được IP của bạn; đổi thành 110 thì không còn tác dụng",
      "Flow Logs có bản ghi REJECT với IP của bạn"
    ],
    cleanup: [
      "Chọn Default NACL của lab-vpc → Edit subnet associations → gắn lại lab-public-1a",
      "Xóa <code>lab-nacl</code>",
      "lab-vpc → tab Flow logs → chọn flow log → Actions → Delete",
      "Empty rồi Delete bucket <code>lab-flowlogs-ACCOUNTID</code>"
    ],
    examLink: "Chặn một IP/CIDR độc hại ở mức subnet → NACL (SG không có Deny). NACL Stateless: phải mở Ephemeral Ports 1024-65535 chiều về; rule đánh giá từ số nhỏ đến lớn. Default NACL Allow All, Custom NACL mới Deny All. Cần biết gói tin bị ACCEPT/REJECT → VPC Flow Logs (S3 hoặc CloudWatch Logs)."
  },

  41: {
    title: "VPC Peering hai VPC và S3 Gateway Endpoint có Endpoint Policy",
    type: "console",
    duration: "60 phút",
    cost: "Miễn phí: VPC Peering cùng AZ không tính phí giờ, Gateway Endpoint S3 miễn phí 100%. 2 EC2 t2.micro/t3.micro nằm trong 750 giờ Free Tier (tổng cộng các instance).",
    goal: "Nối 2 VPC không trùng CIDR bằng Peering, kiểm chứng tính không bắc cầu, và cho EC2 truy cập S3 qua Gateway Endpoint với policy chỉ cho phép đúng 1 bucket.",
    prerequisites: [
      "Có <code>lab-vpc</code> (10.0.0.0/16) và EC2 <code>lab-web</code> ở lab-public-1a với role <code>lab-ec2-ssm-role</code>",
      "Gắn thêm policy <code>AmazonS3ReadOnlyAccess</code> vào role <code>lab-ec2-ssm-role</code>"
    ],
    steps: [
      {
        title: "Tạo VPC B và EC2 B",
        detail: "Tạo VPC <code>lab-vpc-b</code> CIDR <code>10.1.0.0/16</code> (không trùng 10.0.0.0/16), subnet <code>lab-b-1a</code> <code>10.1.1.0/24</code>. Launch EC2 <code>lab-ec2-b</code> (t2.micro/t3.micro, không Public IP) với SG cho phép <strong>All ICMP - IPv4 từ 10.0.0.0/16</strong>. Ghi lại Private IP (ví dụ 10.1.1.25).",
        cli: "aws ec2 create-vpc --cidr-block 10.1.0.0/16 --tag-specifications 'ResourceType=vpc,Tags=[{Key=Name,Value=lab-vpc-b}]'\naws ec2 create-subnet --vpc-id vpc-bbbb --cidr-block 10.1.1.0/24 --availability-zone ap-southeast-1a"
      },
      {
        title: "Tạo và chấp nhận Peering",
        detail: "<strong>VPC → Peering connections → Create peering connection</strong>: Name <code>lab-pcx</code>, Requester <code>lab-vpc</code>, Account: My account, Region: This Region, Accepter <code>lab-vpc-b</code> → Create. Chọn peering → <strong>Actions → Accept request</strong>. Thử tạo peering giữa lab-vpc và một VPC cũng là 10.0.0.0/16 → trạng thái Failed do overlapping CIDR.",
        cli: "aws ec2 create-vpc-peering-connection --vpc-id vpc-aaaa --peer-vpc-id vpc-bbbb\naws ec2 accept-vpc-peering-connection --vpc-peering-connection-id pcx-xxxx"
      },
      {
        title: "Thêm route ở CẢ HAI phía",
        detail: "Trong <code>lab-public-rt</code> (VPC A): <code>10.1.0.0/16 → Peering Connection lab-pcx</code>. Trong main route table của <code>lab-vpc-b</code>: <code>10.0.0.0/16 → lab-pcx</code>. Quên một phía là ping không thông.",
        cli: "aws ec2 create-route --route-table-id rtb-a-public --destination-cidr-block 10.1.0.0/16 --vpc-peering-connection-id pcx-xxxx\naws ec2 create-route --route-table-id rtb-b-main --destination-cidr-block 10.0.0.0/16 --vpc-peering-connection-id pcx-xxxx"
      },
      {
        title: "Ping qua Peering",
        detail: "Session Manager vào <code>lab-web</code> (VPC A) và ping Private IP của EC2 B → thông. Tư duy thêm: nếu có VPC C peering với B thì A vẫn KHÔNG tới được C (Non-transitive) – phải tạo peering A-C riêng hoặc dùng Transit Gateway.",
        cli: "ping -c 3 10.1.1.25"
      },
      {
        title: "Tạo S3 Gateway Endpoint với Endpoint Policy",
        detail: "Tạo bucket <code>lab-endpoint-ACCOUNTID</code> ở ap-southeast-1 và upload 1 file bất kỳ. Vào <strong>VPC → Endpoints → Create endpoint</strong>: Type <strong>AWS services</strong>, Service <code>com.amazonaws.ap-southeast-1.s3</code> loại <strong>Gateway</strong>, VPC <code>lab-vpc</code>, Route tables: chọn <code>lab-public-rt</code>. Policy: <strong>Custom</strong>, dán:<br><code>{&quot;Statement&quot;:[{&quot;Effect&quot;:&quot;Allow&quot;,&quot;Principal&quot;:&quot;*&quot;,&quot;Action&quot;:[&quot;s3:GetObject&quot;,&quot;s3:ListBucket&quot;],&quot;Resource&quot;:[&quot;arn:aws:s3:::lab-endpoint-ACCOUNTID&quot;,&quot;arn:aws:s3:::lab-endpoint-ACCOUNTID/*&quot;]}]}</code><br>Xem lại route table: xuất hiện route <code>pl-xxxx (com.amazonaws.ap-southeast-1.s3) → vpce-xxxx</code>.",
        cli: "aws ec2 create-vpc-endpoint --vpc-id vpc-aaaa --service-name com.amazonaws.ap-southeast-1.s3 --vpc-endpoint-type Gateway --route-table-ids rtb-a-public"
      },
      {
        title: "Kiểm chứng traffic S3 đi qua Endpoint",
        detail: "Trong Session Manager của <code>lab-web</code>: liệt kê bucket lab → thành công. Liệt kê toàn bộ bucket hoặc một bucket khác cùng Region → <strong>AccessDenied</strong> dù role có AmazonS3ReadOnlyAccess, chứng tỏ request đã đi qua endpoint và bị Endpoint Policy chặn. Lưu ý: Amazon Linux 2023 tải gói từ S3, policy hẹp như vậy sẽ làm <code>dnf</code> lỗi – thực tế cần cho phép thêm bucket repo.",
        cli: "aws s3 ls s3://lab-endpoint-ACCOUNTID --region ap-southeast-1\naws s3 ls --region ap-southeast-1"
      }
    ],
    verify: [
      "Ping từ VPC A tới Private IP EC2 B thành công",
      "Route table có route prefix list pl-xxxx trỏ về vpce-xxxx",
      "aws s3 ls bucket lab thành công, bucket khác bị AccessDenied"
    ],
    cleanup: [
      "Terminate <code>lab-ec2-b</code>, xóa Peering <code>lab-pcx</code>, xóa <code>lab-vpc-b</code>",
      "Xóa VPC Endpoint (VPC → Endpoints → Actions → Delete VPC endpoints)",
      "Empty và Delete bucket <code>lab-endpoint-ACCOUNTID</code>",
      "Gỡ policy AmazonS3ReadOnlyAccess khỏi role nếu không cần"
    ],
    examLink: "Câu tủ: EC2 private tải nhiều dữ liệu S3/DynamoDB qua NAT tốn tiền → Gateway VPC Endpoint (chỉ S3 và DynamoDB, miễn phí, thêm route vào route table). Dịch vụ khác (SQS, KMS, Secrets Manager...) → Interface Endpoint/PrivateLink (có phí, tạo ENI). Peering: CIDR không trùng, không bắc cầu; nhiều VPC → Transit Gateway."
  },

  42: {
    title: "Thiết kế Hybrid Network: Site-to-Site VPN, Direct Connect và Transit Gateway",
    type: "design",
    duration: "45-60 phút",
    cost: "Miễn phí: chỉ tạo Customer Gateway và Virtual Private Gateway (không tính phí). KHÔNG tạo VPN Connection (~0.05 USD/giờ), Transit Gateway (~0.07 USD/giờ mỗi attachment) hay Direct Connect (cần đối tác viễn thông, nhiều tuần).",
    goal: "Vẽ kiến trúc kết nối trụ sở công ty với nhiều VPC, chọn đúng VPN/DX/TGW theo yêu cầu, đồng thời thao tác các thành phần miễn phí trên console để hiểu luồng cấu hình.",
    prerequisites: [
      "Giấy/whiteboard hoặc draw.io",
      "Có <code>lab-vpc</code> từ Lab 37",
      "Biết IP public mạng nhà bạn (https://checkip.amazonaws.com)"
    ],
    steps: [
      {
        title: "Đọc đề bài thiết kế",
        detail: "Công ty Java ở TP.HCM có datacenter on-premise (dải 192.168.0.0/16) và 4 VPC trên AWS (prod, staging, shared-services, data). Yêu cầu: (1) Tuần này phải có kết nối mã hóa tạm thời; (2) 3 tháng tới cần băng thông ổn định 10 Gbps; (3) Dữ liệu trên đường truyền bắt buộc mã hóa IPsec; (4) Có đường dự phòng rẻ nhất; (5) Tất cả VPC thông nhau và thông về on-premise mà không phải quản lý mạng nhện peering."
      },
      {
        title: "Vẽ kiến trúc đáp án",
        detail: "• Ngay lập tức: <strong>Site-to-Site VPN</strong> (IPsec qua Internet, dựng trong vài phút).<br>• Dài hạn: <strong>Direct Connect 10 Gbps</strong> (cáp riêng, mất vài tuần đến vài tháng, KHÔNG mã hóa sẵn).<br>• Yêu cầu mã hóa: chạy <strong>VPN IPsec đè lên Direct Connect</strong>.<br>• Dự phòng rẻ nhất: giữ Site-to-Site VPN qua Internet làm backup cho DX.<br>• Trung tâm: <strong>Transit Gateway</strong> hub-and-spoke, 4 VPC attachment + VPN attachment + Direct Connect Gateway.<br>Vẽ sơ đồ: On-prem router (Customer Gateway) → DX Location → DX Gateway → TGW → 4 VPC; nhánh VPN backup → TGW."
      },
      {
        title: "Thực hành miễn phí: tạo Customer Gateway",
        detail: "<strong>VPC → Customer gateways → Create customer gateway</strong>: Name <code>lab-cgw</code>, BGP ASN <code>65000</code>, IP address = IP public của bạn. Đây chỉ là bản ghi mô tả router phía công ty, không tính phí.",
        cli: "aws ec2 create-customer-gateway --type ipsec.1 --public-ip YOUR_PUBLIC_IP --bgp-asn 65000 --tag-specifications 'ResourceType=customer-gateway,Tags=[{Key=Name,Value=lab-cgw}]'"
      },
      {
        title: "Thực hành miễn phí: Virtual Private Gateway + Route Propagation",
        detail: "<strong>VPC → Virtual private gateways → Create</strong>: <code>lab-vgw</code>, ASN Amazon default → Create → <strong>Actions → Attach to VPC</strong> → <code>lab-vpc</code>. Vào <code>lab-private-rt</code> → tab <strong>Route propagation → Edit</strong> → bật cho <code>lab-vgw</code> (route on-prem sẽ tự học qua BGP khi có VPN). Mở thử <strong>Site-to-Site VPN connections → Create VPN connection</strong> để xem các trường (Target gateway, Customer gateway, Routing options Dynamic/Static) rồi bấm <strong>Cancel</strong> – không tạo vì có phí.",
        cli: "aws ec2 create-vpn-gateway --type ipsec.1\naws ec2 attach-vpn-gateway --vpn-gateway-id vgw-xxxx --vpc-id vpc-xxxx\naws ec2 enable-vgw-route-propagation --route-table-id rtb-private --gateway-id vgw-xxxx"
      },
      {
        title: "Tham quan Transit Gateway (không tạo)",
        detail: "Mở <strong>VPC → Transit gateways → Create transit gateway</strong>, đọc các tùy chọn: <em>Default route table association/propagation</em>, <em>Multicast support</em> (TGW là dịch vụ duy nhất hỗ trợ IP Multicast), <em>VPN ECMP support</em> (gộp nhiều tunnel VPN tăng băng thông). Bấm Cancel. Ghi chú: chia sẻ TGW sang account khác dùng <strong>AWS RAM</strong>."
      },
      {
        title: "Tự kiểm tra bằng 4 câu hỏi",
        detail: "1) Cần kết nối trong 1 ngày, chi phí thấp → ? (VPN)<br>2) Băng thông ổn định, độ trễ nhất quán, không đi Internet → ? (Direct Connect)<br>3) DX + bắt buộc mã hóa → ? (VPN over DX)<br>4) 50 VPC + nhiều VPN cần thông nhau → ? (Transit Gateway)"
      }
    ],
    verify: [
      "Sơ đồ có đủ: CGW, DX + DX Gateway, VPN backup, TGW với 4 VPC attachment",
      "lab-vgw ở trạng thái attached với lab-vpc, route propagation bật trên lab-private-rt",
      "Trả lời đúng 4 câu tự kiểm tra"
    ],
    cleanup: [
      "Tắt route propagation, <strong>Actions → Detach from VPC</strong> cho lab-vgw, đợi detached rồi Delete",
      "Delete customer gateway <code>lab-cgw</code>",
      "Đảm bảo KHÔNG có VPN connection hay Transit Gateway nào được tạo (VPC → Site-to-Site VPN connections / Transit gateways trống)"
    ],
    examLink: "VPN = nhanh, rẻ, IPsec qua Internet. Direct Connect = cáp riêng, ổn định, lâu lắp đặt, KHÔNG mã hóa sẵn → cần mã hóa thì VPN over DX. Dự phòng DX rẻ nhất = Site-to-Site VPN. Nhiều VPC/VPN/DX hub-and-spoke, multicast → Transit Gateway."
  },

  43: {
    title: "IPv6 với Egress-Only Internet Gateway và kết nối EC2 private qua EC2 Instance Connect Endpoint",
    type: "console",
    duration: "45-60 phút",
    cost: "Miễn phí: Egress-Only IGW không tính phí giờ, EC2 Instance Connect Endpoint miễn phí, EC2 trong Free Tier. AWS Network Firewall chỉ tham quan (khoảng 0.395 USD/giờ mỗi endpoint) – KHÔNG tạo.",
    goal: "Cấp IPv6 cho Private Subnet, cho EC2 đi ra Internet bằng IPv6 qua Egress-Only IGW (chặn chiều vào), và hiểu vai trò của Network Firewall.",
    prerequisites: [
      "Có <code>lab-vpc</code>, <code>lab-private-1b</code>, <code>lab-private-rt</code> (Lab 37, 39) và NAT Gateway đã được xóa",
      "Xóa route Blackhole 0.0.0.0/0 cũ trong lab-private-rt nếu còn"
    ],
    steps: [
      {
        title: "Gắn dải IPv6 cho VPC và Subnet",
        detail: "<strong>VPC → Your VPCs → lab-vpc → Actions → Edit CIDRs → Add new IPv6 CIDR</strong> → <strong>Amazon-provided IPv6 CIDR block</strong> (/56). Sau đó <strong>Subnets → lab-private-1b → Actions → Edit IPv6 CIDRs → Add IPv6 CIDR</strong> → chọn một /64 (ví dụ subnet index 01). Tại Edit subnet settings bật <strong>Enable auto-assign IPv6 address</strong>.",
        cli: "aws ec2 associate-vpc-cidr-block --vpc-id vpc-xxxx --amazon-provided-ipv6-cidr-block\naws ec2 associate-subnet-cidr-block --subnet-id subnet-private --ipv6-cidr-block 2406:da18:xxxx:xx01::/64\naws ec2 modify-subnet-attribute --subnet-id subnet-private --assign-ipv6-address-on-creation"
      },
      {
        title: "Tạo Egress-Only IGW và route ::/0",
        detail: "<strong>VPC → Egress-only internet gateways → Create</strong>: <code>lab-eigw</code>, VPC <code>lab-vpc</code>. Vào <code>lab-private-rt</code> → Edit routes → Add: Destination <code>::/0</code>, Target <strong>Egress Only Internet Gateway</strong> → <code>lab-eigw</code>.",
        cli: "aws ec2 create-egress-only-internet-gateway --vpc-id vpc-xxxx\naws ec2 create-route --route-table-id rtb-private --destination-ipv6-cidr-block ::/0 --egress-only-internet-gateway-id eigw-xxxx"
      },
      {
        title: "Tạo EC2 Instance Connect Endpoint (truy cập không cần NAT)",
        detail: "Tạo SG <code>lab-eice-sg</code> (không Inbound, Outbound mặc định). <strong>VPC → Endpoints → Create endpoint</strong> → Type <strong>EC2 Instance Connect Endpoint</strong>, VPC <code>lab-vpc</code>, SG <code>lab-eice-sg</code>, Subnet <code>lab-private-1b</code> → Create (đợi 3-5 phút).",
        cli: "aws ec2 create-instance-connect-endpoint --subnet-id subnet-private --security-group-ids sg-eice"
      },
      {
        title: "Launch EC2 IPv6 trong Private Subnet",
        detail: "Launch <code>lab-ipv6-ec2</code>: Amazon Linux 2023, t2.micro/t3.micro, tạo key pair mới, Subnet <code>lab-private-1b</code>, Auto-assign public IPv4 Disable, Auto-assign IPv6 <strong>Enable</strong>, SG cho phép <strong>SSH 22 với Source là lab-eice-sg</strong>. Sau khi chạy: chọn instance → <strong>Connect → EC2 Instance Connect → Connect using EC2 Instance Connect Endpoint</strong>."
      },
      {
        title: "Kiểm chứng đi ra bằng IPv6, IPv4 bị chặn",
        detail: "Lệnh 1 trả về địa chỉ IPv6 của chính instance (IPv6 trên AWS luôn là public toàn cầu). Lệnh 2 (IPv4) bị timeout vì không có NAT. Nếu mạng nhà bạn có IPv6, thử ping6 tới IPv6 của instance → không thông: Egress-Only IGW chặn kết nối khởi tạo từ ngoài vào.",
        cli: "curl -6 -s --max-time 10 https://api64.ipify.org\ncurl -4 -s --max-time 10 https://checkip.amazonaws.com"
      },
      {
        title: "Tham quan AWS Network Firewall (không tạo)",
        detail: "Mở <strong>VPC → Network Firewall → Firewall policies → Create</strong>, xem phần <strong>Stateful rule groups</strong> → loại <em>Domain list</em> (ví dụ chỉ cho phép <code>.github.com</code>, <code>.maven.org</code> đi ra) và <em>Suricata compatible IPS rules</em>. Bấm Cancel. Ghi nhớ: Network Firewall bảo vệ cả VPC, lọc L3-L7 và lọc tên miền đi ra."
      }
    ],
    verify: [
      "curl -6 trả về IPv6 2406:da18:... của instance",
      "curl -4 bị timeout",
      "Kết nối được vào EC2 không có Public IPv4 qua EC2 Instance Connect Endpoint"
    ],
    cleanup: [
      "Terminate <code>lab-ipv6-ec2</code>, xóa key pair nếu không dùng",
      "Xóa EC2 Instance Connect Endpoint, xóa SG lab-eice-sg",
      "Xóa route ::/0 và Egress-only IGW <code>lab-eigw</code>",
      "Gỡ IPv6 CIDR khỏi subnet rồi khỏi VPC (Edit IPv6 CIDRs → Remove)"
    ],
    examLink: "IPv6 + private subnet + chỉ cho đi ra, chặn chiều vào → Egress-Only Internet Gateway (NAT Gateway chỉ dành cho IPv4). Lọc tên miền đi ra / IPS cho toàn VPC → AWS Network Firewall. Chặn IP ở subnet → NACL; chống SQLi/XSS ở L7 → WAF."
  },

  44: {
    title: "Data Lake mini: truy vấn CSV trên S3 bằng Athena và tối ưu chi phí với Parquet",
    type: "console",
    duration: "40-50 phút",
    cost: "Vài cent: Athena 5 USD/TB quét (tối thiểu 10 MB/truy vấn ≈ 0.00005 USD), S3 Free Tier. Glue Data Catalog miễn phí 1 triệu object. Glue Crawler (tùy chọn) khoảng 0.44 USD/DPU-giờ, tính tối thiểu 10 phút.",
    goal: "Dùng Athena chạy SQL trực tiếp trên file trong S3, thấy bảng tự xuất hiện trong Glue Data Catalog và so sánh lượng dữ liệu quét giữa CSV và Parquet.",
    prerequisites: [
      "Region ap-southeast-1",
      "Tạo file <code>orders.csv</code> trên máy với nội dung:<br><code>order_id,customer,amount,country<br>1,An,120.5,VN<br>2,Binh,80,SG<br>3,Chi,45.9,VN<br>4,Dung,300,JP<br>5,Em,99.9,SG</code>"
    ],
    steps: [
      {
        title: "Chuẩn bị bucket dữ liệu",
        detail: "Tạo bucket <code>lab-athena-ACCOUNTID</code>. Tạo thư mục <code>orders/</code> và upload <code>orders.csv</code> vào đó. Tạo thêm thư mục <code>results/</code> để chứa kết quả truy vấn.",
        cli: "aws s3 mb s3://lab-athena-ACCOUNTID --region ap-southeast-1\naws s3 cp orders.csv s3://lab-athena-ACCOUNTID/orders/orders.csv"
      },
      {
        title: "Cấu hình Athena",
        detail: "<strong>Athena → Launch query editor → tab Settings → Manage</strong> → Location of query result: <code>s3://lab-athena-ACCOUNTID/results/</code> → Save. Quay lại tab Editor, chạy: <code>CREATE DATABASE labdb;</code>"
      },
      {
        title: "Tạo External Table trỏ vào S3",
        detail: "Chạy câu lệnh DDL sau (dữ liệu vẫn nằm nguyên trong S3, Athena chỉ lưu schema):<br><code>CREATE EXTERNAL TABLE labdb.orders (order_id int, customer string, amount double, country string) ROW FORMAT DELIMITED FIELDS TERMINATED BY ',' LOCATION 's3://lab-athena-ACCOUNTID/orders/' TBLPROPERTIES ('skip.header.line.count'='1');</code><br>Mở <strong>AWS Glue → Data Catalog → Databases → labdb → Tables</strong>: bảng <code>orders</code> đã có – Athena dùng chung Glue Data Catalog."
      },
      {
        title: "Chạy truy vấn phân tích",
        detail: "Chạy: <code>SELECT country, SUM(amount) AS revenue FROM labdb.orders GROUP BY country ORDER BY revenue DESC;</code><br>Ghi lại <strong>Data scanned</strong> ở khung Query results.",
        cli: "aws athena start-query-execution --work-group primary --query-execution-context Database=labdb --query-string 'SELECT country, SUM(amount) AS revenue FROM orders GROUP BY country'\naws athena get-query-results --query-execution-id QUERY_ID"
      },
      {
        title: "Chuyển sang Parquet bằng CTAS và so sánh",
        detail: "Chạy:<br><code>CREATE TABLE labdb.orders_parquet WITH (format = 'PARQUET', write_compression = 'SNAPPY', external_location = 's3://lab-athena-ACCOUNTID/orders-parquet/') AS SELECT * FROM labdb.orders;</code><br>Sau đó chạy <code>SELECT SUM(amount) FROM labdb.orders_parquet;</code> và so với cùng truy vấn trên bảng CSV: Parquet (định dạng cột, nén) chỉ đọc cột amount nên quét ít hơn. Với dữ liệu TB thật, chênh lệch 80-90% chi phí."
      },
      {
        title: "Tham quan Glue Crawler, Lake Formation, QuickSight",
        detail: "<strong>Glue → Crawlers → Create crawler</strong>: xem cách crawler tự dò schema từ S3 (có thể chạy thử nếu chấp nhận ~0.07 USD). <strong>Lake Formation</strong>: xem tab Data permissions – phân quyền đến từng cột/dòng. <strong>QuickSight</strong>: chỉ đọc giới thiệu, đăng ký sẽ phát sinh phí sau thời gian dùng thử."
      }
    ],
    verify: [
      "Truy vấn GROUP BY trả về doanh thu theo VN, SG, JP",
      "Bảng orders và orders_parquet xuất hiện trong Glue Data Catalog",
      "Data scanned của truy vấn Parquet nhỏ hơn CSV"
    ],
    cleanup: [
      "Athena: <code>DROP TABLE labdb.orders_parquet; DROP TABLE labdb.orders; DROP DATABASE labdb;</code>",
      "Empty và Delete bucket <code>lab-athena-ACCOUNTID</code>",
      "Xóa Glue Crawler nếu đã tạo"
    ],
    examLink: "SQL ad-hoc trực tiếp trên S3, serverless, ít vận hành nhất → Athena. Giảm chi phí/tăng tốc Athena → chuyển sang Parquet/ORC + nén + partition (dùng Glue ETL). Dò schema tự động → Glue Crawler/Data Catalog. Phân quyền cột/dòng cho Data Lake → Lake Formation. Dashboard BI → QuickSight."
  },

  45: {
    title: "Chuỗi AI không cần ML: Polly → Transcribe → Translate → Comprehend → Rekognition",
    type: "cli",
    duration: "40-50 phút",
    cost: "Miễn phí trong Free Tier 12 tháng (Polly 5 triệu ký tự, Transcribe 60 phút, Translate 2 triệu ký tự, Comprehend 50K đơn vị, Rekognition 5.000 ảnh mỗi tháng). Ngoài Free Tier chỉ vài cent cho lab này.",
    goal: "Mô phỏng pipeline phân tích cuộc gọi tổng đài: tạo giọng nói, chuyển thành văn bản, phân tích cảm xúc, dịch tiếng Việt và nhận diện ảnh – chỉ bằng API.",
    prerequisites: [
      "Dùng AWS CloudShell ở Region ap-southeast-1",
      "Một ảnh JPG bất kỳ (ví dụ ảnh có người, xe, mèo) đặt tên <code>photo.jpg</code>"
    ],
    steps: [
      {
        title: "Tạo bucket và giọng nói bằng Polly",
        detail: "Polly chuyển văn bản thành giọng nói (Text-to-Speech). Lưu ý Polly chưa có giọng tiếng Việt nên dùng tiếng Anh. Tải <code>call.mp3</code> từ CloudShell (Actions → Download file) để nghe thử.",
        cli: "aws s3 mb s3://lab-ai-ACCOUNTID --region ap-southeast-1\naws polly synthesize-speech --output-format mp3 --voice-id Joanna --text 'Hello, my order arrived two weeks late and the box was broken. I am very disappointed.' call.mp3\naws s3 cp call.mp3 s3://lab-ai-ACCOUNTID/call.mp3"
      },
      {
        title: "Chuyển giọng nói thành văn bản bằng Transcribe",
        detail: "Transcribe (Speech-to-Text) chạy job bất đồng bộ. Đợi trạng thái COMPLETED (khoảng 1 phút), file JSON kết quả nằm trong bucket. Trên console <strong>Amazon Transcribe → Transcription jobs</strong> có thể xem transcript và tùy chọn <strong>PII redaction</strong>.",
        cli: "aws transcribe start-transcription-job --transcription-job-name lab-call-1 --language-code en-US --media MediaFileUri=s3://lab-ai-ACCOUNTID/call.mp3 --output-bucket-name lab-ai-ACCOUNTID\naws transcribe get-transcription-job --transcription-job-name lab-call-1 --query TranscriptionJob.TranscriptionJobStatus"
      },
      {
        title: "Phân tích cảm xúc bằng Comprehend",
        detail: "Comprehend (NLP) trả về Sentiment = NEGATIVE kèm điểm tin cậy. Chạy thêm detect-key-phrases để trích từ khóa.",
        cli: "aws comprehend detect-sentiment --language-code en --text 'Hello, my order arrived two weeks late and the box was broken. I am very disappointed.'\naws comprehend detect-key-phrases --language-code en --text 'My order arrived two weeks late and the box was broken.'"
      },
      {
        title: "Phản hồi tiếng Việt: Translate rồi Comprehend",
        detail: "Comprehend chưa phân tích cảm xúc trực tiếp tiếng Việt → dịch sang tiếng Anh bằng Translate trước, sau đó đưa câu đã dịch vào detect-sentiment. Đây là cách ghép dịch vụ rất hay gặp.",
        cli: "aws translate translate-text --source-language-code vi --target-language-code en --text 'Sản phẩm rất tốt, giao hàng nhanh, tôi sẽ mua lại'"
      },
      {
        title: "Nhận diện ảnh bằng Rekognition",
        detail: "Upload <code>photo.jpg</code> lên CloudShell (Actions → Upload file) rồi lên S3. Rekognition trả về nhãn (Person, Car, Cat...) và điểm tin cậy; detect-moderation-labels dùng kiểm duyệt nội dung nhạy cảm.",
        cli: "aws s3 cp photo.jpg s3://lab-ai-ACCOUNTID/photo.jpg\naws rekognition detect-labels --image 'S3Object={Bucket=lab-ai-ACCOUNTID,Name=photo.jpg}' --max-labels 5\naws rekognition detect-moderation-labels --image 'S3Object={Bucket=lab-ai-ACCOUNTID,Name=photo.jpg}'"
      },
      {
        title: "Gắn vào kiến trúc Java",
        detail: "Thiết kế: S3 upload ghi âm → S3 Event → Lambda (Java, AWS SDK v2 <code>TranscribeClient</code>) → kết quả → Lambda gọi <code>ComprehendClient.detectSentiment</code> → lưu DynamoDB. Tổng đài thật dùng <strong>Amazon Connect</strong>; chatbot dùng <strong>Lex</strong>; tìm kiếm tài liệu nội bộ bằng câu hỏi tự nhiên dùng <strong>Kendra</strong> (đắt, chỉ học lý thuyết)."
      }
    ],
    verify: [
      "call.mp3 phát được giọng đọc",
      "Transcription job COMPLETED với nội dung khớp câu gốc",
      "Comprehend trả về NEGATIVE cho câu phàn nàn và POSITIVE cho câu tiếng Việt đã dịch",
      "Rekognition trả về ít nhất 1 nhãn đúng với ảnh"
    ],
    cleanup: [
      "aws transcribe delete-transcription-job --transcription-job-name lab-call-1",
      "aws s3 rb s3://lab-ai-ACCOUNTID --force"
    ],
    examLink: "Ảnh/video, khuôn mặt, kiểm duyệt → Rekognition. Giọng nói → chữ (PII redaction) → Transcribe. Chữ → giọng nói → Polly. Cảm xúc, từ khóa → Comprehend. Dịch → Translate. Chatbot → Lex. Tìm kiếm tài liệu nội bộ → Kendra. Chuỗi tổng đài: Connect → Transcribe → Comprehend."
  },

  46: {
    title: "CloudWatch Agent đo RAM, CloudTrail tìm thủ phạm và AWS Config bắt lỗi cấu hình",
    type: "console",
    duration: "60 phút",
    cost: "Gần như miễn phí: CloudWatch Free Tier (10 custom metrics, 10 alarms), CloudTrail Event history 90 ngày miễn phí. AWS Config tính ~0.003 USD/configuration item + 0.001 USD/lần đánh giá rule (lab chỉ vài cent nếu chỉ ghi 1 loại tài nguyên).",
    goal: "Phân biệt rõ 3 dịch vụ bằng thực hành: CloudWatch (hiệu năng, RAM cần Agent), CloudTrail (ai gọi API gì), AWS Config (tài nguyên có tuân thủ quy tắc không).",
    prerequisites: [
      "Có EC2 <code>lab-web</code> (Amazon Linux 2023) với role <code>lab-ec2-ssm-role</code>",
      "Gắn thêm policy <code>CloudWatchAgentServerPolicy</code> vào role đó"
    ],
    steps: [
      {
        title: "Thấy CloudWatch mặc định không có RAM",
        detail: "<strong>CloudWatch → Metrics → All metrics → EC2 → Per-Instance Metrics</strong>: có CPUUtilization, NetworkIn, DiskReadOps... nhưng <strong>không có Memory hay Disk space used</strong>."
      },
      {
        title: "Cài CloudWatch Unified Agent",
        detail: "Session Manager vào <code>lab-web</code>, cài agent và chạy wizard (chọn: Linux, EC2, user root, không StatsD/CollectD, Standard metrics, không cần log file). Wizard lưu cấu hình vào <code>/opt/aws/amazon-cloudwatch-agent/bin/config.json</code>. Sau 5 phút, metric <code>mem_used_percent</code> và <code>disk_used_percent</code> xuất hiện trong namespace <strong>CWAgent</strong>.",
        cli: "sudo dnf install -y amazon-cloudwatch-agent\nsudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-config-wizard\nsudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -s -c file:/opt/aws/amazon-cloudwatch-agent/bin/config.json"
      },
      {
        title: "Tạo Alarm CPU gửi email qua SNS",
        detail: "Tạo SNS topic <code>lab-alerts</code>, subscribe email và bấm xác nhận trong mail. <strong>CloudWatch → Alarms → Create alarm</strong> → metric EC2 CPUUtilization của lab-web, Average 5 phút, Greater than 70 → Notification: lab-alerts. Tạo tải CPU bằng stress-ng để alarm chuyển ALARM.",
        cli: "aws sns create-topic --name lab-alerts\naws sns subscribe --topic-arn arn:aws:sns:ap-southeast-1:ACCOUNTID:lab-alerts --protocol email --notification-endpoint you@example.com\naws cloudwatch put-metric-alarm --alarm-name lab-cpu-high --namespace AWS/EC2 --metric-name CPUUtilization --dimensions Name=InstanceId,Value=i-xxxx --statistic Average --period 300 --threshold 70 --comparison-operator GreaterThanThreshold --evaluation-periods 1 --alarm-actions arn:aws:sns:ap-southeast-1:ACCOUNTID:lab-alerts\nsudo dnf install -y stress-ng\nstress-ng --cpu 1 --timeout 600"
      },
      {
        title: "Bật AWS Config ghi đúng 1 loại tài nguyên",
        detail: "<strong>AWS Config → Get started</strong> (hoặc Settings → Edit): Recording strategy <strong>Specific resource types</strong> → chọn <code>AWS::EC2::SecurityGroup</code> (tiết kiệm phí), tạo bucket mới cho delivery, role mặc định. Sau đó <strong>Rules → Add rule → AWS managed rule</strong> → <code>restricted-ssh</code> → Save."
      },
      {
        title: "Tạo vi phạm và xem Config bắt lỗi",
        detail: "Vào <code>lab-web-sg</code> → thêm Inbound rule <strong>SSH 22 từ 0.0.0.0/0</strong>. Sau vài phút, rule <code>restricted-ssh</code> báo <strong>Noncompliant</strong> cho SG này. Bấm vào SG trong Config → <strong>Resource timeline</strong> để thấy lịch sử thay đổi cấu hình."
      },
      {
        title: "Dùng CloudTrail tìm ai đã mở cổng 22",
        detail: "<strong>CloudTrail → Event history</strong> → Lookup attributes: Event name = <code>AuthorizeSecurityGroupIngress</code>. Mở event: thấy userIdentity (IAM user nào), sourceIPAddress, eventTime, requestParameters (port 22, 0.0.0.0/0). Sau đó xóa rule SSH → Config chuyển lại Compliant.",
        cli: "aws cloudtrail lookup-events --lookup-attributes AttributeKey=EventName,AttributeValue=AuthorizeSecurityGroupIngress --max-results 5"
      }
    ],
    verify: [
      "Namespace CWAgent có mem_used_percent của lab-web",
      "Alarm lab-cpu-high chuyển ALARM và bạn nhận email",
      "Rule restricted-ssh báo Noncompliant khi mở 22, Compliant khi đóng",
      "CloudTrail cho biết IAM user và IP đã mở cổng 22"
    ],
    cleanup: [
      "Dừng stress-ng (Ctrl+C), xóa alarm <code>lab-cpu-high</code>, xóa SNS topic nếu không dùng ở Lab 55",
      "Config: Rules → xóa restricted-ssh; Settings → tắt recording (hoặc CLI: aws configservice stop-configuration-recorder --configuration-recorder-name default)",
      "Gỡ agent nếu muốn: sudo dnf remove -y amazon-cloudwatch-agent (custom metrics ngừng phát sinh)"
    ],
    examLink: "Đo RAM/disk trống EC2 → phải cài CloudWatch Unified Agent. Ai xóa bucket/sửa SG, lúc nào, từ IP nào → CloudTrail. Kiểm tra EBS chưa mã hóa, SG mở 22 ra thế giới, lịch sử cấu hình, auto-remediation → AWS Config. Hiệu năng + báo động → CloudWatch Alarm + SNS."
  },

  47: {
    title: "AWS Organizations, OU, SCP giới hạn loại EC2 và IAM Identity Center",
    type: "console",
    duration: "45-60 phút",
    cost: "Miễn phí: Organizations, SCP, IAM Identity Center không tính phí. CẢNH BÁO: tạo member account là tùy chọn – đóng account sẽ bị treo 90 ngày và có hạn mức số account được đóng mỗi tháng.",
    goal: "Dựng cấu trúc Organization với OU Dev, viết SCP chặn EC2 lớn và hiểu SCP giới hạn cả Root của member account nhưng không ảnh hưởng Management Account; bật SSO bằng IAM Identity Center.",
    prerequisites: [
      "Account cá nhân CHƯA thuộc Organization nào (account này sẽ trở thành Management Account)",
      "Đăng nhập bằng IAM user Admin hoặc Root (bật MFA)"
    ],
    steps: [
      {
        title: "Tạo Organization",
        detail: "<strong>AWS Organizations → Create an organization</strong> (feature set All features). Xác nhận email gửi tới địa chỉ của account. Account hiện tại trở thành <strong>Management Account</strong>, có Consolidated Billing.",
        cli: "aws organizations create-organization --feature-set ALL\naws organizations list-roots"
      },
      {
        title: "Tạo OU Dev và bật SCP",
        detail: "<strong>AWS accounts → chọn Root → Actions → Create new</strong> → OU name <code>Dev</code>. Vào <strong>Policies → Service control policies → Enable service control policies</strong>.",
        cli: "aws organizations create-organizational-unit --parent-id r-xxxx --name Dev\naws organizations enable-policy-type --root-id r-xxxx --policy-type SERVICE_CONTROL_POLICY"
      },
      {
        title: "Viết SCP chỉ cho phép EC2 nhỏ",
        detail: "<strong>Policies → Service control policies → Create policy</strong>: tên <code>OnlySmallEC2</code>, dán JSON:<br><code>{&quot;Version&quot;:&quot;2012-10-17&quot;,&quot;Statement&quot;:[{&quot;Sid&quot;:&quot;OnlySmallEC2&quot;,&quot;Effect&quot;:&quot;Deny&quot;,&quot;Action&quot;:&quot;ec2:RunInstances&quot;,&quot;Resource&quot;:&quot;arn:aws:ec2:*:*:instance/*&quot;,&quot;Condition&quot;:{&quot;StringNotEquals&quot;:{&quot;ec2:InstanceType&quot;:[&quot;t2.micro&quot;,&quot;t3.micro&quot;]}}}]}</code><br>Lưu file này thành <code>scp.json</code> nếu dùng CLI. SCP không cấp quyền, chỉ đặt trần tối đa.",
        cli: "aws organizations create-policy --name OnlySmallEC2 --type SERVICE_CONTROL_POLICY --description 'Only t2.micro and t3.micro' --content file://scp.json"
      },
      {
        title: "Gắn SCP vào OU Dev",
        detail: "Chọn policy <code>OnlySmallEC2</code> → tab <strong>Targets → Attach</strong> → chọn OU <code>Dev</code>. Ghi nhớ: Management Account không bao giờ bị SCP giới hạn – vì vậy thử chạy t3.small ở account hiện tại vẫn được (đừng thử để tránh phí).",
        cli: "aws organizations attach-policy --policy-id p-xxxx --target-id ou-xxxx-xxxxxxxx"
      },
      {
        title: "(Tùy chọn) Member account để kiểm chứng",
        detail: "<strong>AWS accounts → Add an AWS account → Create</strong> với email alias (ví dụ <code>you+labdev@gmail.com</code>), di chuyển vào OU Dev. Dùng <strong>Switch role</strong> sang role <code>OrganizationAccountAccessRole</code> trong account mới, thử launch <code>t3.small</code> → lỗi <em>explicit deny in a service control policy</em>; <code>t3.micro</code> thì được (hủy ngay trước khi launch thật để khỏi tốn phí)."
      },
      {
        title: "Bật IAM Identity Center (SSO)",
        detail: "<strong>IAM Identity Center → Enable</strong> (Region ap-southeast-1). <strong>Users → Add user</strong> <code>dev-an</code>; <strong>Groups</strong> tạo <code>Developers</code> và thêm user. <strong>Permission sets → Create</strong> → Predefined <code>ReadOnlyAccess</code>. <strong>AWS accounts</strong> → chọn account → Assign users or groups → Developers + ReadOnlyAccess. Đăng nhập thử bằng <strong>AWS access portal URL</strong> trong trang Dashboard."
      }
    ],
    verify: [
      "Organization có Root → OU Dev, SCP OnlySmallEC2 attached vào Dev",
      "(Nếu tạo member account) launch t3.small bị explicit deny bởi SCP",
      "User dev-an đăng nhập access portal và chỉ có quyền ReadOnly"
    ],
    cleanup: [
      "Detach và Delete SCP OnlySmallEC2",
      "IAM Identity Center → Settings → Delete instance (nếu không dùng tiếp)",
      "Nếu đã tạo member account: Organizations → chọn account → Close (bị treo 90 ngày rồi xóa hẳn)",
      "Muốn bỏ Organization: xóa hết member account → Settings → Delete organization"
    ],
    examLink: "Chặn cả phòng ban/account không được dùng dịch vụ X, Region Y, loại EC2 lớn, không được tắt CloudTrail → SCP trong AWS Organizations (ảnh hưởng cả Root của member, không ảnh hưởng Management Account). Gộp hóa đơn, chia sẻ RI/Savings Plans → Consolidated Billing. SSO cho nhân viên vào nhiều account → IAM Identity Center. Chia sẻ Subnet/TGW giữa account → AWS RAM."
  },

  48: {
    title: "KMS envelope cơ bản, Parameter Store SecureString và Secrets Manager cho ứng dụng Java",
    type: "cli",
    duration: "40-50 phút",
    cost: "Gần như miễn phí: KMS Customer Managed Key 1 USD/tháng tính theo giờ (lên lịch xóa ngay sau lab), 20.000 request/tháng miễn phí. Parameter Store Standard miễn phí. Secrets Manager có 30 ngày dùng thử, sau đó 0.40 USD/secret/tháng.",
    goal: "Tạo khóa KMS có xoay vòng, mã hóa/giải mã dữ liệu, lưu cấu hình phân cấp trong Parameter Store và mật khẩu DB trong Secrets Manager, rồi xem dấu vết Decrypt trong CloudTrail.",
    prerequisites: [
      "AWS CloudShell ở ap-southeast-1 (có sẵn base64, AWS CLI v2)"
    ],
    steps: [
      {
        title: "Tạo Customer Managed Key và bật rotation",
        detail: "Console: <strong>KMS → Customer managed keys → Create key</strong> → Symmetric, Encrypt and decrypt → Alias <code>lab-key</code> → Key administrators/users: IAM user của bạn. Sau khi tạo → tab <strong>Key rotation</strong> → bật <strong>Automatically rotate</strong> (mặc định 365 ngày).",
        cli: "aws kms create-key --description lab-key --query KeyMetadata.KeyId --output text\naws kms create-alias --alias-name alias/lab-key --target-key-id KEY_ID\naws kms enable-key-rotation --key-id KEY_ID\naws kms get-key-rotation-status --key-id KEY_ID"
      },
      {
        title: "Mã hóa và giải mã bằng KMS",
        detail: "KMS Encrypt trực tiếp tối đa 4 KB dữ liệu; file lớn hơn dùng envelope encryption (GenerateDataKey). Kết quả giải mã phải ra đúng chuỗi ban đầu.",
        cli: "echo hello-java-dev > secret.txt\naws kms encrypt --key-id alias/lab-key --plaintext fileb://secret.txt --query CiphertextBlob --output text | base64 -d > secret.enc\naws kms decrypt --ciphertext-blob fileb://secret.enc --query Plaintext --output text | base64 -d\naws kms generate-data-key --key-id alias/lab-key --key-spec AES_256"
      },
      {
        title: "Parameter Store dạng cây thư mục",
        detail: "Lưu cấu hình theo đường dẫn <code>/prod/app/...</code>. Tham số mật dùng <strong>SecureString</strong> mã hóa bằng lab-key. Đọc theo path cho cả nhánh – Spring Cloud AWS có thể nạp nhánh này thành properties.",
        cli: "aws ssm put-parameter --name /prod/app/db-url --type String --value jdbc:mysql://db.internal:3306/shop\naws ssm put-parameter --name /prod/app/api-key --type SecureString --key-id alias/lab-key --value abc123xyz\naws ssm get-parameters-by-path --path /prod/app --with-decryption"
      },
      {
        title: "Secrets Manager cho mật khẩu DB",
        detail: "Console: <strong>Secrets Manager → Store a new secret → Other type of secret</strong> → Key/value: <code>username</code> = <code>admin</code>, <code>password</code> = <code>S3cr3t-Lab</code> → Encryption key: <code>alias/lab-key</code> → Secret name <code>lab/db</code>. Mở tab <strong>Rotation</strong> để xem: với loại secret RDS/Aurora/Redshift/DocumentDB có sẵn Lambda xoay vòng tự động (không bật trong lab).<br>Nếu dùng CLI, tạo file <code>creds.json</code> chứa <code>{&quot;username&quot;:&quot;admin&quot;,&quot;password&quot;:&quot;S3cr3t-Lab&quot;}</code>.",
        cli: "aws secretsmanager create-secret --name lab/db --kms-key-id alias/lab-key --secret-string file://creds.json\naws secretsmanager get-secret-value --secret-id lab/db --query SecretString --output text"
      },
      {
        title: "Đọc secret trong code Java",
        detail: "Với AWS SDK for Java v2: <code>SecretsManagerClient sm = SecretsManagerClient.create();<br>String json = sm.getSecretValue(GetSecretValueRequest.builder().secretId(&quot;lab/db&quot;).build()).secretString();</code><br>Chạy trên EC2/ECS/Lambda thì quyền đến từ IAM Role (cần <code>secretsmanager:GetSecretValue</code> và <code>kms:Decrypt</code> trên lab-key), không bao giờ hard-code Access Key."
      },
      {
        title: "Kiểm toán bằng CloudTrail",
        detail: "<strong>CloudTrail → Event history</strong> → Event source = <code>kms.amazonaws.com</code>: thấy các event <code>Decrypt</code>, <code>GenerateDataKey</code> phát sinh từ lệnh CLI và từ Secrets Manager/SSM thay mặt bạn."
      }
    ],
    verify: [
      "Lệnh decrypt in ra hello-java-dev",
      "get-parameters-by-path trả về api-key đã giải mã",
      "get-secret-value trả về JSON username/password",
      "CloudTrail có event Decrypt cho lab-key"
    ],
    cleanup: [
      "aws secretsmanager delete-secret --secret-id lab/db --force-delete-without-recovery",
      "aws ssm delete-parameters --names /prod/app/db-url /prod/app/api-key",
      "aws kms schedule-key-deletion --key-id KEY_ID --pending-window-in-days 7 (và xóa alias: aws kms delete-alias --alias-name alias/lab-key)",
      "rm secret.txt secret.enc creds.json"
    ],
    examLink: "Tự động xoay vòng mật khẩu DB không gián đoạn → Secrets Manager. Cấu hình phân cấp, rẻ nhất (miễn phí) → SSM Parameter Store (SecureString dùng KMS). Quản lý khóa, rotation, kiểm toán qua CloudTrail → KMS (FIPS 140-2 Level 2). Phần cứng chuyên dụng, tự giữ khóa, FIPS 140-2 Level 3 → CloudHSM (chỉ học lý thuyết, rất đắt)."
  },

  49: {
    title: "Bảo mật đa tầng: WAF trên ALB chặn SQLi/XSS, GuardDuty, Inspector và Macie",
    type: "console",
    duration: "60-75 phút",
    cost: "Có phí nhỏ: WAF 5 USD/Web ACL/tháng + 1 USD/rule/tháng tính theo giờ (vài cent nếu xóa trong ngày); ALB Free Tier 750 giờ hoặc ~0.0252 USD/giờ + phí IPv4. GuardDuty dùng thử 30 ngày, Inspector 15 ngày, Macie 30 ngày (job quét 1 GB đầu miễn phí). Shield Advanced 3.000 USD/tháng – KHÔNG bật.",
    goal: "Chứng minh WAF phải gắn lên ALB/CloudFront (không gắn EC2), chặn được SQL Injection/XSS/flood, và phân biệt GuardDuty – Inspector – Macie bằng findings thật.",
    prerequisites: [
      "Dùng <strong>Default VPC</strong> ở ap-southeast-1 cho nhanh (có sẵn public subnet ở nhiều AZ)",
      "Một EC2 Amazon Linux 2023 chạy httpd (user data như Lab 38) với role SSM, SG mở 80"
    ],
    steps: [
      {
        title: "Đặt ALB trước EC2",
        detail: "<strong>EC2 → Target Groups → Create</strong>: Instances, HTTP 80, tên <code>lab-tg</code>, đăng ký EC2. <strong>Load Balancers → Create → Application Load Balancer</strong>: <code>lab-alb</code>, Internet-facing, chọn ≥ 2 AZ của Default VPC, SG mở 80, Listener HTTP 80 → lab-tg. Đợi Active, mở <code>http://ALB_DNS</code>."
      },
      {
        title: "Tạo Web ACL với Managed Rules và Rate-based rule",
        detail: "<strong>WAF &amp; Shield → Web ACLs → Create web ACL</strong>: Resource type <strong>Regional resources</strong>, Region Asia Pacific (Singapore), tên <code>lab-webacl</code>, <strong>Add AWS resources</strong> → chọn <code>lab-alb</code>. Add rules → <strong>Add managed rule groups</strong> → AWS managed: <em>Core rule set</em> và <em>SQL database</em>. Add my own rules → <strong>Rate-based rule</strong> <code>rate-limit</code>, limit 100 / 5 phút, action Block. Default action Allow."
      },
      {
        title: "Tấn công thử SQLi và XSS",
        detail: "Từ CloudShell gửi request có payload đã URL-encode. Request bình thường trả 200, payload SQLi/XSS trả <strong>403 Forbidden</strong>. Xem <strong>Web ACL → Overview / Sampled requests</strong> để thấy rule nào chặn. Vòng lặp curl 300 lần sẽ kích hoạt rate-based rule sau vài chục giây.",
        cli: "curl -s -o /dev/null -w '%{http_code}' http://ALB_DNS/\ncurl -s -o /dev/null -w '%{http_code}' 'http://ALB_DNS/?id=1%27%20OR%20%271%27%3D%271'\ncurl -s -o /dev/null -w '%{http_code}' 'http://ALB_DNS/?q=%3Cscript%3Ealert(1)%3C/script%3E'\nfor i in $(seq 1 300); do curl -s -o /dev/null http://ALB_DNS/; done"
      },
      {
        title: "Shield: chỉ tham quan",
        detail: "<strong>WAF &amp; Shield → AWS Shield → Overview</strong>: Shield Standard đã bật sẵn miễn phí (DDoS L3/L4). Đọc mục Shield Advanced (đội SRT 24/7, bảo vệ chi phí scaling) – <strong>không subscribe</strong> vì cam kết 1 năm 3.000 USD/tháng."
      },
      {
        title: "GuardDuty: bật và tạo sample findings",
        detail: "<strong>GuardDuty → Get started → Enable GuardDuty</strong> (không cần agent, tự phân tích CloudTrail, VPC Flow Logs, DNS logs). Vào <strong>Settings → Sample findings → Generate sample findings</strong>. Mở tab Findings: xem ví dụ <code>CryptoCurrency:EC2/BitcoinTool.B!DNS</code>, mức Severity.",
        cli: "aws guardduty create-detector --enable\naws guardduty create-sample-findings --detector-id DETECTOR_ID"
      },
      {
        title: "Inspector: quét CVE trên EC2",
        detail: "<strong>Amazon Inspector → Get started → Activate Inspector</strong>. Inspector dùng SSM Agent để quét gói phần mềm EC2 (cộng ECR image và Lambda). Sau 10-30 phút xem <strong>Findings → By instance</strong> – các CVE của gói trên lab EC2 (nếu đã cập nhật đầy đủ có thể chỉ còn ít findings).",
        cli: "aws inspector2 enable --resource-types EC2 ECR LAMBDA"
      },
      {
        title: "Macie: tìm PII trong S3",
        detail: "Tạo bucket <code>lab-macie-ACCOUNTID</code>, upload file <code>customers.csv</code> chứa dữ liệu giả: tên, email và số thẻ test <code>4111 1111 1111 1111</code>. <strong>Amazon Macie → Get started → Enable Macie</strong> → <strong>Jobs → Create job</strong> → chọn bucket → One-time job → managed identifiers mặc định → Submit. Sau vài phút, Findings có loại <code>SensitiveData:S3Object/Financial</code>."
      }
    ],
    verify: [
      "Request thường trả 200, payload SQLi/XSS trả 403",
      "Sampled requests hiển thị rule AWS-AWSManagedRulesSQLiRuleSet/CommonRuleSet chặn",
      "GuardDuty có sample findings, Inspector có danh sách instance được quét, Macie phát hiện số thẻ tín dụng"
    ],
    cleanup: [
      "WAF: Web ACL → Associated AWS resources → Disassociate lab-alb, sau đó Delete web ACL",
      "Xóa lab-alb, lab-tg, terminate EC2",
      "GuardDuty → Settings → Disable GuardDuty (hoặc aws guardduty delete-detector --detector-id DETECTOR_ID)",
      "Inspector → General settings → Deactivate (aws inspector2 disable --resource-types EC2 ECR LAMBDA)",
      "Macie → Settings → Disable Macie; Empty và Delete bucket lab-macie-ACCOUNTID"
    ],
    examLink: "WAF chống SQLi/XSS/geo/rate-based ở L7, chỉ gắn CloudFront, ALB, API Gateway, AppSync, Cognito – web chạy thẳng trên EC2 thì phải đặt ALB/CloudFront phía trước. Shield: DDoS L3/L4 (Advanced có SRT + bảo vệ chi phí). GuardDuty: ML phân tích log phát hiện mối đe dọa. Inspector: CVE trên EC2/ECR/Lambda. Macie: PII trong S3."
  },

  50: {
    title: "Diễn tập Disaster Recovery Backup & Restore liên Region và thiết kế Pilot Light / Warm Standby / DMS",
    type: "console",
    duration: "60 phút",
    cost: "Vài cent: snapshot ~0.05 USD/GB-tháng mỗi Region, copy liên Region ~0.02 USD/GB (AMI 8 GB ≈ 0.16 USD), EC2 ở Region DR dùng t2.micro/t3.micro Free Tier. Xóa AMI/snapshot ngay sau lab.",
    goal: "Đo RTO thực tế của chiến lược Backup and Restore bằng cách copy AMI sang Sydney và dựng lại web, sau đó thiết kế các mức DR cao hơn và luồng migration DB bằng SCT + DMS.",
    prerequisites: [
      "Có EC2 web chạy httpd (Lab 38 hoặc 49) ở ap-southeast-1",
      "Đồng hồ bấm giờ để đo RTO"
    ],
    steps: [
      {
        title: "Xác định RTO/RPO mục tiêu",
        detail: "Giả định ứng dụng Spring Boot bán hàng: RPO = 24 giờ, RTO = 2 giờ, ngân sách thấp nhất → chọn <strong>Backup and Restore</strong>. Ghi bảng: Backup &amp; Restore (giờ) → Pilot Light (chục phút) → Warm Standby (phút) → Multi-Site Active/Active (gần 0) – chi phí tăng dần."
      },
      {
        title: "Tạo AMI (bản sao lưu)",
        detail: "<strong>EC2 → Instances → chọn web → Actions → Image and templates → Create image</strong>: tên <code>lab-web-ami</code>, bật <strong>No reboot</strong>. AMI kèm EBS snapshot. Bấm giờ bắt đầu khi giả lập Region Singapore sập.",
        cli: "aws ec2 create-image --instance-id i-xxxx --name lab-web-ami --no-reboot --region ap-southeast-1"
      },
      {
        title: "Copy AMI sang Region DR (Sydney)",
        detail: "<strong>EC2 → AMIs → chọn lab-web-ami → Actions → Copy AMI</strong> → Destination Region <strong>Asia Pacific (Sydney) ap-southeast-2</strong>, có thể bật Encrypt EBS snapshots. Chuyển Region sang Sydney, đợi AMI trạng thái Available.",
        cli: "aws ec2 copy-image --source-region ap-southeast-1 --source-image-id ami-xxxx --region ap-southeast-2 --name lab-web-ami-dr\naws ec2 describe-images --region ap-southeast-2 --image-ids ami-yyyy --query 'Images[0].State'"
      },
      {
        title: "Khôi phục ở Sydney và đo RTO",
        detail: "Ở ap-southeast-2: <strong>AMIs → lab-web-ami-dr → Launch instance from AMI</strong>, t2.micro/t3.micro, Default VPC, SG mở 80. Mở <code>http://PUBLIC_IP</code> → web chạy ngay (httpd đã được <code>systemctl enable</code> trong AMI, User Data không chạy lại). Dừng đồng hồ → đó là RTO của bạn. Thực tế còn cần đổi DNS bằng Route 53 Failover routing."
      },
      {
        title: "Thiết kế Pilot Light và Warm Standby",
        detail: "Vẽ 2 sơ đồ:<br>• <strong>Pilot Light</strong>: Sydney chỉ chạy Aurora Global Database secondary / RDS cross-region Read Replica; ASG web/app có desired = 0, AMI sẵn sàng; khi thảm họa: promote DB, scale ASG lên.<br>• <strong>Warm Standby</strong>: Sydney chạy đủ ALB + ASG (min 1 t3.micro) + DB replica, Route 53 Failover với Health Check; khi thảm họa: scale out.<br>• <strong>Active/Active</strong>: 2 Region đều phục vụ, Route 53 Latency + DynamoDB Global Tables / Aurora Global."
      },
      {
        title: "Thiết kế migration Oracle → Aurora PostgreSQL",
        detail: "Vẽ luồng: (1) <strong>AWS SCT</strong> chuyển schema, stored procedure Oracle sang PostgreSQL; (2) <strong>AWS DMS</strong> replication instance chạy <em>Full load + CDC</em> để DB nguồn vẫn hoạt động (near-zero downtime); (3) cut-over đổi chuỗi JDBC trong ứng dụng Java. Máy chủ ứng dụng on-prem dùng <strong>AWS MGN</strong> (lift-and-shift). Cùng hệ DB (MySQL → RDS MySQL) thì không cần SCT."
      }
    ],
    verify: [
      "Web ở Sydney hiển thị nội dung giống bản gốc",
      "Ghi được con số RTO thực tế (thường 15-30 phút với cách thủ công)",
      "Sơ đồ phân biệt rõ Pilot Light (app tắt) và Warm Standby (bản thu nhỏ chạy sẵn)"
    ],
    cleanup: [
      "Sydney: terminate instance, Deregister AMI lab-web-ami-dr, xóa snapshot tương ứng (EC2 → Snapshots)",
      "Singapore: Deregister lab-web-ami và xóa snapshot của nó",
      "Chuyển Region về ap-southeast-1"
    ],
    examLink: "RTO = thời gian gián đoạn, RPO = lượng dữ liệu mất. Rẻ nhất, giờ → Backup and Restore. Chỉ DB chạy, app tắt → Pilot Light. Bản thu nhỏ toàn hệ thống chạy sẵn → Warm Standby. Gần 0 → Multi-Site Active/Active. DB khác hệ → SCT rồi DMS; cùng hệ → DMS (full load + CDC). Lift-and-shift server → MGN."
  },

  51: {
    title: "Deploy Spring Boot lên Elastic Beanstalk, IaC với CloudFormation và kiểm soát chi phí",
    type: "console",
    duration: "60 phút",
    cost: "Miễn phí nếu dùng preset Single instance (t3.micro/t2.micro Free Tier, Public IPv4 trong 750 giờ miễn phí). CloudFormation, Budgets (2 budget đầu), Compute Optimizer miễn phí. Cost Explorer UI miễn phí (API 0.01 USD/request).",
    goal: "Đưa file .jar lên Beanstalk trong vài phút, nhận ra Beanstalk thực chất tạo một CloudFormation stack, tự viết template CloudFormation và phát hiện drift, rồi đặt Budget cảnh báo chi phí.",
    prerequisites: [
      "JDK 17/21 và Maven; project Spring Boot Web từ start.spring.io",
      "Controller đơn giản: <code>@RestController class Hello { @GetMapping(&quot;/&quot;) String hi() { return &quot;Hello Beanstalk&quot;; } }</code>",
      "Trong <code>application.properties</code>: <code>server.port=5000</code> (nginx của Beanstalk Java SE proxy về cổng 5000)"
    ],
    steps: [
      {
        title: "Build file jar",
        detail: "Chạy Maven để tạo <code>target/demo-0.0.1-SNAPSHOT.jar</code>. Thử chạy local và mở http://localhost:5000.",
        cli: "mvn -q clean package -DskipTests\njava -jar target/demo-0.0.1-SNAPSHOT.jar"
      },
      {
        title: "Tạo môi trường Elastic Beanstalk",
        detail: "<strong>Elastic Beanstalk → Create application</strong>: Environment tier <strong>Web server</strong>, App name <code>lab-eb</code>, Platform <strong>Java</strong>, branch <em>Corretto 21 running on 64bit Amazon Linux 2023</em>, Application code: <strong>Upload your code</strong> → chọn file jar, Presets: <strong>Single instance (free tier eligible)</strong>. Service role: <em>Create and use new service role</em>; EC2 instance profile: chọn hoặc tạo role <code>aws-elasticbeanstalk-ec2-role</code> (IAM → Roles → EC2 → policy AWSElasticBeanstalkWebTier). Đợi Health = Ok (~5 phút), mở URL môi trường."
      },
      {
        title: "Nhìn bên dưới: Beanstalk dùng CloudFormation",
        detail: "Vào <strong>CloudFormation → Stacks</strong>: thấy stack <code>awseb-e-xxxx-stack</code> do Beanstalk tạo, tab Resources liệt kê EC2, SG, EIP... Upload bản jar mới (đổi chuỗi trả về) qua <strong>Upload and deploy</strong> để thấy deployment rolling/all-at-once."
      },
      {
        title: "Tự viết template CloudFormation",
        detail: "Tạo file <code>bucket.yaml</code>:<br><code>AWSTemplateFormatVersion: '2010-09-09'<br>Resources:<br>&nbsp;&nbsp;LabBucket:<br>&nbsp;&nbsp;&nbsp;&nbsp;Type: AWS::S3::Bucket<br>&nbsp;&nbsp;&nbsp;&nbsp;Properties:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;VersioningConfiguration:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Status: Enabled<br>Outputs:<br>&nbsp;&nbsp;BucketName:<br>&nbsp;&nbsp;&nbsp;&nbsp;Value: !Ref LabBucket</code><br>Deploy bằng CLI hoặc <strong>CloudFormation → Create stack → Upload a template file</strong>, stack name <code>lab-cfn</code>.",
        cli: "aws cloudformation deploy --template-file bucket.yaml --stack-name lab-cfn --region ap-southeast-1\naws cloudformation describe-stacks --stack-name lab-cfn --query 'Stacks[0].Outputs'"
      },
      {
        title: "Phát hiện Drift",
        detail: "Vào bucket vừa tạo → Properties → Bucket Versioning → <strong>Suspend</strong> (sửa tay ngoài IaC). Quay lại stack <code>lab-cfn</code> → <strong>Stack actions → Detect drift</strong> → View drift results: LabBucket = <strong>MODIFIED</strong>. Bài học: mọi thay đổi nên đi qua template.",
        cli: "aws cloudformation detect-stack-drift --stack-name lab-cfn"
      },
      {
        title: "Budgets, Cost Explorer và Compute Optimizer",
        detail: "<strong>Billing and Cost Management → Budgets → Create budget</strong> → Template <em>Monthly cost budget</em> 5 USD, email của bạn. <strong>Cost Explorer</strong>: xem chi phí theo Service, bật Forecast. <strong>Compute Optimizer → Get started → Opt in</strong> (cần khoảng 30 giờ metric mới có khuyến nghị right-sizing cho EC2/EBS/Lambda).",
        cli: "aws compute-optimizer update-enrollment-status --status Active"
      }
    ],
    verify: [
      "URL Beanstalk trả về Hello Beanstalk, Health màu xanh",
      "Có stack awseb-e-xxxx-stack trong CloudFormation",
      "Stack lab-cfn có Output BucketName và Drift status DRIFTED sau khi sửa tay",
      "Budget 5 USD hiển thị trong danh sách"
    ],
    cleanup: [
      "Elastic Beanstalk → Environments → chọn môi trường → Actions → Terminate environment; sau đó Delete application lab-eb",
      "Xóa bucket storage <code>elasticbeanstalk-ap-southeast-1-ACCOUNTID</code> nếu không dùng (phải xóa bucket policy trước)",
      "aws cloudformation delete-stack --stack-name lab-cfn (bucket rỗng nên xóa được)",
      "GIỮ LẠI Budget để cảnh báo chi phí"
    ],
    examLink: "Developer muốn đưa web Java lên nhanh, AWS tự lo EC2/ASG/ALB/health mà không tự lắp ghép → Elastic Beanstalk. Nhân bản hạ tầng sang Region/account khác, không sai sót tay → CloudFormation (StackSets cho nhiều account). Gợi ý hạ cấu hình EC2/EBS/Lambda thừa → Compute Optimizer. Cảnh báo vượt ngân sách → Budgets; xem/dự báo chi phí → Cost Explorer."
  },

  52: {
    title: "Capstone Storage & Database: bài tập ra quyết định cho hệ thống thương mại điện tử Java",
    type: "design",
    duration: "45-60 phút",
    cost: "Miễn phí (bài tập trên giấy; bước kiểm chứng tùy chọn dùng S3 Free Tier)",
    goal: "Rèn phản xạ chọn đúng dịch vụ lưu trữ/CSDL theo từ khóa đề thi bằng cách giải 16 tình huống và thiết kế lớp dữ liệu hoàn chỉnh cho một ứng dụng Spring Boot.",
    prerequisites: [
      "Mở tab Bảng So Sánh Dịch Vụ (S3 classes, EBS/EFS/FSx/Instance Store, RDS/Aurora/DynamoDB)",
      "Giấy hoặc bảng tính với 4 cột: Tình huống | Từ khóa | Dịch vụ chọn | Lý do loại đáp án khác"
    ],
    steps: [
      {
        title: "Nhóm 1 – S3 Storage Classes",
        detail: "Tự trả lời trước, sau đó đối chiếu:<br>1) Ảnh thumbnail tạo lại được, ít truy cập → <strong>S3 One Zone-IA</strong><br>2) Hồ sơ lưu 7 năm, chấp nhận chờ 12 giờ → <strong>Glacier Deep Archive</strong><br>3) Ảnh X-quang hiếm xem nhưng cần mở ngay mili-giây → <strong>Glacier Instant Retrieval</strong><br>4) Không đoán được tần suất truy cập → <strong>S3 Intelligent-Tiering</strong>"
      },
      {
        title: "Nhóm 2 – Block, File, Ephemeral",
        detail: "5) DB tự quản trên EC2 cần 40.000 IOPS → <strong>EBS io2</strong> (gp3 tối đa 16.000)<br>6) Giảm chi phí gp2 mà vẫn chỉnh IOPS độc lập → <strong>gp3</strong><br>7) Nhiều EC2 Linux ở nhiều AZ cùng đọc ghi thư mục upload → <strong>EFS</strong><br>8) File share Windows SMB + Active Directory → <strong>FSx for Windows File Server</strong><br>9) HPC/ML hàng trăm GB/s, tích hợp S3 → <strong>FSx for Lustre</strong><br>10) Cache tạm IOPS cực cao, mất khi stop cũng được → <strong>Instance Store</strong>"
      },
      {
        title: "Nhóm 3 – Database",
        detail: "11) Báo cáo cuối ngày làm chậm RDS → <strong>Read Replica</strong> (không phải Multi-AZ)<br>12) Tự failover khi mất 1 AZ, không mất dữ liệu → <strong>RDS Multi-AZ</strong><br>13) Hàng nghìn Lambda làm cạn kết nối DB → <strong>RDS Proxy</strong><br>14) Giỏ hàng/session, tải đột biến không đoán trước, key-value → <strong>DynamoDB On-Demand</strong> (+ TTL xóa session cũ miễn phí)<br>15) Đọc DynamoDB độ trễ micro-giây không sửa logic → <strong>DAX</strong><br>16) Bảng xếp hạng game, cache có Multi-AZ → <strong>ElastiCache for Redis</strong>"
      },
      {
        title: "Thiết kế lớp dữ liệu cho shop Spring Boot",
        detail: "Yêu cầu: catalog sản phẩm, đơn hàng giao dịch ACID, giỏ hàng/session, ảnh sản phẩm, log truy cập phân tích hàng tháng, quan hệ gợi ý sản phẩm, toàn cầu 2 Region. Vẽ sơ đồ và chọn:<br>• Đơn hàng → <strong>Aurora MySQL</strong> (Multi-AZ, Reader Endpoint, Global Database cho DR)<br>• Session/giỏ hàng → <strong>ElastiCache Redis</strong> hoặc DynamoDB + TTL<br>• Ảnh → <strong>S3</strong> + CloudFront (OAC), lifecycle sang Standard-IA sau 30 ngày<br>• Log → S3 → <strong>Athena</strong> (Parquet), lifecycle Glacier<br>• Gợi ý → <strong>Neptune</strong>; tìm kiếm full-text → <strong>OpenSearch</strong>"
      },
      {
        title: "Kiểm chứng một quyết định bằng Lifecycle (tùy chọn)",
        detail: "Tạo bucket test → <strong>Management → Create lifecycle rule</strong>: prefix <code>images/</code>, Transition sang <strong>Standard-IA sau 30 ngày</strong>, <strong>Glacier Flexible Retrieval sau 90 ngày</strong>, Expire noncurrent versions sau 365 ngày. Đọc cảnh báo console về phí transition và thời gian lưu tối thiểu (IA 30 ngày, Glacier 90, Deep Archive 180). Xóa bucket sau khi xem."
      },
      {
        title: "Tự chấm điểm và ghi Anki",
        detail: "Đếm số câu đúng trong 16 câu. Câu sai nào → tạo thẻ trong tab Luyện Thẻ Anki với mặt trước là <em>từ khóa đề</em>, mặt sau là <em>dịch vụ + lý do loại đáp án gây nhiễu</em>. Mục tiêu ≥ 14/16 trước khi sang Session 53."
      }
    ],
    verify: [
      "Đúng ít nhất 14/16 tình huống",
      "Sơ đồ lớp dữ liệu có lý do cho từng lựa chọn và chỉ ra đáp án gây nhiễu",
      "Các câu sai đã được chuyển thành thẻ Anki"
    ],
    cleanup: [
      "Xóa bucket test lifecycle (nếu đã tạo)"
    ],
    examLink: "Bẫy hay gặp: Multi-AZ không giảm tải đọc; IOPS > 16.000 bắt buộc io1/io2; Windows/SMB → FSx Windows chứ không phải EFS; dữ liệu tạo lại được → One Zone-IA; Snowball không ghi thẳng vào Glacier; xóa dữ liệu hết hạn DynamoDB rẻ nhất → TTL."
  },

  53: {
    title: "Capstone VPC 2 tầng: ALB public + EC2 private + S3 Gateway Endpoint (không NAT Gateway)",
    type: "console",
    duration: "75-90 phút",
    cost: "Gần như miễn phí: EC2 t2.micro/t3.micro Free Tier, S3 Gateway Endpoint miễn phí, KHÔNG dùng NAT Gateway. ALB: Free Tier 750 giờ/tháng (nếu account còn hạn) hoặc ~0.0252 USD/giờ + LCU + phí Public IPv4 của ALB (~0.005 USD/giờ/IP). Xóa ngay sau lab, tổng thường dưới 0.2 USD.",
    goal: "Dựng kiến trúc chuẩn đề thi: người dùng chỉ vào được qua ALB ở public subnet, EC2 nằm trong private subnet không có Public IP, tải cấu hình từ S3 qua Gateway Endpoint thay vì NAT.",
    prerequisites: [
      "Đã làm các lab VPC 37-41, Load Balancer và IAM Role",
      "Region ap-southeast-1, Budget cảnh báo đang bật"
    ],
    steps: [
      {
        title: "Chuẩn bị S3 và IAM Role",
        detail: "Tạo bucket <code>lab-2tier-ACCOUNTID</code>, upload file <code>index.html</code> chứa dòng chữ <code>Served from HOST via S3 Gateway Endpoint</code> (chữ HOST sẽ được thay bằng hostname). Tạo role <code>lab2t-ec2-role</code> (EC2) với policy <code>AmazonS3ReadOnlyAccess</code> và <code>AmazonSSMManagedInstanceCore</code>.",
        cli: "aws s3 mb s3://lab-2tier-ACCOUNTID --region ap-southeast-1\naws s3 cp index.html s3://lab-2tier-ACCOUNTID/index.html"
      },
      {
        title: "Tạo VPC bằng wizard VPC and more",
        detail: "<strong>VPC → Create VPC → VPC and more</strong>: Name auto-generate <code>lab2t</code>, IPv4 <code>10.20.0.0/16</code>, Number of AZs <strong>2</strong>, Public subnets <strong>2</strong>, Private subnets <strong>2</strong>, NAT gateways <strong>None</strong>, VPC endpoints <strong>S3 Gateway</strong>, bật DNS hostnames/resolution. Xem Preview: wizard tự tạo IGW, public route table, 2 private route table đã gắn endpoint S3."
      },
      {
        title: "Tạo 2 Security Group theo kiểu tham chiếu",
        detail: "<code>lab2t-alb-sg</code>: Inbound HTTP 80 từ <code>0.0.0.0/0</code>.<br><code>lab2t-web-sg</code>: Inbound HTTP 80 với Source = <strong>Security Group lab2t-alb-sg</strong> (không dùng IP). Không mở cổng 22 nào."
      },
      {
        title: "Launch 2 EC2 trong 2 Private Subnet",
        detail: "Launch 2 instance <code>lab2t-web-a</code>, <code>lab2t-web-b</code>: Amazon Linux 2023, t2.micro/t3.micro, không key pair, mỗi cái ở 1 private subnet (AZ khác nhau), Auto-assign public IP <strong>Disable</strong>, SG <code>lab2t-web-sg</code>, IAM profile <code>lab2t-ec2-role</code>, User data bên dưới. Kho gói của Amazon Linux 2023 nằm trên S3 nên <code>dnf install</code> chạy được qua Gateway Endpoint mà không cần NAT.",
        cli: "#!/bin/bash\ndnf install -y httpd\naws s3 cp s3://lab-2tier-ACCOUNTID/index.html /var/www/html/index.html --region ap-southeast-1\nsed -i s/HOST/$(hostname -f)/ /var/www/html/index.html\nsystemctl enable --now httpd"
      },
      {
        title: "Tạo Target Group và ALB ở Public Subnet",
        detail: "<strong>EC2 → Target groups → Create</strong>: Instances, HTTP 80, VPC lab2t-vpc, health check path <code>/</code>, đăng ký 2 instance → <code>lab2t-tg</code>. <strong>Load balancers → Create ALB</strong>: <code>lab2t-alb</code>, Internet-facing, VPC lab2t-vpc, chọn <strong>2 public subnet</strong>, SG <code>lab2t-alb-sg</code>, Listener HTTP 80 → lab2t-tg. Đợi target Healthy."
      },
      {
        title: "Kiểm chứng kiến trúc",
        detail: "Mở <code>http://ALB_DNS</code> và F5 nhiều lần: hostname luân phiên giữa 2 instance (ip-10-20-128-x / ip-10-20-144-x). Kiểm tra private route table: có route <code>pl-xxxx → vpce-xxxx</code>, không có 0.0.0.0/0. Instance không có Public IPv4 → không thể truy cập trực tiếp từ Internet. Stop 1 instance → ALB vẫn phục vụ bằng instance còn lại.",
        cli: "for i in 1 2 3 4 5 6; do curl -s http://ALB_DNS/; echo; done"
      }
    ],
    verify: [
      "Trang web hiển thị Served from ip-10-20-... via S3 Gateway Endpoint, hostname luân phiên",
      "Target group có 2 target Healthy",
      "Private route table chỉ có local + prefix list S3, không có NAT",
      "EC2 không có Public IP"
    ],
    cleanup: [
      "Xóa ALB <code>lab2t-alb</code> trước, rồi Target group <code>lab2t-tg</code>",
      "Terminate 2 EC2",
      "VPC → Your VPCs → lab2t-vpc → Delete VPC (xóa luôn subnet, IGW, route table, S3 endpoint; xóa SG trước nếu bị báo phụ thuộc)",
      "Empty và Delete bucket lab-2tier-ACCOUNTID, xóa role lab2t-ec2-role"
    ],
    examLink: "Kiến trúc chuẩn: ALB ở public subnet, EC2/DB ở private subnet, SG tầng web tham chiếu SG của ALB. EC2 private cần S3/DynamoDB → Gateway Endpoint (miễn phí) thay vì NAT. Cần Internet chung (gọi API bên ngoài) mới phải thêm NAT Gateway mỗi AZ. Cross-zone LB trên ALB bật sẵn miễn phí."
  },

  54: {
    title: "Capstone Serverless: API Gateway → Lambda → SQS → Lambda → DynamoDB có Dead Letter Queue",
    type: "console",
    duration: "75-90 phút",
    cost: "Gần như 0 USD: API Gateway HTTP API (Free Tier 1 triệu request/tháng 12 tháng đầu), Lambda (1 triệu request miễn phí vĩnh viễn), SQS (1 triệu request miễn phí), DynamoDB On-Demand chỉ vài phần nghìn cent cho lab.",
    goal: "Xây pipeline đặt hàng tách rời (decoupled): API nhận đơn trả về 202 ngay, SQS đệm tải, Lambda consumer ghi DynamoDB, message lỗi tự chuyển vào DLQ.",
    prerequisites: [
      "Code Lambda dùng Python 3.12 cho nhanh (cùng kiến trúc có thể viết bằng Java 21 + SnapStart)",
      "CloudShell ở ap-southeast-1 để test bằng curl"
    ],
    steps: [
      {
        title: "Tạo bảng DynamoDB Orders",
        detail: "<strong>DynamoDB → Tables → Create table</strong>: Name <code>Orders</code>, Partition key <code>orderId</code> (String), Table settings Customize → Capacity mode <strong>On-demand</strong>.",
        cli: "aws dynamodb create-table --table-name Orders --attribute-definitions AttributeName=orderId,AttributeType=S --key-schema AttributeName=orderId,KeyType=HASH --billing-mode PAY_PER_REQUEST"
      },
      {
        title: "Tạo SQS queue chính và DLQ",
        detail: "<strong>SQS → Create queue</strong>: Standard, <code>orders-dlq</code>. Tạo tiếp <code>orders-queue</code>: Standard, <strong>Visibility timeout 60 giây</strong> (≥ 6 lần timeout Lambda 10s), mục <strong>Dead-letter queue</strong> → Enabled → chọn <code>orders-dlq</code>, <strong>Maximum receives 3</strong>.",
        cli: "aws sqs create-queue --queue-name orders-dlq\naws sqs create-queue --queue-name orders-queue --attributes VisibilityTimeout=60"
      },
      {
        title: "Lambda producer + HTTP API",
        detail: "<strong>Lambda → Create function</strong> <code>orders-producer</code>, Python 3.12. Code:<br><code>import json, os, boto3<br>sqs = boto3.client('sqs')<br>def lambda_handler(event, context):<br>&nbsp;&nbsp;&nbsp;&nbsp;body = event.get('body') or '{}'<br>&nbsp;&nbsp;&nbsp;&nbsp;sqs.send_message(QueueUrl=os.environ['QUEUE_URL'], MessageBody=body)<br>&nbsp;&nbsp;&nbsp;&nbsp;return {'statusCode': 202, 'body': json.dumps({'status': 'queued'})}</code><br>Configuration → Environment variables: <code>QUEUE_URL</code> = URL của orders-queue. Permissions → role → Add permissions → inline policy cho phép <code>sqs:SendMessage</code> trên orders-queue.<br>Sau đó <strong>API Gateway → Create API → HTTP API → Build</strong>: Integration Lambda <code>orders-producer</code>, route <code>POST /orders</code>, stage <code>$default</code> auto-deploy. Ghi lại Invoke URL."
      },
      {
        title: "Lambda consumer với SQS trigger",
        detail: "Tạo <code>orders-consumer</code>, Python 3.12, timeout 10s. Code:<br><code>import json, os, uuid, boto3<br>from decimal import Decimal<br>table = boto3.resource('dynamodb').Table(os.environ['TABLE_NAME'])<br>def lambda_handler(event, context):<br>&nbsp;&nbsp;&nbsp;&nbsp;for r in event['Records']:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;order = json.loads(r['body'], parse_float=Decimal)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;order.setdefault('orderId', str(uuid.uuid4()))<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;table.put_item(Item=order)</code><br>Env <code>TABLE_NAME</code> = <code>Orders</code>. Role: gắn <code>AWSLambdaSQSQueueExecutionRole</code> + inline <code>dynamodb:PutItem</code> trên bảng Orders. <strong>Add trigger → SQS</strong> → orders-queue, Batch size 10."
      },
      {
        title: "Gửi đơn hàng hợp lệ",
        detail: "Trong CloudShell tạo file <code>order.json</code> có nội dung <code>{&quot;customer&quot;:&quot;dat&quot;,&quot;item&quot;:&quot;java-book&quot;,&quot;amount&quot;:19.99}</code>, rồi gọi API. Nhận ngay HTTP 202 – sau 1-2 giây đơn xuất hiện trong bảng Orders (DynamoDB → Explore items).",
        cli: "curl -i -X POST https://API_ID.execute-api.ap-southeast-1.amazonaws.com/orders -H 'Content-Type: application/json' -d @order.json\naws dynamodb scan --table-name Orders --max-items 5"
      },
      {
        title: "Gửi message lỗi và quan sát DLQ",
        detail: "Gửi body không phải JSON. Consumer ném lỗi → message hiện lại sau mỗi 60 giây visibility timeout → sau 3 lần nhận thất bại SQS chuyển sang <code>orders-dlq</code> (~3-4 phút). Kiểm tra SQS console: orders-dlq có 1 message; CloudWatch Logs của orders-consumer có JSONDecodeError. Có thể dùng nút <strong>Start DLQ redrive</strong> để đẩy lại sau khi sửa lỗi.",
        cli: "curl -i -X POST https://API_ID.execute-api.ap-southeast-1.amazonaws.com/orders -d not-a-json\naws sqs get-queue-attributes --queue-url DLQ_URL --attribute-names ApproximateNumberOfMessages"
      }
    ],
    verify: [
      "API trả HTTP 202 với body status queued",
      "Bảng Orders có item với orderId tự sinh",
      "Message lỗi nằm trong orders-dlq sau 3 lần thử, queue chính không bị tắc"
    ],
    cleanup: [
      "Xóa HTTP API trong API Gateway",
      "Xóa trigger SQS và 2 Lambda (orders-producer, orders-consumer) cùng IAM role và log group /aws/lambda/...",
      "Xóa orders-queue và orders-dlq",
      "aws dynamodb delete-table --table-name Orders"
    ],
    examLink: "Tách rời producer/consumer, đệm tải đột biến → SQS. Xử lý trùng lặp do consumer chậm → tăng Visibility Timeout. Message lỗi lặp lại làm tắc queue → DLQ. 1 sự kiện cho nhiều consumer độc lập → SNS + SQS fan-out. Cần thứ tự + exactly-once → FIFO. Tác vụ > 15 phút → không dùng Lambda, chuyển ECS Fargate/Batch. Điều phối nhiều bước, retry, chờ duyệt → Step Functions."
  },

  55: {
    title: "Capstone Security & DR baseline: CloudTrail + AWS Config + GuardDuty + AWS Backup liên Region",
    type: "console",
    duration: "75-90 phút",
    cost: "Vài cent đến dưới 1 USD: trail quản lý đầu tiên miễn phí (chỉ trả S3), Config ~0.003 USD/configuration item + 0.001 USD/lần đánh giá, GuardDuty dùng thử 30 ngày, AWS Backup snapshot EBS ~0.05 USD/GB-tháng + phí copy liên Region ~0.02 USD/GB. Xóa recovery point ngay sau lab.",
    goal: "Dựng bộ nền tảng bảo mật và DR tối thiểu cho một account production: ghi mọi API, kiểm tra tuân thủ, phát hiện mối đe dọa có cảnh báo, sao lưu tự động có bản copy ở Region khác.",
    prerequisites: [
      "Có một EC2 hoặc EBS volume nhỏ để sao lưu (EBS gp3 1 GiB là đủ)",
      "SNS topic <code>lab-alerts</code> có email đã xác nhận (Lab 46) hoặc tạo mới"
    ],
    steps: [
      {
        title: "CloudTrail trail lưu lâu dài",
        detail: "<strong>CloudTrail → Trails → Create trail</strong>: tên <code>org-baseline-trail</code>, Storage: tạo S3 bucket mới, <strong>Log file SSE-KMS encryption</strong>: tắt cho lab (bật trong thực tế), <strong>Log file validation</strong>: Enabled. Events: Management events Read + Write. Trail tạo từ console mặc định là multi-region. Event history chỉ giữ 90 ngày – trail giúp lưu S3 lâu dài để kiểm toán.",
        cli: "aws cloudtrail create-trail --name org-baseline-trail --s3-bucket-name lab-trail-ACCOUNTID --is-multi-region-trail --enable-log-file-validation\naws cloudtrail start-logging --name org-baseline-trail"
      },
      {
        title: "AWS Config với bộ rule tối thiểu",
        detail: "<strong>AWS Config → Settings</strong>: bật recording cho <em>Specific resource types</em>: <code>AWS::EC2::Volume</code>, <code>AWS::EC2::SecurityGroup</code>, <code>AWS::S3::Bucket</code>. <strong>Rules → Add rule</strong> các AWS managed rules: <code>encrypted-volumes</code>, <code>restricted-ssh</code>, <code>s3-bucket-public-read-prohibited</code>, <code>cloudtrail-enabled</code>. Xem <strong>Dashboard → Compliance status</strong>; một EBS chưa mã hóa sẽ bị Noncompliant."
      },
      {
        title: "GuardDuty + EventBridge cảnh báo email",
        detail: "Bật GuardDuty (nếu chưa). <strong>EventBridge → Rules → Create rule</strong> <code>guardduty-to-sns</code>: Event source AWS events, Creation method <strong>Use pattern form</strong> → AWS service <strong>GuardDuty</strong> → Event type <strong>GuardDuty Finding</strong>. Target: SNS topic <code>lab-alerts</code>. Sau đó <strong>GuardDuty → Settings → Generate sample findings</strong> → bạn nhận email cảnh báo trong vài phút.",
        cli: "aws guardduty create-detector --enable\naws guardduty create-sample-findings --detector-id DETECTOR_ID"
      },
      {
        title: "AWS Backup plan có copy sang Sydney",
        detail: "Đổi Region sang ap-southeast-2, <strong>AWS Backup → Backup vaults → Create</strong> <code>lab-vault-dr</code>. Về ap-southeast-1: tạo vault <code>lab-vault</code>. <strong>Backup plans → Create backup plan → Build a new plan</strong>: <code>lab-daily</code>, rule <code>daily-35d</code>: vault lab-vault, frequency Daily, retention 35 days, <strong>Copy to destination</strong>: Asia Pacific (Sydney) → lab-vault-dr. <strong>Assign resources</strong>: Default role, Include specific resource types hoặc <strong>tag</strong> <code>backup = daily</code>.",
        cli: "aws backup create-backup-vault --backup-vault-name lab-vault-dr --region ap-southeast-2\naws backup create-backup-vault --backup-vault-name lab-vault --region ap-southeast-1"
      },
      {
        title: "Chạy backup thử và diễn tập restore",
        detail: "Gắn tag <code>backup=daily</code> vào EBS volume. Không chờ lịch: <strong>Protected resources → Create on-demand backup</strong> → chọn volume, vault lab-vault, role Default → đợi job Completed. Mở recovery point → <strong>Copy</strong> sang ap-southeast-2 / lab-vault-dr để thấy bản DR. Thử <strong>Restore</strong> recovery point thành volume mới ở AZ khác → kiểm tra volume Available.",
        cli: "aws backup start-backup-job --backup-vault-name lab-vault --resource-arn arn:aws:ec2:ap-southeast-1:ACCOUNTID:volume/vol-xxxx --iam-role-arn arn:aws:iam::ACCOUNTID:role/service-role/AWSBackupDefaultServiceRole\naws backup list-recovery-points-by-backup-vault --backup-vault-name lab-vault"
      },
      {
        title: "Tổng kiểm tra baseline",
        detail: "Đánh dấu checklist: (1) Trail ghi log vào S3 sau 5-15 phút (<code>AWSLogs/ACCOUNTID/CloudTrail/...</code>); (2) Config có rule Noncompliant được giải thích; (3) Email GuardDuty đã về; (4) Recovery point có ở cả Singapore và Sydney; (5) Ghi RPO = 24 giờ (backup hằng ngày), RTO = thời gian restore đo được → đây là mức <strong>Backup and Restore</strong>."
      }
    ],
    verify: [
      "S3 bucket của trail có file log .json.gz và file digest (log validation)",
      "Config Dashboard hiển thị trạng thái 4 rule",
      "Nhận email từ EventBridge khi tạo sample findings",
      "Recovery point tồn tại ở lab-vault và lab-vault-dr, restore volume thành công"
    ],
    cleanup: [
      "AWS Backup: xóa recovery point trong lab-vault và lab-vault-dr, xóa backup plan lab-daily (xóa resource assignment trước), xóa 2 vault; xóa volume đã restore",
      "EventBridge: xóa rule guardduty-to-sns; GuardDuty → Settings → Disable",
      "Config: xóa 4 rule, tắt recording (aws configservice stop-configuration-recorder --configuration-recorder-name default), có thể xóa recorder và delivery channel",
      "CloudTrail: Stop logging và Delete trail, Empty và Delete bucket log"
    ],
    examLink: "Ai làm gì, khi nào → CloudTrail (trail multi-region + log file validation chống sửa log). Kiểm tra tuân thủ cấu hình → Config rules (+ auto-remediation). Phát hiện mối đe dọa không cần agent → GuardDuty, tự động phản ứng bằng EventBridge. Sao lưu tập trung, chính sách theo tag, copy liên Region/account → AWS Backup (Vault Lock cho WORM). KMS vs CloudHSM, Secrets Manager vs Parameter Store, WAF (L7) vs Shield (L3/4) vs NACL (chặn IP)."
  }
});
