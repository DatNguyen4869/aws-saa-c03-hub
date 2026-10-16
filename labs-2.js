window.LAB_DATA = window.LAB_DATA || {};
Object.assign(window.LAB_DATA, {
  20: {
    title: "RDS MySQL + Read Replica cho ứng dụng Spring Boot",
    type: "console",
    duration: "45-60 phút",
    cost: "Free Tier cho 1 instance db.t4g.micro Single-AZ (750 giờ/tháng). Read Replica là instance thứ 2 → cộng dồn giờ, có thể phát sinh vài cent; Multi-AZ KHÔNG thuộc Free Tier (chỉ làm bước tùy chọn rồi xóa ngay).",
    goal: "Tạo RDS MySQL, tạo Read Replica và cấu hình Spring Boot tách luồng ghi (Primary) và đọc báo cáo (Replica); hiểu rõ khác biệt Read Replica (async, đọc được) và Multi-AZ (sync, standby không đọc được).",
    prerequisites: ["Tài khoản AWS, region ap-southeast-1 (Singapore)", "Đã bật AWS Budgets cảnh báo $1-3", "Một EC2 Amazon Linux 2023 (t2.micro/t3.micro) trong default VPC để làm client", "Biết cấu hình spring.datasource trong Spring Boot"],
    steps: [
      { title: "Tạo Security Group cho DB", detail: "Vào <strong>EC2 → Security Groups → Create security group</strong>, tên <code>sg-rds-mysql</code>. Inbound: <strong>MySQL/Aurora (3306)</strong>, Source = <strong>Security Group của EC2 client</strong> (SG referencing, không điền IP).", cli: "aws ec2 create-security-group --group-name sg-rds-mysql --description 'RDS MySQL lab' --region ap-southeast-1\naws ec2 authorize-security-group-ingress --group-id <sg-rds-id> --protocol tcp --port 3306 --source-group <sg-ec2-id>" },
      { title: "Tạo RDS MySQL Primary", detail: "<strong>RDS → Databases → Create database</strong> → Standard create → <strong>MySQL 8.0</strong> → Template <strong>Free tier</strong> → DB identifier <code>saa-mysql</code>, master user <code>admin</code>, chọn <strong>Managed in AWS Secrets Manager</strong> hoặc tự đặt mật khẩu → Instance <code>db.t4g.micro</code>, 20 GiB gp3 → Public access <strong>No</strong> → VPC SG chọn <code>sg-rds-mysql</code> → Additional configuration: Initial database name <code>appdb</code>, <strong>Backup retention ≥ 1 ngày</strong> (bắt buộc để tạo Read Replica).", cli: "aws rds create-db-instance --db-instance-identifier saa-mysql --engine mysql --db-instance-class db.t4g.micro --allocated-storage 20 --storage-type gp3 --master-username admin --master-user-password 'ChangeMe123!' --db-name appdb --backup-retention-period 1 --no-multi-az --no-publicly-accessible --vpc-security-group-ids <sg-rds-id> --region ap-southeast-1\naws rds wait db-instance-available --db-instance-identifier saa-mysql" },
      { title: "Tạo Read Replica", detail: "Chọn <code>saa-mysql</code> → <strong>Actions → Create read replica</strong> → identifier <code>saa-mysql-replica</code>, class <code>db.t4g.micro</code>, cùng region, Public access No. Chờ trạng thái <strong>Available</strong> (~10 phút). Ghi lại 2 endpoint khác nhau: Primary và Replica.", cli: "aws rds create-db-instance-read-replica --db-instance-identifier saa-mysql-replica --source-db-instance-identifier saa-mysql --db-instance-class db.t4g.micro\naws rds describe-db-instances --query 'DBInstances[].[DBInstanceIdentifier,Endpoint.Address,ReadReplicaSourceDBInstanceIdentifier]' --output table" },
      { title: "Kiểm tra replication bất đồng bộ", detail: "SSH vào EC2, cài client: <code>sudo dnf install -y mariadb105</code>. Ghi vào Primary rồi đọc từ Replica. Thử <code>INSERT</code> trên Replica → lỗi <code>--read-only</code>, chứng minh Replica chỉ đọc.", cli: "mysql -h <primary-endpoint> -u admin -p -e 'CREATE TABLE appdb.orders(id INT PRIMARY KEY, total INT); INSERT INTO appdb.orders VALUES (1, 250000);'\nmysql -h <replica-endpoint> -u admin -p -e 'SELECT * FROM appdb.orders;'\nmysql -h <replica-endpoint> -u admin -p -e 'INSERT INTO appdb.orders VALUES (2, 1);'" },
      { title: "Cấu hình Spring Boot tách đọc/ghi", detail: "Khai báo 2 DataSource: <code>app.datasource.writer.url=jdbc:mysql://&lt;primary-endpoint&gt;:3306/appdb</code> và <code>app.datasource.reader.url=jdbc:mysql://&lt;replica-endpoint&gt;:3306/appdb</code>. Dùng <code>AbstractRoutingDataSource</code> + <code>LazyConnectionDataSourceProxy</code>, định tuyến theo <code>TransactionSynchronizationManager.isCurrentTransactionReadOnly()</code>. Service báo cáo đánh dấu <code>@Transactional(readOnly = true)</code> → câu SELECT nặng chạy trên Replica, không làm chậm luồng đặt hàng." },
      { title: "(Tùy chọn, tốn phí) Quan sát Multi-AZ failover", detail: "Chọn <code>saa-mysql</code> → <strong>Modify</strong> → Availability: <strong>Create a standby instance</strong> → Apply immediately. Sau khi Available, <strong>Actions → Reboot → Reboot with failover</strong>. Endpoint DNS giữ nguyên, AZ của instance đổi. Chụp màn hình rồi <strong>Modify tắt Multi-AZ ngay</strong>.", cli: "aws rds reboot-db-instance --db-instance-identifier saa-mysql --force-failover" }
    ],
    verify: ["Có 2 endpoint riêng: Primary và Replica", "Dữ liệu INSERT trên Primary xuất hiện trên Replica sau vài giây", "INSERT trên Replica bị từ chối (read-only)", "Log Spring Boot cho thấy query báo cáo dùng reader pool"],
    cleanup: ["Xóa saa-mysql-replica trước (Actions → Delete)", "Xóa saa-mysql, bỏ chọn Create final snapshot, tick xác nhận", "Xóa secret trong Secrets Manager nếu đã dùng Managed password", "Xóa sg-rds-mysql"],
    examLink: "Báo cáo/BI làm chậm DB chính → Read Replica (async, tối đa 15, phải đổi connection string trong code). Chịu lỗi AZ, không mất dữ liệu, cùng DNS → Multi-AZ (sync, standby không đọc được). Read Replica cần bật automated backup."
  },
  21: {
    title: "RDS Proxy cho Lambda Java + tìm hiểu Aurora",
    type: "console",
    duration: "45-60 phút",
    cost: "CÓ PHÍ: RDS Proxy tính theo vCPU của DB (db.t4g.micro tính tối thiểu 2 vCPU ≈ 0,03 USD/giờ), Secrets Manager 0,40 USD/secret/tháng (có dùng thử 30 ngày). Aurora không có Free Tier → chỉ xem màn hình tạo, không bấm Create. Xóa Proxy ngay sau lab.",
    goal: "Đặt RDS Proxy trước RDS MySQL để Lambda dùng connection pooling, xác thực qua Secrets Manager; nắm các lựa chọn Aurora (Serverless v2, Global Database) mà không phát sinh chi phí lớn.",
    prerequisites: ["Instance RDS MySQL saa-mysql từ Lab 20 (hoặc tạo lại)", "Biết tạo Lambda Java 21 cơ bản", "Quyền IAM tạo role và secret"],
    steps: [
      { title: "Tạo secret cho DB", detail: "<strong>Secrets Manager → Store a new secret</strong> → <strong>Credentials for Amazon RDS database</strong> → nhập user <code>admin</code>/mật khẩu → chọn DB <code>saa-mysql</code> → tên <code>saa/mysql/admin</code>. (Nếu DB dùng Managed password thì đã có sẵn secret dạng <code>rds!db-...</code>, dùng lại được.)" },
      { title: "Tạo RDS Proxy", detail: "<strong>RDS → Proxies → Create proxy</strong> → Engine family <strong>MariaDB and MySQL</strong> → tên <code>saa-proxy</code> → Target: <code>saa-mysql</code> → Authentication: chọn secret <code>saa/mysql/admin</code>, IAM role: <strong>Create IAM role</strong> → <strong>Require TLS</strong> bật → Subnets: các private subnet của default VPC → SG: tạo <code>sg-proxy</code> cho phép 3306 từ <code>sg-lambda</code>; đồng thời thêm inbound 3306 từ <code>sg-proxy</code> vào <code>sg-rds-mysql</code>. Chờ status <strong>Available</strong> (~10-15 phút)." },
      { title: "Tạo Lambda Java trong VPC", detail: "<strong>Lambda → Create function</strong> → Runtime <strong>Java 21</strong>, tên <code>orders-reader</code> → Advanced settings: <strong>Enable VPC</strong>, chọn cùng subnet, SG <code>sg-lambda</code>. Code dùng JDBC: <code>DriverManager.getConnection(&quot;jdbc:mysql://&lt;proxy-endpoint&gt;:3306/appdb?sslMode=REQUIRED&quot;, user, pass)</code>, đọc user/pass từ secret qua AWS SDK v2 <code>SecretsManagerClient</code>. Execution role cần thêm <code>secretsmanager:GetSecretValue</code>." },
      { title: "Bắn tải và quan sát pooling", detail: "Gọi Lambda nhiều lần song song (Test liên tục hoặc dùng vòng lặp CLI). Vào <strong>CloudWatch → Metrics → RDS → Per-Proxy Metrics</strong>: so sánh <code>ClientConnections</code> (nhiều) với <code>DatabaseConnections</code> (ít, được tái sử dụng).", cli: "for i in $(seq 1 30); do aws lambda invoke --function-name orders-reader --invocation-type Event out.json; done" },
      { title: "Khảo sát Aurora (không tạo)", detail: "<strong>RDS → Create database → Aurora (MySQL Compatible)</strong>: xem lựa chọn <strong>Serverless v2</strong> (Min/Max ACU), <strong>Aurora I/O-Optimized</strong> vs Standard, mục <strong>Multi-AZ deployment: Create an Aurora Replica</strong>. Ghi chú: cluster có <strong>Writer endpoint</strong> và <strong>Reader endpoint</strong> (cân bằng tải tới 15 replica), 6 bản sao dữ liệu trên 3 AZ. Bấm <strong>Cancel</strong>, không Create." },
      { title: "Khảo sát RDS Custom", detail: "<strong>RDS → Create database → Oracle hoặc Microsoft SQL Server</strong> → chọn <strong>Amazon RDS Custom</strong>: để ý yêu cầu IAM instance profile, KMS key và việc bạn được SSH/RDP vào OS. Cancel." }
    ],
    verify: ["Proxy ở trạng thái Available, target Health = AVAILABLE", "Lambda trả về dữ liệu bảng orders qua proxy endpoint", "DatabaseConnections nhỏ hơn nhiều so với ClientConnections"],
    cleanup: ["RDS → Proxies → saa-proxy → Delete", "Xóa Lambda orders-reader và role liên quan", "Xóa secret (Schedule deletion 7 ngày)", "Xóa sg-proxy, sg-lambda; xóa saa-mysql nếu không dùng tiếp"],
    examLink: "Lambda gây 'too many connections' → RDS Proxy (pooling, failover nhanh hơn 66%, IAM/Secrets Manager). Cần quyền OS trên Oracle/SQL Server managed → RDS Custom. Tải thất thường → Aurora Serverless v2. DR đa Region < 1 giây replication → Aurora Global Database."
  },
  22: {
    title: "ElastiCache Redis: Cache-aside & Session store cho Spring Boot",
    type: "console",
    duration: "40-50 phút",
    cost: "Tài khoản Free Tier cũ: 750 giờ cache.t3.micro/tháng. Ngoài Free Tier ≈ 0,02 USD/giờ. KHÔNG chọn Serverless (tính phí tối thiểu theo GB lưu trữ). Xóa cluster ngay sau lab.",
    goal: "Tạo cluster ElastiCache Redis OSS 1 node, kết nối từ EC2, áp dụng cache-aside với Spring Cache và lưu HTTP session tập trung để EC2 trở thành stateless.",
    prerequisites: ["EC2 client trong default VPC (Lab 20)", "Ứng dụng Spring Boot có spring-boot-starter-data-redis", "Hiểu khái niệm TTL của cache"],
    steps: [
      { title: "Tạo Security Group cho cache", detail: "<strong>EC2 → Security Groups → Create</strong> <code>sg-redis</code>: Inbound <strong>Custom TCP 6379</strong>, Source = SG của EC2 ứng dụng." },
      { title: "Tạo cluster Redis OSS node-based", detail: "<strong>ElastiCache → Redis OSS caches → Create Redis OSS cache</strong> → Deployment option <strong>Design your own cache</strong> → Creation method <strong>Cluster cache</strong> → Cluster mode <strong>Disabled</strong> → tên <code>saa-redis</code> → Node type <code>cache.t3.micro</code>, Number of replicas <strong>0</strong> → <strong>Multi-AZ tắt</strong> (cần ≥1 replica mới bật được) → Subnet group: tạo mới trên default VPC → SG <code>sg-redis</code> → Encryption in transit: tắt cho lab đơn giản → Create.", cli: "aws elasticache create-replication-group --replication-group-id saa-redis --replication-group-description 'SAA lab' --engine redis --cache-node-type cache.t3.micro --num-cache-clusters 1 --security-group-ids <sg-redis-id> --region ap-southeast-1" },
      { title: "Kết nối thử từ EC2", detail: "Lấy <strong>Primary endpoint</strong>. Trên EC2: cài redis-cli và thử lệnh, kể cả Sorted Set (bảng xếp hạng game).", cli: "sudo dnf install -y redis6\nredis6-cli -h <primary-endpoint> -p 6379 PING\nredis6-cli -h <primary-endpoint> ZADD leaderboard 1500 dat 1200 nam 1800 linh\nredis6-cli -h <primary-endpoint> ZREVRANGE leaderboard 0 2 WITHSCORES" },
      { title: "Cache-aside với Spring Cache", detail: "<code>application.properties</code>: <code>spring.data.redis.host=&lt;primary-endpoint&gt;</code>, <code>spring.cache.type=redis</code>, <code>spring.cache.redis.time-to-live=10m</code>. Thêm <code>@EnableCaching</code>, đánh dấu <code>@Cacheable(value = &quot;products&quot;, key = &quot;#id&quot;)</code> trên hàm đọc RDS, <code>@CacheEvict</code> khi cập nhật. Gọi API 2 lần: lần 2 không còn query SQL trong log." },
      { title: "Session store tập trung", detail: "Thêm dependency <code>spring-session-data-redis</code>, cấu hình <code>spring.session.redis.namespace=saa:session</code>. Chạy 2 instance ứng dụng (2 port hoặc 2 EC2), đăng nhập ở instance A rồi gọi instance B vẫn giữ session → không cần Sticky Session trên ALB.", cli: "redis6-cli -h <primary-endpoint> KEYS 'saa:session*'" }
    ],
    verify: ["PING trả về PONG", "ZREVRANGE trả đúng thứ tự điểm giảm dần", "Lần gọi API thứ 2 không có câu SQL trong log", "Key session xuất hiện trong Redis và dùng chung giữa 2 instance"],
    cleanup: ["ElastiCache → saa-redis → Actions → Delete (không tạo final backup)", "Xóa subnet group và sg-redis"],
    examLink: "Cache + Multi-AZ auto-failover / backup / Sorted Sets (leaderboard) → Redis. Cache đa luồng đơn giản, chấp nhận mất dữ liệu → Memcached. Redis làm DB chính bền vững → MemoryDB. Lưu session ra ElastiCache tốt hơn Sticky Session."
  },
  23: {
    title: "DynamoDB On-Demand: Partition/Sort key và truy vấn từ Java",
    type: "cli",
    duration: "30-40 phút",
    cost: "Miễn phí (Free Tier 25 GB lưu trữ; On-Demand tính theo request, lab chỉ vài trăm request ≈ 0 USD). KHÔNG tạo DAX (có phí theo giờ).",
    goal: "Thiết kế bảng Orders với partition key + sort key, dùng chế độ On-Demand, thực hành PutItem/GetItem/Query và hiểu khi nào cần DAX.",
    prerequisites: ["AWS CLI v2 đã cấu hình region ap-southeast-1", "Java 17+ và AWS SDK for Java v2 (module dynamodb-enhanced) nếu làm bước Java"],
    steps: [
      { title: "Tạo bảng On-Demand", detail: "Console: <strong>DynamoDB → Tables → Create table</strong> → tên <code>Orders</code>, Partition key <code>customerId</code> (String), Sort key <code>orderId</code> (String) → Table settings <strong>Customize settings</strong> → Capacity mode <strong>On-demand</strong> → Create.", cli: "aws dynamodb create-table --table-name Orders --attribute-definitions AttributeName=customerId,AttributeType=S AttributeName=orderId,AttributeType=S --key-schema AttributeName=customerId,KeyType=HASH AttributeName=orderId,KeyType=RANGE --billing-mode PAY_PER_REQUEST --region ap-southeast-1\naws dynamodb wait table-exists --table-name Orders" },
      { title: "Ghi dữ liệu", detail: "Thêm 3 đơn cho 2 khách hàng. Dùng cú pháp shorthand để tránh JSON.", cli: "aws dynamodb put-item --table-name Orders --item 'customerId={S=C001},orderId={S=2026-10-01#O1001},total={N=250000},status={S=PAID}'\naws dynamodb put-item --table-name Orders --item 'customerId={S=C001},orderId={S=2026-10-05#O1002},total={N=90000},status={S=NEW}'\naws dynamodb put-item --table-name Orders --item 'customerId={S=C002},orderId={S=2026-10-03#O1003},total={N=120000},status={S=PAID}'" },
      { title: "GetItem và Query", detail: "GetItem cần đủ cả 2 key. Query lấy toàn bộ đơn của C001 trong tháng 10 nhờ <code>begins_with</code> trên sort key. Thêm <code>--return-consumed-capacity TOTAL</code> để xem RCU tiêu tốn (eventually vs strongly consistent).", cli: "aws dynamodb get-item --table-name Orders --key 'customerId={S=C001},orderId={S=2026-10-01#O1001}' --consistent-read --return-consumed-capacity TOTAL\naws dynamodb query --table-name Orders --key-condition-expression 'customerId = :c AND begins_with(orderId, :m)' --expression-attribute-values ':c={S=C001},:m={S=2026-10}' --return-consumed-capacity TOTAL" },
      { title: "Truy cập từ Java (Enhanced Client)", detail: "Tạo class <code>Order</code> với <code>@DynamoDbBean</code>, getter <code>@DynamoDbPartitionKey</code> cho customerId và <code>@DynamoDbSortKey</code> cho orderId. <code>DynamoDbTable&lt;Order&gt; table = enhanced.table(&quot;Orders&quot;, TableSchema.fromBean(Order.class));</code> rồi gọi <code>table.query(QueryConditional.sortBeginsWith(...))</code>. Chạy trên EC2 có IAM Role, không hard-code access key." },
      { title: "So sánh Provisioned và xem DAX", detail: "Vào tab <strong>Additional settings → Read/write capacity → Edit</strong> để thấy Provisioned + Auto Scaling (không cần Save). Mở <strong>DynamoDB → DAX → Clusters → Create cluster</strong> chỉ để xem node type và cách dùng client DAX thay thế client DynamoDB; Cancel." }
    ],
    verify: ["Bảng Orders ở trạng thái ACTIVE, Billing mode = PAY_PER_REQUEST", "Query trả về 2 item của C001", "ConsumedCapacity của strongly consistent read gấp đôi eventually consistent"],
    cleanup: ["Giữ bảng Orders cho Lab 24, hoặc: aws dynamodb delete-table --table-name Orders"],
    examLink: "Tải đột biến/không đoán trước, app mới → On-Demand; tải ổn định, tối ưu chi phí → Provisioned + Auto Scaling. Cần micro-giây, hot key, không sửa logic code → DAX; cache kết quả tổng hợp nhiều nguồn → ElastiCache."
  },
  24: {
    title: "DynamoDB Streams + Lambda và TTL tự xóa session",
    type: "console",
    duration: "40-50 phút",
    cost: "Miễn phí (Free Tier Lambda 1 triệu request; đọc Streams bởi Lambda không tính phí GetRecords; TTL xóa không tốn WCU). Global Tables có phí replicated write → chỉ xem, không bật.",
    goal: "Bật DynamoDB Streams kích hoạt Lambda xử lý sự kiện thay đổi dữ liệu, và bật TTL để tự động xóa item hết hạn miễn phí.",
    prerequisites: ["Bảng Orders từ Lab 23", "Biết tạo Lambda (Java 21 hoặc Python cho nhanh)"],
    steps: [
      { title: "Bật Stream", detail: "<strong>DynamoDB → Tables → Orders → Exports and streams → DynamoDB stream details → Turn on</strong> → View type <strong>New and old images</strong>.", cli: "aws dynamodb update-table --table-name Orders --stream-specification StreamEnabled=true,StreamViewType=NEW_AND_OLD_IMAGES" },
      { title: "Tạo Lambda xử lý stream", detail: "<strong>Lambda → Create function</strong> → <code>orders-stream-handler</code>, Java 21 (handler implement <code>RequestHandler&lt;DynamodbEvent, Void&gt;</code> từ aws-lambda-java-events, log <code>record.getEventName()</code> và NewImage). Execution role gắn managed policy <strong>AWSLambdaDynamoDBExecutionRole</strong>." },
      { title: "Gắn trigger", detail: "Quay lại <strong>Orders → Exports and streams → Trigger → Create trigger</strong> → chọn <code>orders-stream-handler</code>, Batch size 10 → Create. Sau đó cập nhật một item để sinh sự kiện MODIFY.", cli: "aws dynamodb update-item --table-name Orders --key 'customerId={S=C001},orderId={S=2026-10-05#O1002}' --update-expression 'SET #s = :v' --expression-attribute-names '#s=status' --expression-attribute-values ':v={S=PAID}'" },
      { title: "Tạo bảng Sessions và bật TTL", detail: "Tạo bảng <code>Sessions</code> (PK <code>sessionId</code>, On-demand). <strong>Additional settings → Time to Live (TTL) → Turn on</strong> → attribute <code>expireAt</code>. Ghi một item hết hạn sau 5 phút (giá trị epoch giây).", cli: "aws dynamodb create-table --table-name Sessions --attribute-definitions AttributeName=sessionId,AttributeType=S --key-schema AttributeName=sessionId,KeyType=HASH --billing-mode PAY_PER_REQUEST\naws dynamodb update-time-to-live --table-name Sessions --time-to-live-specification Enabled=true,AttributeName=expireAt\n# PowerShell: [DateTimeOffset]::UtcNow.AddMinutes(5).ToUnixTimeSeconds()   |  Bash: date -d '+5 min' +%s\naws dynamodb put-item --table-name Sessions --item 'sessionId={S=s-001},userId={S=dat},expireAt={N=<epoch>}'" },
      { title: "Xem Global Tables (không bật)", detail: "<strong>Orders → Global tables → Create replica</strong>: để ý yêu cầu Streams (New and old images) và chọn region như ap-northeast-1. Cancel để tránh phí." }
    ],
    verify: ["CloudWatch Logs của orders-stream-handler có sự kiện MODIFY với OldImage/NewImage", "Item s-001 biến mất sau thời điểm expireAt (có thể tới vài giờ, tối đa ~48h)", "Bảng Sessions hiển thị TTL: Enabled"],
    cleanup: ["Xóa trigger và Lambda orders-stream-handler (kèm log group)", "Xóa bảng Orders và Sessions"],
    examLink: "Xóa hàng triệu bản ghi cũ rẻ nhất → TTL (không tốn WCU). Phản ứng với thay đổi item (gửi mail, sync OpenSearch) → Streams + Lambda (lưu 24h). Active-Active đa Region độ trễ ms → Global Tables (cần Streams)."
  },
  25: {
    title: "Chọn đúng Database chuyên biệt qua 8 tình huống",
    type: "design",
    duration: "30 phút",
    cost: "Miễn phí (bài tập trên giấy/whiteboard; Redshift, Neptune, DocumentDB đều tính phí theo giờ nên không tạo thật).",
    goal: "Luyện phản xạ ánh xạ yêu cầu nghiệp vụ → dịch vụ DB phù hợp (RDS, Aurora, DynamoDB, Redshift, DocumentDB, Neptune, Timestream, Keyspaces) và vẽ kiến trúc dữ liệu cho một hệ thống thương mại điện tử.",
    prerequisites: ["Đã học Session 20-24", "Giấy/whiteboard hoặc draw.io"],
    steps: [
      { title: "Lập bảng quyết định", detail: "Kẻ bảng 4 cột: <strong>Mô hình dữ liệu</strong> | <strong>Kiểu truy cập</strong> | <strong>Từ khóa đề</strong> | <strong>Dịch vụ</strong>. Điền: Relational/OLTP → RDS/Aurora; Key-value serverless → DynamoDB; Columnar OLAP petabyte → Redshift; JSON MongoDB → DocumentDB; Graph → Neptune; Time-series IoT → Timestream; Cassandra CQL → Keyspaces; Ledger bất biến → QLDB (đã ngừng nhận khách mới, đề cũ còn xuất hiện)." },
      { title: "Giải 8 tình huống", detail: "1) App Node.js dùng MongoDB muốn managed → ?<br>2) Phát hiện vòng giao dịch rửa tiền giữa các tài khoản → ?<br>3) 10.000 cảm biến gửi nhiệt độ mỗi giây, truy vấn theo khoảng thời gian → ?<br>4) BI chạy SQL trên 2 PB dữ liệu bán hàng → ?<br>5) Truy vấn SQL trực tiếp log trên S3 mà không nạp vào kho → ?<br>6) Di chuyển cụm Cassandra không muốn quản lý server → ?<br>7) Giỏ hàng cần độ trễ ms ở mọi quy mô → ?<br>8) Spring Boot + JPA giao dịch đặt hàng ACID → ?" },
      { title: "Đối chiếu đáp án", detail: "1 DocumentDB · 2 Neptune · 3 Timestream · 4 Redshift · 5 Redshift Spectrum (hoặc Athena) · 6 Keyspaces · 7 DynamoDB · 8 RDS/Aurora MySQL-PostgreSQL. Tự chấm, ghi lại tình huống sai và từ khóa đã bỏ sót." },
      { title: "Vẽ kiến trúc dữ liệu tổng thể", detail: "Vẽ: Spring Boot (ECS) → Aurora (đơn hàng) + ElastiCache (cache) + DynamoDB (giỏ hàng, session TTL) → DynamoDB Streams/Lambda → S3 data lake → Redshift (BI) ; Neptune cho gợi ý sản phẩm. Ghi chú lý do chọn mỗi DB bên cạnh mũi tên." },
      { title: "(Tùy chọn) Xem console", detail: "Mở <strong>Redshift → Serverless dashboard</strong> và <strong>Neptune → Databases → Create database</strong> để nhìn các tùy chọn cấu hình, sau đó Cancel. Không tạo tài nguyên." }
    ],
    verify: ["Đúng ít nhất 7/8 tình huống", "Sơ đồ có lý do lựa chọn cho từng DB"],
    cleanup: ["Không có tài nguyên cần xóa"],
    examLink: "MongoDB → DocumentDB; Cassandra → Keyspaces; Graph/social/fraud → Neptune; IoT time-series → Timestream; Petabyte OLAP → Redshift; SQL trên S3 không nạp dữ liệu → Redshift Spectrum/Athena."
  },
  26: {
    title: "Route 53: Hosted Zone, Alias về S3 Website và so sánh CNAME",
    type: "console",
    duration: "30-40 phút",
    cost: "Hosted zone 0,50 USD/tháng nhưng được miễn nếu xóa trong vòng 12 giờ sau khi tạo. Truy vấn Alias tới tài nguyên AWS miễn phí. S3 nằm trong Free Tier. Không cần mua domain.",
    goal: "Tạo public hosted zone, tạo Alias record cho zone apex trỏ tới S3 static website, thử tạo CNAME ở apex để thấy bị từ chối, và kiểm tra bằng test-dns-answer.",
    prerequisites: ["AWS CLI v2", "Một tên miền giả định (ví dụ saa-lab-dat.com) – không cần đăng ký thật"],
    steps: [
      { title: "Tạo S3 static website", detail: "<strong>S3 → Create bucket</strong> tên <strong>trùng đúng tên record</strong>: <code>saa-lab-dat.com</code>, region ap-southeast-1, tắt <strong>Block all public access</strong>. Upload <code>index.html</code>. <strong>Properties → Static website hosting → Enable</strong>, index document <code>index.html</code>. <strong>Permissions → Bucket policy</strong> cho phép <code>s3:GetObject</code> với Principal <code>*</code>." },
      { title: "Tạo public hosted zone", detail: "<strong>Route 53 → Hosted zones → Create hosted zone</strong> → Domain <code>saa-lab-dat.com</code>, Type <strong>Public</strong>. Ghi lại Hosted zone ID và 4 NS record.", cli: "aws route53 create-hosted-zone --name saa-lab-dat.com --caller-reference lab26-001" },
      { title: "Tạo Alias record ở zone apex", detail: "Trong zone → <strong>Create record</strong> → Record name để trống (apex) → Type <strong>A</strong> → bật <strong>Alias</strong> → Route traffic to <strong>Alias to S3 website endpoint</strong> → region Asia Pacific (Singapore) → chọn <code>s3-website-ap-southeast-1.amazonaws.com</code> → Create." },
      { title: "Thử CNAME ở apex (sẽ lỗi)", detail: "Create record → Record name trống → Type <strong>CNAME</strong> → Value <code>saa-lab-dat.com.s3-website-ap-southeast-1.amazonaws.com</code> → Create: Route 53 báo lỗi vì CNAME không được tồn tại ở zone apex. Tạo lại CNAME với tên <code>www</code> → thành công." },
      { title: "Kiểm tra phân giải", detail: "Vì domain chưa đăng ký, dùng <code>test-dns-answer</code> hoặc hỏi trực tiếp name server của zone.", cli: "aws route53 test-dns-answer --hosted-zone-id <ZONE_ID> --record-name saa-lab-dat.com --record-type A\naws route53 test-dns-answer --hosted-zone-id <ZONE_ID> --record-name www.saa-lab-dat.com --record-type CNAME\nnslookup saa-lab-dat.com <ns-xxx.awsdns-xx.com>" }
    ],
    verify: ["Alias A record trả về các IP của S3 website endpoint", "Tạo CNAME ở apex bị từ chối, CNAME www thành công", "Mở trực tiếp URL website endpoint thấy index.html"],
    cleanup: ["Xóa mọi record trừ NS/SOA, rồi Delete hosted zone (trong 12 giờ để không bị tính phí)", "Empty và xóa bucket S3"],
    examLink: "Trỏ zone apex (example.com) tới ALB/CloudFront/S3 website với chi phí thấp nhất → Alias record (miễn phí truy vấn, tự cập nhật IP). CNAME không dùng được ở apex và tính phí truy vấn."
  },
  27: {
    title: "Route 53 Routing Policies: Weighted, Failover, Geolocation",
    type: "cli",
    duration: "40-50 phút",
    cost: "Hosted zone miễn phí nếu xóa trong 12 giờ. Health check tới endpoint AWS: 50 cái đầu miễn phí, endpoint ngoài AWS 0,75 USD/tháng (tính theo tỷ lệ) → xóa ngay sau lab.",
    goal: "Cấu hình Weighted (canary 90/10), Failover với Health Check và Geolocation trên một private-test hosted zone, quan sát kết quả bằng test-dns-answer với IP client giả lập.",
    prerequisites: ["Hosted zone saa-lab-dat.com (Lab 26) hoặc tạo mới", "Dùng IP tài liệu 192.0.2.10/20/30 làm đích giả lập"],
    steps: [
      { title: "Weighted: canary 90/10", detail: "Zone → <strong>Create record</strong> → name <code>api</code>, Type A, Value <code>192.0.2.10</code>, Routing policy <strong>Weighted</strong>, Weight <code>90</code>, Record ID <code>v1</code>. Thêm record thứ 2: Value <code>192.0.2.20</code>, Weight <code>10</code>, Record ID <code>v2</code>, TTL 60." },
      { title: "Quan sát phân phối", detail: "Gọi test-dns-answer nhiều lần, đếm tỷ lệ IP v1/v2 (xấp xỉ 9:1).", cli: "for i in $(seq 1 20); do aws route53 test-dns-answer --hosted-zone-id <ZONE_ID> --record-name api.saa-lab-dat.com --record-type A --query 'RecordData[0]' --output text; done | sort | uniq -c" },
      { title: "Tạo Health Check", detail: "<strong>Route 53 → Health checks → Create health check</strong> → tên <code>hc-primary</code>, Monitor <strong>Endpoint</strong>, Protocol HTTP, IP <code>192.0.2.10</code>, port 80 (IP giả → sẽ <strong>Unhealthy</strong>, mô phỏng Primary sập). Request interval 30s, Failure threshold 3." },
      { title: "Failover Active-Passive", detail: "Create record <code>app</code>: Routing <strong>Failover</strong>, Type <strong>Primary</strong>, Value <code>192.0.2.10</code>, Health check <code>hc-primary</code>, ID <code>primary</code>. Record thứ 2 <code>app</code>: Failover <strong>Secondary</strong>, Value <code>192.0.2.30</code> (thực tế: S3 trang bảo trì). Chờ health check chuyển đỏ rồi test: trả về Secondary.", cli: "aws route53 test-dns-answer --hosted-zone-id <ZONE_ID> --record-name app.saa-lab-dat.com --record-type A" },
      { title: "Geolocation theo quốc gia", detail: "Create record <code>shop</code>: Routing <strong>Geolocation</strong>, Location <strong>Vietnam</strong>, Value <code>192.0.2.10</code>; record thứ 2 Location <strong>Default</strong>, Value <code>192.0.2.20</code>. Test bằng IP resolver giả lập ở các nước khác nhau qua <code>--resolver-ip</code>/<code>--edns0-client-subnet-ip</code>.", cli: "aws route53 test-dns-answer --hosted-zone-id <ZONE_ID> --record-name shop.saa-lab-dat.com --record-type A --edns0-client-subnet-ip 113.160.0.1 --edns0-client-subnet-mask 24\naws route53 test-dns-answer --hosted-zone-id <ZONE_ID> --record-name shop.saa-lab-dat.com --record-type A --edns0-client-subnet-ip 8.8.8.0 --edns0-client-subnet-mask 24" },
      { title: "Ghi chú các policy còn lại", detail: "Ghi vào sổ: <strong>Latency</strong> (chọn region nhanh nhất), <strong>Geoproximity</strong> (cần Traffic Flow/bias -99..+99), <strong>Multivalue answer</strong> (tối đa 8 IP healthy), <strong>Simple</strong> (không gắn health check)." }
    ],
    verify: ["Weighted cho tỷ lệ xấp xỉ 18/2 trên 20 lần", "Health check Unhealthy → app trả về 192.0.2.30", "IP Việt Nam nhận 192.0.2.10, IP Mỹ nhận Default 192.0.2.20"],
    cleanup: ["Xóa các record api/app/shop", "Xóa health check hc-primary", "Xóa hosted zone nếu không dùng tiếp"],
    examLink: "Canary/Blue-Green theo % → Weighted. Active-Passive + Health Check → Failover. Theo quốc gia/tuân thủ dữ liệu → Geolocation. Mở rộng/thu hẹp vùng bằng bias → Geoproximity. Nhanh nhất → Latency."
  },
  28: {
    title: "CloudFront + S3 private với Origin Access Control (OAC)",
    type: "console",
    duration: "40-50 phút",
    cost: "Miễn phí (CloudFront Always Free 1 TB transfer + 10 triệu request/tháng; S3 Free Tier). Global Accelerator có phí theo giờ → chỉ đọc lý thuyết, không tạo.",
    goal: "Phân phối website tĩnh (frontend cho API Spring Boot) qua CloudFront, khóa bucket S3 private chỉ cho CloudFront đọc qua OAC, thực hành invalidation và cache.",
    prerequisites: ["AWS CLI v2", "File index.html và một ảnh tĩnh"],
    steps: [
      { title: "Tạo bucket private", detail: "<strong>S3 → Create bucket</strong> <code>saa-cf-origin-&lt;tên&gt;</code>, ap-southeast-1, <strong>giữ nguyên Block all public access = ON</strong>. Upload <code>index.html</code>, <code>logo.png</code>. Thử mở Object URL → <strong>AccessDenied</strong>.", cli: "aws s3 mb s3://saa-cf-origin-dat --region ap-southeast-1\naws s3 cp index.html s3://saa-cf-origin-dat/" },
      { title: "Tạo distribution với OAC", detail: "<strong>CloudFront → Distributions → Create distribution</strong> → Origin domain: chọn bucket (dạng <code>.s3.ap-southeast-1.amazonaws.com</code>, KHÔNG chọn website endpoint) → Origin access: <strong>Origin access control settings (recommended)</strong> → <strong>Create new OAC</strong> (Sign requests) → Viewer protocol policy <strong>Redirect HTTP to HTTPS</strong> → Cache policy <strong>CachingOptimized</strong> → WAF: <strong>Do not enable security protections</strong> → Default root object <code>index.html</code> → Create." },
      { title: "Cập nhật Bucket Policy", detail: "Sau khi tạo, banner vàng hiện <strong>Copy policy</strong> → sang <strong>S3 → bucket → Permissions → Bucket policy → Edit</strong> → dán policy (Principal <code>cloudfront.amazonaws.com</code>, Condition <code>AWS:SourceArn</code> = ARN distribution) → Save. (Console mới có thể tự cập nhật nếu bạn chọn Allow.)" },
      { title: "Kiểm tra cache", detail: "Chờ Status <strong>Deployed</strong>, mở <code>https://dxxxx.cloudfront.net</code>. Dùng curl xem header <code>x-cache</code>: lần đầu <code>Miss from cloudfront</code>, lần sau <code>Hit from cloudfront</code>.", cli: "curl -sI https://<dxxxx>.cloudfront.net/index.html | grep -i x-cache\ncurl -sI https://<dxxxx>.cloudfront.net/index.html | grep -i x-cache" },
      { title: "Invalidation sau khi deploy", detail: "Sửa index.html, upload lại → vẫn thấy bản cũ do cache. Tạo invalidation để làm mới.", cli: "aws s3 cp index.html s3://saa-cf-origin-dat/\naws cloudfront create-invalidation --distribution-id <DIST_ID> --paths '/index.html'" },
      { title: "Ghi chú Global Accelerator", detail: "Mở <strong>Global Accelerator → Create accelerator</strong> để xem: 2 Anycast static IP, Listener TCP/UDP, Endpoint group theo region (ALB/NLB/EC2/EIP). Cancel – không tạo." }
    ],
    verify: ["Truy cập trực tiếp S3 Object URL bị AccessDenied", "Truy cập qua CloudFront thành công qua HTTPS", "Header x-cache chuyển từ Miss sang Hit", "Sau invalidation thấy nội dung mới"],
    cleanup: ["CloudFront → Disable distribution, chờ Deployed rồi Delete", "Xóa OAC (Security → Origin access)", "Empty và xóa bucket"],
    examLink: "Chặn truy cập thẳng S3, bắt buộc qua CloudFront → OAC + Bucket Policy. 1 file → Signed URL, nhiều file → Signed Cookies. TCP/UDP, gaming, cần 2 static IP toàn cầu, không cache → Global Accelerator."
  },
  29: {
    title: "Thiết kế lựa chọn Amazon FSx cho 4 tình huống doanh nghiệp",
    type: "design",
    duration: "30-40 phút",
    cost: "Miễn phí (bài tập thiết kế). FSx tính phí theo GB-tháng và throughput, kể cả khi không dùng → không tạo thật. Nếu muốn thử, FSx for Lustre Scratch 1,2 TiB có giá vài USD/ngày – xóa ngay.",
    goal: "Phân biệt FSx for Windows File Server, Lustre (Scratch vs Persistent), NetApp ONTAP, OpenZFS và so sánh với EFS/EBS/S3 để chọn đúng hệ thống file.",
    prerequisites: ["Đã học Session 8-10 (EBS, EFS) và Session 29", "draw.io hoặc giấy"],
    steps: [
      { title: "Bảng so sánh lưu trữ", detail: "Kẻ bảng: <strong>Dịch vụ | Giao thức | OS | Multi-AZ | Use case</strong> cho EBS (block, 1 AZ), EFS (NFS, Linux, Multi-AZ), FSx Windows (SMB, AD, Multi-AZ), FSx Lustre (POSIX, HPC, liên kết S3), FSx ONTAP (NFS/SMB/iSCSI), FSx OpenZFS (NFS, di chuyển ZFS), S3 (object)." },
      { title: "Tình huống 1: Phòng kế toán Windows", detail: "200 máy Windows cần ổ mạng chia sẻ, phân quyền theo user AD, chịu lỗi AZ. → Vẽ <strong>FSx for Windows File Server Multi-AZ</strong> + AWS Managed Microsoft AD, mount qua <code>\\\\fs-xxx\\share</code> (SMB). Ghi chú vì sao không chọn EFS (không hỗ trợ Windows)." },
      { title: "Tình huống 2: Huấn luyện ML 48 giờ", detail: "Dữ liệu 50 TB trên S3, cần hàng trăm GB/s trong 2 ngày rồi bỏ. → <strong>FSx for Lustre Scratch</strong> liên kết S3 bucket (Data Repository Association, lazy load), kết quả export ngược lại S3. Nếu chạy lâu dài, cần HA/tự phục hồi → <strong>Persistent</strong>." },
      { title: "Tình huống 3 và 4", detail: "3) Công ty đang dùng NetApp on-premise, cần NFS + SMB + iSCSI, SnapMirror lên AWS → <strong>FSx for NetApp ONTAP</strong>.<br>4) Máy chủ file Linux dùng ZFS snapshots/clones muốn lift-and-shift → <strong>FSx for OpenZFS</strong>." },
      { title: "Tự kiểm tra bằng console (không tạo)", detail: "Mở <strong>FSx → Create file system</strong>, chọn lần lượt từng loại để xem: Windows (Deployment type Multi-AZ/Single-AZ, Active Directory), Lustre (Scratch 2 / Persistent 2, Data repository import/export). Bấm Cancel." }
    ],
    verify: ["Chọn đúng cả 4 tình huống", "Giải thích được Scratch vs Persistent", "Nêu được lý do loại EFS cho workload Windows"],
    cleanup: ["Không có tài nguyên cần xóa"],
    examLink: "Windows + SMB + Active Directory → FSx Windows. HPC/ML + hàng trăm GB/s + tích hợp S3 → FSx Lustre (Scratch rẻ, ngắn hạn; Persistent bền vững). Đa giao thức NetApp → ONTAP. ZFS → OpenZFS. Linux shared Multi-AZ → EFS."
  },
  30: {
    title: "Kế hoạch di chuyển dữ liệu Hybrid: Snowball vs DataSync vs Storage Gateway",
    type: "design",
    duration: "40 phút",
    cost: "Miễn phí (thiết kế trên giấy + tạo S3 Lifecycle rule miễn phí). Snowball, Storage Gateway, DataSync, Transfer Family đều có phí → không tạo thật.",
    goal: "Tính toán thời gian truyền dữ liệu để chọn Snowball Edge hay DataSync, thiết kế luồng đưa dữ liệu lạnh vào Glacier đúng cách, và chọn đúng loại Storage Gateway/Transfer Family.",
    prerequisites: ["Đã học Session 15-16 (S3 Lifecycle) và Session 30", "Máy tính bỏ túi"],
    steps: [
      { title: "Tính thời gian truyền mạng", detail: "Công thức: <code>Thời gian (giây) = Dung lượng (bit) / Băng thông (bit/s)</code>. Ví dụ 500 TB qua đường 1 Gbps dùng 80%: 500×10<sup>12</sup>×8 / (0,8×10<sup>9</sup>) ≈ 5.000.000 giây ≈ <strong>58 ngày</strong> → chọn <strong>Snowball Edge</strong> (vài thiết bị 80 TB, ~1 tuần). Ví dụ 5 TB qua 1 Gbps ≈ 14 giờ → <strong>DataSync</strong> là đủ." },
      { title: "Thiết kế luồng Snowball → Glacier", detail: "Vẽ: Data center → Snowball Edge → (vận chuyển) → import vào <strong>S3 Standard</strong> → <strong>S3 Lifecycle</strong> chuyển sang <strong>Glacier Deep Archive</strong> sau 0 ngày. Ghi rõ: Snowball KHÔNG ghi thẳng vào Glacier." },
      { title: "Tạo thật Lifecycle rule (miễn phí)", detail: "<strong>S3 → bucket thử nghiệm → Management → Lifecycle rules → Create lifecycle rule</strong> → tên <code>to-deep-archive</code>, prefix <code>archive/</code> → Transition current versions → <strong>Glacier Deep Archive</strong>, Days after object creation <code>0</code> → Create. Đây chính là bước cuối của luồng Snowball.", cli: "aws s3api get-bucket-lifecycle-configuration --bucket <bucket>" },
      { title: "Chọn loại Storage Gateway", detail: "Ghép cặp: (a) Văn phòng cần ổ NFS/SMB lưu file lên S3, có cache cục bộ → <strong>S3 File Gateway</strong>; (b) Backup ổ đĩa server iSCSI thành EBS snapshot → <strong>Volume Gateway</strong>; (c) Thay băng từ vật lý, phần mềm backup giữ nguyên → <strong>Tape Gateway</strong> (VTL → S3 Glacier); (d) Windows share với SMB, AD → <strong>FSx File Gateway</strong>." },
      { title: "Đối tác gửi file qua SFTP", detail: "Thiết kế: đối tác ngân hàng gửi file đối soát qua SFTP → <strong>AWS Transfer Family</strong> (SFTP endpoint) → S3 bucket → S3 Event → SQS → Spring Boot consumer xử lý. Ghi chú: không cần tự dựng EC2 chạy vsftpd." },
      { title: "Lịch đồng bộ định kỳ", detail: "Bài toán: NAS on-premise cần đồng bộ hằng đêm lên EFS, giữ metadata/permission → <strong>DataSync</strong> (agent on-prem + Task có schedule). So sánh với Storage Gateway (truy cập liên tục) để phân biệt." }
    ],
    verify: ["Tính đúng ~58 ngày cho 500 TB / 1 Gbps", "Lifecycle rule to-deep-archive hiển thị trong bucket", "Ghép đúng 4 loại gateway"],
    cleanup: ["Xóa Lifecycle rule và bucket thử nghiệm nếu không dùng"],
    examLink: "Mạng chậm/hàng trăm TB → Snowball Edge; Snowball không import thẳng Glacier → S3 Standard + Lifecycle. Đồng bộ định kỳ qua mạng, giữ metadata → DataSync. Hybrid truy cập liên tục → Storage Gateway. SFTP/FTPS vào S3 → Transfer Family."
  },
  31: {
    title: "SQS Standard + DLQ + Long Polling với Spring Boot consumer",
    type: "cli",
    duration: "40-50 phút",
    cost: "Miễn phí (Free Tier 1 triệu request SQS/tháng).",
    goal: "Tạo hàng đợi đơn hàng có Dead Letter Queue, bật Long Polling, quan sát Visibility Timeout gây xử lý trùng và viết consumer Spring Boot bằng Spring Cloud AWS.",
    prerequisites: ["AWS CLI v2", "Spring Boot 3 + io.awspring.cloud:spring-cloud-aws-starter-sqs (3.x)", "IAM Role/profile có quyền SQS"],
    steps: [
      { title: "Tạo DLQ", detail: "Tạo queue lỗi trước, retention 14 ngày để có thời gian điều tra.", cli: "aws sqs create-queue --queue-name saa-orders-dlq --attributes MessageRetentionPeriod=1209600 --region ap-southeast-1" },
      { title: "Tạo queue chính có DLQ và Long Polling", detail: "<strong>SQS → Create queue</strong> → Standard, tên <code>saa-orders</code> → Visibility timeout <code>30 seconds</code> → <strong>Receive message wait time</strong> <code>20</code> (Long Polling) → mục <strong>Dead-letter queue: Enabled</strong>, chọn <code>saa-orders-dlq</code>, <strong>Maximum receives</strong> <code>3</code> → Create." },
      { title: "Gửi và nhận, quan sát Visibility Timeout", detail: "Gửi 1 tin, nhận bằng long polling. KHÔNG xóa tin → sau 30 giây nhận lại được (mô phỏng consumer chậm, xử lý trùng). Sau 3 lần nhận, tin chuyển sang DLQ.", cli: "Q=$(aws sqs get-queue-url --queue-name saa-orders --query QueueUrl --output text)\naws sqs send-message --queue-url $Q --message-body 'order-1001'\naws sqs receive-message --queue-url $Q --wait-time-seconds 20 --attribute-names ApproximateReceiveCount\naws sqs get-queue-attributes --queue-url $Q --attribute-names ApproximateNumberOfMessages ApproximateNumberOfMessagesNotVisible" },
      { title: "Kiểm tra DLQ và redrive", detail: "Sau 3 lần nhận không xóa, mở <strong>SQS → saa-orders-dlq → Send and receive messages → Poll for messages</strong> thấy order-1001. Dùng <strong>Start DLQ redrive</strong> để đẩy về queue gốc sau khi sửa lỗi." },
      { title: "Consumer Spring Boot", detail: "<code>spring.cloud.aws.region.static=ap-southeast-1</code>. Viết bean: <code>@SqsListener(&quot;saa-orders&quot;) public void handle(String body) { ... }</code>. Mặc định acknowledgement ON_SUCCESS: hàm chạy xong mới xóa tin; ném exception → tin quay lại và cuối cùng vào DLQ. Nếu xử lý lâu hơn 30s, tăng Visibility Timeout (≥ 6 lần thời gian xử lý khi dùng với Lambda) hoặc gọi <code>ChangeMessageVisibility</code>." },
      { title: "(Tùy chọn) FIFO queue", detail: "Tạo <code>saa-payments.fifo</code>, bật Content-based deduplication. Gửi 2 lần cùng body trong 5 phút → chỉ nhận 1 tin (exactly-once).", cli: "aws sqs create-queue --queue-name saa-payments.fifo --attributes FifoQueue=true,ContentBasedDeduplication=true\naws sqs send-message --queue-url <fifo-url> --message-body 'pay-1' --message-group-id customer-C001" }
    ],
    verify: ["receive-message chờ tới 20 giây khi queue rỗng (long polling)", "ApproximateReceiveCount tăng dần, tin vào DLQ sau 3 lần", "Consumer Spring Boot xử lý và xóa tin thành công", "FIFO loại bỏ tin trùng"],
    cleanup: ["aws sqs delete-queue cho saa-orders, saa-orders-dlq, saa-payments.fifo"],
    examLink: "Tin bị xử lý 2 lần → Visibility Timeout quá ngắn. Giảm API rỗng/chi phí → Long Polling (WaitTimeSeconds ≤ 20). Tin lỗi lặp lại → DLQ. Thứ tự + exactly-once → FIFO (.fifo). Retention mặc định 4 ngày, tối đa 14 ngày."
  },
  32: {
    title: "Fan-out: S3 Event → SNS Topic → 2 SQS Queues",
    type: "console",
    duration: "40 phút",
    cost: "Miễn phí (Free Tier SNS 1 triệu publish, SQS 1 triệu request, S3 5 GB).",
    goal: "Xây dựng mô hình fan-out để một sự kiện upload ảnh được phân phối tới 2 dịch vụ độc lập (thumbnail và watermark) qua SNS + SQS, đảm bảo không mất tin khi một bên tạm dừng.",
    prerequisites: ["AWS CLI v2", "Hoàn thành Lab 31 (hiểu SQS)"],
    steps: [
      { title: "Tạo SNS Topic", detail: "<strong>SNS → Topics → Create topic</strong> → Type <strong>Standard</strong>, tên <code>saa-image-uploaded</code>.", cli: "aws sns create-topic --name saa-image-uploaded --region ap-southeast-1" },
      { title: "Tạo 2 queue và subscribe", detail: "Tạo SQS <code>saa-thumbnail</code> và <code>saa-watermark</code>. Với từng queue: <strong>SQS → queue → Subscribe to Amazon SNS topic</strong> → chọn <code>saa-image-uploaded</code> → Save. Console tự thêm Access Policy cho phép SNS gửi vào queue. Trong <strong>SNS → Subscriptions</strong>, bật <strong>Enable raw message delivery</strong> để body gọn hơn." },
      { title: "Cho phép S3 publish vào SNS", detail: "<strong>SNS → topic → Edit → Access policy</strong>: thêm statement Allow Principal Service <code>s3.amazonaws.com</code>, Action <code>SNS:Publish</code>, Resource ARN topic, Condition <code>ArnLike aws:SourceArn</code> = <code>arn:aws:s3:::saa-images-&lt;tên&gt;</code>." },
      { title: "Tạo S3 Event Notification", detail: "Tạo bucket <code>saa-images-&lt;tên&gt;</code> → <strong>Properties → Event notifications → Create event notification</strong> → tên <code>on-jpg</code>, Suffix <code>.jpg</code>, Event types <strong>All object create events</strong> → Destination <strong>SNS topic</strong> → chọn <code>saa-image-uploaded</code> → Save." },
      { title: "Kiểm tra fan-out", detail: "Upload 1 file .jpg, rồi đọc cả 2 queue: mỗi queue nhận 1 bản sao sự kiện. Thử publish thủ công một sự kiện thanh toán.", cli: "aws s3 cp cat.jpg s3://saa-images-dat/\naws sqs receive-message --queue-url <thumbnail-url> --wait-time-seconds 10\naws sqs receive-message --queue-url <watermark-url> --wait-time-seconds 10\naws sns publish --topic-arn <topic-arn> --message 'payment-1001 completed'" },
      { title: "Lọc tin bằng Subscription filter policy", detail: "<strong>SNS → Subscriptions → (saa-watermark) → Edit → Subscription filter policy</strong> → Message attributes, policy chỉ nhận <code>type = image</code>. Publish kèm attribute và không kèm để thấy khác biệt. Trong Spring Boot, mỗi service có <code>@SqsListener</code> riêng cho queue của mình.", cli: "aws sns publish --topic-arn <topic-arn> --message 'img-2' --message-attributes 'type={DataType=String,StringValue=image}'" }
    ],
    verify: ["Mỗi lần upload .jpg, cả 2 queue đều có 1 tin", "Tin publish thủ công vào cả 2 queue (trước khi bật filter)", "Sau khi bật filter, saa-watermark chỉ nhận tin có type=image"],
    cleanup: ["Xóa event notification và bucket", "Xóa 2 subscription, topic saa-image-uploaded", "Xóa queue saa-thumbnail, saa-watermark"],
    examLink: "1 sự kiện → nhiều consumer độc lập, không mất tin → SNS + SQS fan-out. S3 không cho 2 rule trùng event/suffix tới 2 đích → S3 → SNS → nhiều SQS. Cần thứ tự → SNS FIFO + SQS FIFO."
  },
  33: {
    title: "Kinesis Data Streams (real-time) và Data Firehose → S3",
    type: "cli",
    duration: "40-50 phút",
    cost: "CÓ PHÍ NHỎ: Data Streams provisioned 1 shard ≈ 0,015 USD/giờ (không dùng On-demand vì đắt hơn); Firehose tính theo GB nạp (lab vài KB ≈ 0). Amazon MQ tính theo giờ broker → không tạo. Xóa stream ngay sau lab.",
    goal: "Ghi và đọc dữ liệu clickstream qua Kinesis Data Streams (có replay), sau đó dùng Firehose đổ dữ liệu gần thời gian thực vào S3 mà không cần viết consumer.",
    prerequisites: ["AWS CLI v2", "Một bucket S3 đích, ví dụ saa-firehose-<tên>"],
    steps: [
      { title: "Tạo Data Stream 1 shard", detail: "<strong>Kinesis → Data streams → Create data stream</strong> → tên <code>saa-clicks</code> → Capacity mode <strong>Provisioned</strong>, shards <code>1</code>. Retention mặc định 24h (tăng tới 365 ngày có phí).", cli: "aws kinesis create-stream --stream-name saa-clicks --shard-count 1 --region ap-southeast-1\naws kinesis wait stream-exists --stream-name saa-clicks" },
      { title: "Producer ghi bản ghi", detail: "Partition key quyết định shard; cùng key giữ thứ tự. CLI v2 cần cờ raw-in-base64-out để gửi text.", cli: "aws kinesis put-record --stream-name saa-clicks --partition-key user-dat --data 'page=home' --cli-binary-format raw-in-base64-out\naws kinesis put-record --stream-name saa-clicks --partition-key user-dat --data 'page=cart' --cli-binary-format raw-in-base64-out" },
      { title: "Consumer đọc và replay", detail: "Lấy shard iterator từ đầu (TRIM_HORIZON) rồi đọc. Dữ liệu trả về dạng base64. Chạy lại lần nữa vẫn đọc được → dữ liệu được lưu để nhiều ứng dụng replay.", cli: "IT=$(aws kinesis get-shard-iterator --stream-name saa-clicks --shard-id shardId-000000000000 --shard-iterator-type TRIM_HORIZON --query ShardIterator --output text)\naws kinesis get-records --shard-iterator $IT" },
      { title: "Consumer Java (tham khảo)", detail: "Trong Java dùng <strong>KCL 2.x</strong> (Kinesis Client Library, checkpoint lưu ở DynamoDB) hoặc Lambda event source mapping với <code>KinesisEvent</code>. Producer dùng <code>KinesisAsyncClient.putRecord(...)</code> của SDK v2 hoặc KPL để gom batch." },
      { title: "Tạo Firehose → S3", detail: "<strong>Amazon Data Firehose → Create Firehose stream</strong> → Source <strong>Direct PUT</strong>, Destination <strong>Amazon S3</strong> → tên <code>saa-firehose</code> → chọn bucket, prefix <code>clicks/</code> → Buffer interval <code>60</code> giây → Create. Trên trang stream, mở <strong>Test with demo data → Start sending demo data</strong>, chờ 1-2 phút rồi Stop." },
      { title: "Kiểm tra S3", detail: "Firehose ghi file theo cấu trúc <code>clicks/YYYY/MM/DD/HH/</code>. Không có replay như Data Streams.", cli: "aws s3 ls s3://saa-firehose-dat/clicks/ --recursive" }
    ],
    verify: ["get-records trả về 2 bản ghi (giải mã base64 thấy page=home, page=cart)", "Đọc lại lần 2 bằng TRIM_HORIZON vẫn thấy dữ liệu", "File demo xuất hiện trong S3 sau ~60 giây"],
    cleanup: ["aws kinesis delete-stream --stream-name saa-clicks", "Xóa Firehose stream saa-firehose và IAM role tự tạo", "Empty và xóa bucket"],
    examLink: "Real-time ~200ms, xử lý tùy biến, replay, nhiều consumer → Kinesis Data Streams. Near real-time (≥60s), đổ thẳng S3/Redshift/OpenSearch, ít vận hành → Firehose. Lift-and-shift JMS/AMQP/MQTT → Amazon MQ."
  },
  34: {
    title: "Đóng gói Spring Boot lên ECR và chạy trên ECS Fargate",
    type: "console",
    duration: "50-60 phút",
    cost: "CÓ PHÍ NHỎ: Fargate không có Free Tier (0,5 vCPU + 1 GB ≈ 0,025 USD/giờ). ECR 500 MB/tháng miễn phí (Free Tier). Public IPv4 ≈ 0,005 USD/giờ. Dừng task ngay sau lab.",
    goal: "Build image Docker cho ứng dụng Spring Boot, đẩy lên Amazon ECR, chạy trên ECS Fargate không quản lý server, gắn Task Role để container gọi S3 an toàn.",
    prerequisites: ["Docker Desktop", "Project Spring Boot có endpoint /actuator/health (port 8080)", "AWS CLI v2"],
    steps: [
      { title: "Build image", detail: "Dockerfile tối giản: <code>FROM eclipse-temurin:21-jre</code>, <code>COPY target/app.jar /app.jar</code>, <code>ENTRYPOINT [&quot;java&quot;,&quot;-jar&quot;,&quot;/app.jar&quot;]</code>. Nếu dùng máy Apple Silicon, build với <code>--platform linux/amd64</code>.", cli: "mvn -DskipTests package\ndocker build --platform linux/amd64 -t saa-app:1.0 ." },
      { title: "Tạo repository ECR và push", detail: "<strong>ECR → Private registry → Repositories → Create repository</strong> → <code>saa-app</code>, bật <strong>Scan on push</strong>. Hoặc dùng CLI:", cli: "aws ecr create-repository --repository-name saa-app --image-scanning-configuration scanOnPush=true --region ap-southeast-1\naws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin <ACCOUNT_ID>.dkr.ecr.ap-southeast-1.amazonaws.com\ndocker tag saa-app:1.0 <ACCOUNT_ID>.dkr.ecr.ap-southeast-1.amazonaws.com/saa-app:1.0\ndocker push <ACCOUNT_ID>.dkr.ecr.ap-southeast-1.amazonaws.com/saa-app:1.0" },
      { title: "Tạo Task Role", detail: "<strong>IAM → Roles → Create role</strong> → Trusted entity <strong>AWS service → Elastic Container Service → Elastic Container Service Task</strong> → gắn <code>AmazonS3ReadOnlyAccess</code> → tên <code>saa-app-task-role</code>. Phân biệt: <strong>Task execution role</strong> (ecsTaskExecutionRole) dùng để kéo image ECR và ghi log; <strong>Task role</strong> là quyền của code Java bên trong." },
      { title: "Tạo cluster và Task Definition", detail: "<strong>ECS → Clusters → Create cluster</strong> <code>saa-cluster</code>, Infrastructure <strong>AWS Fargate (serverless)</strong>. <strong>Task definitions → Create new task definition</strong> → Launch type <strong>AWS Fargate</strong>, OS Linux/X86_64, CPU <code>.5 vCPU</code>, Memory <code>1 GB</code> → Task role <code>saa-app-task-role</code>, Task execution role <strong>Create new role</strong> → Container: image URI ECR, port mapping <code>8080</code> TCP, Log collection CloudWatch bật." },
      { title: "Chạy task", detail: "<strong>Clusters → saa-cluster → Tasks → Run new task</strong> → Compute options <strong>Launch type: FARGATE</strong> → Task definition vừa tạo → Networking: default VPC, public subnet, SG mới mở <strong>TCP 8080</strong> từ My IP, <strong>Public IP: ON</strong> → Create. Khi task RUNNING, lấy Public IP ở tab Configuration.", cli: "curl http://<task-public-ip>:8080/actuator/health" },
      { title: "Kiểm tra Task Role trong code", detail: "Trong ứng dụng, tạo <code>S3Client.create()</code> (không truyền access key) và gọi <code>listBuckets()</code>: SDK tự lấy credential tạm thời của Task Role qua container credentials endpoint. Xem log ở <strong>CloudWatch Logs → /ecs/&lt;task-family&gt;</strong>." }
    ],
    verify: ["Image xuất hiện trong ECR, kết quả scan hiển thị", "Task trạng thái RUNNING, /actuator/health trả về UP", "Code liệt kê được bucket S3 mà không cấu hình access key"],
    cleanup: ["Stop task trong saa-cluster", "Delete cluster saa-cluster; Deregister task definition", "Xóa repository saa-app (force) và SG 8080", "Xóa role saa-app-task-role"],
    examLink: "Chạy container, không quản lý server, ít vận hành → ECS Fargate. Đã có Kubernetes/đa đám mây → EKS. Container cần quyền S3/DynamoDB → ECS Task Role (không dùng EC2 instance profile). Chia sẻ file giữa task đa AZ → EFS."
  },
  35: {
    title: "Lambda Java 21: giới hạn, cấu hình bộ nhớ và SnapStart",
    type: "console",
    duration: "40-50 phút",
    cost: "Miễn phí (Free Tier 1 triệu request + 400.000 GB-giây/tháng; SnapStart cho Java không tính thêm phí). Không gắn VPC + NAT Gateway (NAT có phí theo giờ).",
    goal: "Triển khai hàm Lambda Java, đo cold start trước/sau khi bật SnapStart, thử nghiệm Timeout và bộ nhớ để ghi nhớ các giới hạn cứng của Lambda.",
    prerequisites: ["JDK 21 + Maven", "Thư viện com.amazonaws:aws-lambda-java-core", "AWS CLI v2"],
    steps: [
      { title: "Viết và đóng gói hàm", detail: "Class <code>com.saa.Hello implements RequestHandler&lt;Map&lt;String,Object&gt;, String&gt;</code>, trả về chuỗi chào kèm thời gian. Dùng maven-shade-plugin tạo fat jar (giới hạn: 50 MB zip upload trực tiếp, 250 MB giải nén; lớn hơn dùng S3 hoặc container image tới 10 GB).", cli: "mvn clean package" },
      { title: "Tạo hàm", detail: "<strong>Lambda → Create function → Author from scratch</strong> → <code>saa-java-hello</code>, Runtime <strong>Java 21</strong>, Architecture x86_64 → Create → <strong>Code → Upload from → .zip or .jar file</strong> → <strong>Runtime settings → Edit</strong> Handler <code>com.saa.Hello::handleRequest</code>." },
      { title: "Đo cold start", detail: "Tab <strong>Test</strong> → tạo event mặc định → Test. Trong log xem dòng <code>REPORT</code>: <strong>Init Duration</strong> (cold start). Đổi <strong>Configuration → General configuration → Edit → Memory</strong> từ 512 MB lên 2048 MB → test lại: CPU tăng theo RAM nên Init và Duration giảm." },
      { title: "Bật SnapStart", detail: "<strong>Configuration → General configuration → Edit → SnapStart: PublishedVersions</strong> → Save. Sau đó <strong>Actions → Publish new version</strong> (SnapStart chỉ áp dụng cho version đã publish, không áp dụng $LATEST). Gọi version mới, log hiển thị <strong>Restore Duration</strong> thay vì Init Duration dài.", cli: "aws lambda update-function-configuration --function-name saa-java-hello --snap-start ApplyOn=PublishedVersions\naws lambda publish-version --function-name saa-java-hello\naws lambda invoke --function-name saa-java-hello:1 out.json" },
      { title: "Thử giới hạn Timeout", detail: "Thêm <code>Thread.sleep(5000)</code>, đặt Timeout = 3 giây → lỗi <code>Task timed out after 3.00 seconds</code>. Thử nhập Timeout 16 phút → console không cho (tối đa 900 giây). Ghi nhớ: RAM tối đa 10.240 MB, /tmp tối đa 10 GB, concurrency mặc định 1.000/region." },
      { title: "Ghi chú tích hợp VPC", detail: "Mở <strong>Configuration → VPC</strong> (không lưu): khi gắn private subnet để gọi RDS, Lambda mất Internet; muốn gọi API ngoài phải có route qua NAT Gateway, gọi S3/DynamoDB nên dùng VPC Gateway Endpoint. Xem thêm <strong>Configuration → Concurrency</strong> (Reserved vs Provisioned concurrency)." }
    ],
    verify: ["Log REPORT có Init Duration ở lần chạy đầu", "Version có SnapStart hiển thị Restore Duration và nhanh hơn rõ rệt", "Timeout 3 giây gây lỗi Task timed out", "Không thể đặt Timeout > 15 phút"],
    cleanup: ["Xóa hàm saa-java-hello (kèm các version)", "Xóa log group /aws/lambda/saa-java-hello và execution role"],
    examLink: "Tác vụ > 15 phút → loại Lambda, chọn Fargate/Batch. Tăng RAM = tăng CPU. Cold start Java/Spring → SnapStart. Lambda trong private subnet cần gọi Internet → NAT Gateway. Quá nhiều kết nối DB → RDS Proxy."
  },
  36: {
    title: "HTTP API Gateway + Lambda + Cognito JWT và Step Functions",
    type: "console",
    duration: "60 phút",
    cost: "Miễn phí (Free Tier API Gateway 1 triệu HTTP API call/tháng trong 12 tháng đầu, Cognito 10.000 MAU Lite tier, Lambda, Step Functions Standard 4.000 state transitions/tháng).",
    goal: "Bảo vệ API serverless bằng Cognito User Pool (JWT authorizer trên HTTP API), gọi API có token, và điều phối quy trình đơn hàng nhiều bước với Step Functions có Retry.",
    prerequisites: ["Hàm Lambda đơn giản (ví dụ saa-java-hello từ Lab 35 hoặc Python trả về JSON)", "AWS CLI v2, curl"],
    steps: [
      { title: "Tạo Cognito User Pool", detail: "<strong>Cognito → User pools → Create user pool</strong> → Application type <strong>Single-page application (SPA)</strong> (app client không có secret) → tên app <code>saa-web</code> → Sign-in identifier <strong>Email</strong> → Create. Vào <strong>App clients → saa-web → Edit</strong> bật <strong>ALLOW_USER_PASSWORD_AUTH</strong>. Ghi lại User pool ID và Client ID." },
      { title: "Tạo user test", detail: "Tạo user và đặt mật khẩu vĩnh viễn để bỏ qua bước đổi mật khẩu, rồi lấy IdToken.", cli: "aws cognito-idp admin-create-user --user-pool-id <POOL_ID> --username dev@example.com --message-action SUPPRESS\naws cognito-idp admin-set-user-password --user-pool-id <POOL_ID> --username dev@example.com --password 'Passw0rd!2026' --permanent\naws cognito-idp initiate-auth --auth-flow USER_PASSWORD_AUTH --client-id <CLIENT_ID> --auth-parameters USERNAME=dev@example.com,PASSWORD='Passw0rd!2026' --query AuthenticationResult.IdToken --output text" },
      { title: "Tạo HTTP API tích hợp Lambda", detail: "<strong>API Gateway → Create API → HTTP API → Build</strong> → Integrations: <strong>Lambda</strong>, chọn hàm → API name <code>saa-api</code> → Route <code>GET /orders</code> → Stage <code>$default</code> (auto-deploy) → Create. Gọi thử không token: trả về dữ liệu (chưa bảo vệ)." },
      { title: "Gắn JWT Authorizer Cognito", detail: "<strong>saa-api → Authorization → Manage authorizers → Create</strong> → Type <strong>JWT</strong> → Issuer URL <code>https://cognito-idp.ap-southeast-1.amazonaws.com/&lt;POOL_ID&gt;</code> → Audience <code>&lt;CLIENT_ID&gt;</code> → Create → <strong>Attach authorizers to routes</strong> chọn <code>GET /orders</code>.", cli: "curl -i https://<api-id>.execute-api.ap-southeast-1.amazonaws.com/orders\ncurl -i -H 'Authorization: Bearer <ID_TOKEN>' https://<api-id>.execute-api.ap-southeast-1.amazonaws.com/orders" },
      { title: "Throttling", detail: "<strong>saa-api → Protect → Throttling → Edit</strong> cho stage <code>$default</code>: Rate 5, Burst 10. Bắn nhanh 50 request có token → xuất hiện HTTP <code>429 Too Many Requests</code>. (REST API mới có API Caching và Usage Plans/API keys.)" },
      { title: "Step Functions quy trình đơn hàng", detail: "<strong>Step Functions → State machines → Create state machine</strong> → Blank, type <strong>Standard</strong> → kéo thả: <strong>Lambda Invoke</strong> (ValidateOrder) → <strong>Wait</strong> 5 giây → <strong>Choice</strong> (total &gt; 1000000 → nhánh ManualApproval dạng Pass, ngược lại → ChargePayment Lambda) → <strong>Succeed</strong>. Ở state Lambda, tab <strong>Error handling → Retrier</strong>: MaxAttempts 3, BackoffRate 2. Start execution và xem Graph view từng bước." }
    ],
    verify: ["Gọi /orders không token → 401 Unauthorized; có IdToken → 200", "Bắn tải vượt ngưỡng → 429", "Execution Step Functions hiển thị đường đi đúng nhánh Choice, Retry được ghi trong Event history"],
    cleanup: ["Xóa HTTP API saa-api", "Xóa State machine và role tự tạo", "Xóa User pool (tắt Deletion protection trước nếu có)", "Xóa Lambda và log group nếu không dùng tiếp"],
    examLink: "Chat 2 chiều serverless → API Gateway WebSocket + Lambda + DynamoDB. Đăng nhập user web/mobile, bảo vệ API → Cognito User Pools; cấp credential AWS tạm thời cho app upload S3 → Identity Pools. Điều phối nhiều Lambda, retry, phê duyệt thủ công → Step Functions (không gọi Lambda lồng nhau)."
  }
});
