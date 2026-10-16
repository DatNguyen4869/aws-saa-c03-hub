// Bộ Giáo Trình Chi Tiết Toàn Diện Phần 4 (Buổi 44 -> 56: Chặng 6, Chặng 7 & Bộ Nạp Toàn Diện)
window.DEEP_CONTENT_PART4 = {
  44: {
    jargon: [
      { term: "Apache Parquet & ORC (Định dạng lưu trữ theo Cột)", plain: "File CSV hay JSON lưu theo từng dòng (muốn tính tổng cột Lương phải đọc hết cả 50 cột khác rất tốn tiền). File Parquet/ORC nén dữ liệu theo từng CỘT — giúp Amazon Athena chỉ đọc đúng cột cần tìm, nhanh gấp 10 lần và giảm 90% hóa đơn tiền quét S3!" },
      { term: "AWS Glue Crawler & Glue Data Catalog", plain: "Con robot tự động bò vào kho S3 đọc thử các file CSV/JSON/Parquet để tự đoán xem file đó có những cột gì (kiểu số hay kiểu chữ) rồi ghi cấu trúc bảng vào cuốn mục lục Glue Data Catalog cho Athena dùng." },
      { term: "Amazon EMR (Elastic MapReduce)", plain: "Cụm máy chủ Big Data quản lý sẵn chạy Apache Spark, Hadoop, Hive, Presto để nghiền nát hàng trăm Terabyte dữ liệu (hỗ trợ dùng máy Spot cho các Task Nodes để tiết kiệm tới 90% chi phí!)." }
    ],
    diagram: `
Chuỗi Phân Tích Dữ Liệu Serverless (Data Lake Pipeline) Kinh Điển Nhất Đề Thi:
[File Log/CSV thô trên S3] ──► [AWS Glue Crawler & ETL] (Chuyển sang chuẩn cột Apache Parquet)
                                         │
                                         ▼
                        [Amazon Athena] (Chạy câu lệnh SQL trực tiếp trên S3, $5/TB)
                                         │
                                         ▼
                        [Amazon QuickSight (Bộ nhớ đệm SPICE)] (Vẽ biểu đồ BI Dashboard báo cáo Sếp!)`,
    deepSections: [
      {
        title: "1. Bộ tứ Data Lake Serverless: S3 + Glue + Athena + QuickSight",
        content: "• <strong>Amazon Athena</strong>: Chạy SQL chuẩn trực tiếp trên file lưu trong S3 (Serverless). Khi đề bài hỏi <em>'Làm thế nào để tăng tốc truy vấn và giảm tối đa chi phí cho Amazon Athena?'</em> → Nhớ ngay 3 việc: (1) Dùng <strong>AWS Glue</strong> chuyển đổi dữ liệu sang định dạng cột <strong>Apache Parquet hoặc ORC</strong>; (2) <strong>Nén dữ liệu (Compress)</strong>; và (3) <strong>Phân vùng thư mục S3 theo ngày/tháng (Partitioning: <code>s3://bucket/year=2025/month=10/</code>)</strong>.<br>• <strong>AWS Glue vs AWS Glue DataBrew</strong>: Glue là dịch vụ Serverless ETL viết code (Python/Spark). Còn nếu đề bài nói <em>'Các nhà phân tích dữ liệu không biết lập trình (No-code / Visual interface) muốn tự làm sạch và chuẩn hóa dữ liệu trực quan'</em> → Chọn <strong>AWS Glue DataBrew</strong>!<br>• <strong>AWS Lake Formation</strong>: Quản trị bảo mật tập trung cho S3 Data Lake, cho phép phân quyền chi tiết đến <strong>từng dòng, từng cột và từng ô dữ liệu (Row-level, Column-level, Cell-level security)</strong>.<br>• <strong>Amazon QuickSight</strong>: Công cụ vẽ biểu đồ BI Serverless, có bộ nhớ đệm <strong>SPICE</strong> và hỗ trợ phân quyền theo từng người xem (Row-Level Security - RLS)."
      },
      {
        title: "2. Amazon EMR (Hadoop / Spark) & Mẹo tối ưu chi phí 3 loại Node",
        content: "Khi bài toán yêu cầu xử lý Big Data bằng <strong>Apache Spark, Hadoop, Hive, HBase, Presto</strong> với khả năng tùy chỉnh cụm máy chủ:<br>• Một cụm Amazon EMR gồm 3 loại Node:<br>  1. <strong>Master Node</strong>: Điều phối cụm (Luôn dùng <em>On-Demand / Reserved</em>).<br>  2. <strong>Core Nodes</strong>: Vừa chạy tác vụ vừa lưu dữ liệu HDFS (Nên dùng <em>On-Demand / Reserved</em> để không mất dữ liệu HDFS).<br>  3. <strong>Task Nodes (Tùy chọn)</strong>: Chỉ thuần túy tính toán CPU, <strong>KHÔNG lưu giữ dữ liệu HDFS</strong> → <strong>Luôn chọn EC2 Spot Instances cho các Task Nodes</strong> để tiết kiệm tới 90% chi phí mà không bao giờ sợ mất dữ liệu!"
      }
    ],
    extraCards: [
      { q: "Trong một cụm Amazon EMR (chạy Apache Spark/Hadoop), loại Node nào không lưu trữ dữ liệu HDFS và luôn được khuyến nghị sử dụng EC2 Spot Instances để tối ưu chi phí?", a: "Task Nodes (trong khi Master Node và Core Nodes nên dùng On-Demand hoặc Reserved Instances)." },
      { q: "Dịch vụ nào giúp xây dựng và quản lý Data Lake trên S3 nhanh chóng, đồng thời cung cấp khả năng phân quyền truy cập chi tiết ở cấp độ từng dòng và từng cột (Row-level and Column-level security) cho Athena/Redshift/QuickSight?", a: "AWS Lake Formation." },
      { q: "Khi các chuyên viên phân tích kinh doanh muốn tự làm sạch, chuẩn hóa dữ liệu trên S3 thông qua giao diện kéo thả trực quan với hơn 250 phép biến đổi dựng sẵn mà KHÔNG cần viết code ETL, ta chọn công cụ nào?", a: "AWS Glue DataBrew." }
    ],
    quizzes: [
      {
        qEn: "A company stores 50 TB of application logs in CSV format in an Amazon S3 bucket. Data analysts use Amazon Athena to run ad-hoc SQL queries on these logs, but the queries are slow and monthly Athena costs are very high because each query scans the entire CSV dataset. How can the solutions architect significantly improve query performance and reduce Athena costs?",
        qVi: "Công ty lưu 50 TB file log định dạng CSV trên S3. Đội phân tích dùng Amazon Athena chạy SQL nhưng tốc độ rất chậm và tốn nhiều tiền vì mỗi lần chạy phải quét toàn bộ file CSV. Làm sao tăng tốc truy vấn và giảm mạnh chi phí Athena?",
        options: [
          "A. Move the CSV files to S3 Glacier Deep Archive.",
          "B. Use AWS Glue ETL to convert the CSV files into compressed columnar format (Apache Parquet or ORC) and partition the data by date in Amazon S3.",
          "C. Place Amazon CloudFront in front of the S3 bucket.",
          "D. Rename the S3 bucket."
        ],
        correctIdx: 1,
        explanation: "Athena tính phí $5 trên mỗi TB dữ liệu quét qua. Chuyển CSV sang định dạng cột nén (Apache Parquet/ORC) và phân vùng dữ liệu (Partitioning) giúp Athena chỉ đọc đúng các cột và phân vùng cần thiết, giảm tới 90% lượng dữ liệu phải quét."
      },
      {
        qEn: "A company is building a central data lake on Amazon S3 accessed by multiple departments using Amazon Athena and Amazon QuickSight. Compliance rules require centralized governance with fine-grained column-level and row-level access controls so that HR analysts can see salary columns while Marketing analysts cannot. Which service provides this with the LEAST effort?",
        qVi: "Công ty xây dựng Data Lake trên S3 cho nhiều phòng ban truy cập qua Athena và QuickSight. Luật yêu cầu quản trị tập trung và phân quyền chi tiết đến từng dòng và từng cột (ví dụ phòng Nhân sự thấy cột Lương, còn phòng Marketing bị ẩn cột Lương). Dịch vụ nào đáp ứng tốn ít công sức nhất?",
        options: [
          "A. S3 Object Lock",
          "B. AWS Lake Formation",
          "C. AWS WAF",
          "D. IAM Credentials Report"
        ],
        correctIdx: 1,
        explanation: "AWS Lake Formation quản lý quyền truy cập Data Lake tập trung và hỗ trợ sẵn tính năng bảo mật cấp độ bảng, cột (Column-level) và dòng (Row-level/Cell-level) cho S3, Athena, Redshift và QuickSight."
      }
    ]
  },

  45: {
    jargon: [
      { term: "Amazon Textract (OCR Thông minh)", plain: "Khác với Rekognition chỉ nhận diện biển báo giao thông trong ảnh, Textract chuyên đọc các tờ hóa đơn, hợp đồng PDF scan, biểu mẫu ngân hàng để bóc tách chữ viết tay, các ô tích chọn và các bảng biểu ra thành dữ liệu có cấu trúc!" },
      { term: "Amazon Personalize", plain: "Công nghệ gợi ý mua hàng (Recommendation Engine) giống hệt trang chủ Amazon.com hay Netflix: Đưa lịch sử xem hàng của khách vào, nó tự động gợi ý các món đồ khách đó dễ mua tiếp theo nhất." },
      { term: "PII Redaction (Trên Transcribe & Comprehend)", plain: "Tự động phát hiện và bôi đen / ẩn đi các thông tin cá nhân nhạy cảm (tên tuổi, số căn cước, số thẻ ngân hàng, địa chỉ nhà) trong bản ghi âm cuộc gọi hoặc văn bản." }
    ],
    diagram: `
Bảng Ghép Cặp Nhanh 10 Dịch Vụ AI/ML Trong Đề Thi SAA-C03:
 ├── Nhận diện Khuôn mặt, Đồ vật, Kiểm duyệt ảnh/video nhạy cảm? ──► [Amazon Rekognition]
 ├── Bóc tách chữ viết, Bảng biểu, Hóa đơn, Biểu mẫu PDF Scan?   ──► [Amazon Textract]
 ├── Chuyển Giọng nói thành Văn bản (Speech-to-Text + Ẩn PII)?   ──► [Amazon Transcribe]
 ├── Chuyển Văn bản thành Giọng nói đọc tự nhiên (Text-to-Speech)?──► [Amazon Polly]
 ├── Hiểu ngôn ngữ tự nhiên (NLP), Phân tích cảm xúc khen/chê?   ──► [Amazon Comprehend]
 ├── Tổng đài điện thoại đám mây + Chatbot trả lời tự động?      ──► [Amazon Connect] + [Amazon Lex]
 ├── Tìm kiếm tài liệu nội bộ công ty bằng câu hỏi tự nhiên?     ──► [Amazon Kendra]
 └── Hệ thống Gợi ý sản phẩm / phim ảnh cá nhân hóa thời gian thực?──► [Amazon Personalize]`,
    deepSections: [
      {
        title: "1. Những cặp dịch vụ AI rất dễ nhầm trong đề thi và cách phân biệt",
        content: "• <strong>Amazon Rekognition vs Amazon Textract</strong>:<br>  - Nếu đề bài nói tới <em>Ảnh chụp camera, Video, nhận diện khuôn mặt người nổi tiếng, phát hiện đồ bảo hộ lao động (PPE), kiểm duyệt hình ảnh bạo lực/nhạy cảm (Content moderation)</em> → Chọn <strong>Amazon Rekognition</strong>.<br>  - Nếu đề bài nói tới <em>Trích xuất văn bản, chữ viết tay, bảng biểu (tables) và trường dữ liệu từ hóa đơn tài chính, đơn xin vay vốn, bệnh án scan (Scanned documents / Forms / Receipts / PDFs)</em> → Chọn <strong>Amazon Textract</strong>!<br>• <strong>Amazon Transcribe vs Amazon Comprehend</strong>:<br>  - <strong>Transcribe</strong> biến file âm thanh (<code>.mp3/.wav</code>) thành dòng chữ văn bản (có tính năng tự động ẩn thông tin cá nhân <em>PII Redaction</em> và phân biệt giọng nói giữa nhân viên tổng đài với khách hàng <em>Speaker diarization</em>).<br>  - <strong>Comprehend</strong> đọc dòng chữ văn bản đó để hiểu xem khách hàng đang vui hay đang giận dữ (<em>Sentiment analysis</em>) hoặc tự động gom nhóm chủ đề và phát hiện PII trong văn bản."
      },
      {
        title: "2. Các dịch vụ AI chuyên biệt: Kendra, Personalize, Forecast & Fraud Detector",
        content: "• <strong>Amazon Kendra</strong>: Công cụ tìm kiếm thông minh trong doanh nghiệp (Enterprise Search) dùng ML kết nối vào S3, SharePoint, Salesforce, Confluence để nhân viên gõ câu hỏi tự nhiên như <em>'Quy định nghỉ phép thai sản của công ty là gì?'</em> và nhận ngay đoạn trả lời chính xác.<br>• <strong>Amazon Personalize</strong>: Xây dựng hệ thống <strong>Gợi ý sản phẩm thời gian thực (Real-time personalized recommendations)</strong>.<br>• <strong>Amazon Forecast</strong>: Dự báo chuỗi thời gian (dự báo nhu cầu hàng tồn kho, doanh số, tài nguyên).<br>• <strong>Amazon Fraud Detector</strong>: Phát hiện gian lận trực tuyến (tạo tài khoản ảo, thanh toán thẻ chùa)."
      }
    ],
    extraCards: [
      { q: "Một ngân hàng muốn tự động số hóa hàng triệu trang hồ sơ vay vốn dạng PDF scan và ảnh chụp hóa đơn, yêu cầu trích xuất chính xác cả văn bản, chữ viết tay lẫn cấu trúc các bảng biểu (Tables) và biểu mẫu (Forms). Chọn dịch vụ AI nào?", a: "Amazon Textract." },
      { q: "Một trang thương mại điện tử muốn tích hợp tính năng 'Gợi ý sản phẩm cá nhân hóa theo thời gian thực' cho từng khách hàng mà đội ngũ lập trình viên không có kiến thức chuyên sâu về Machine Learning. Chọn dịch vụ nào?", a: "Amazon Personalize." },
      { q: "Công ty muốn xây dựng một cổng tìm kiếm nội bộ thông minh cho phép nhân viên đặt câu hỏi bằng ngôn ngữ tự nhiên để tra cứu thông tin nằm rải rác trong hàng triệu file PDF trên S3, SharePoint và Salesforce. Chọn dịch vụ nào?", a: "Amazon Kendra." }
    ],
    quizzes: [
      {
        qEn: "A healthcare company wants to digitize millions of scanned paper medical intake forms and insurance claim PDFs. The solution must automatically extract printed text, handwriting, checkboxes, and structured table data without requiring machine learning expertise. Which AWS service should be used?",
        qVi: "Công ty y tế muốn số hóa hàng triệu tờ khai bệnh án giấy đã scan và file PDF bảo hiểm. Giải pháp phải tự động trích xuất chữ in, chữ viết tay, các ô tích chọn và dữ liệu bảng có cấu trúc mà không cần kiến thức chuyên gia ML. Dùng dịch vụ nào?",
        options: [
          "A. Amazon Rekognition",
          "B. Amazon Textract",
          "C. Amazon Comprehend",
          "D. Amazon Transcribe"
        ],
        correctIdx: 1,
        explanation: "Amazon Textract là dịch vụ OCR thông minh chuyên trích xuất văn bản, chữ viết tay, biểu mẫu (forms) và bảng biểu (tables) từ các tài liệu quét (scanned documents/PDFs)."
      },
      {
        qEn: "A company operates a customer call center using Amazon Connect. All call audio recordings are saved to Amazon S3. The company wants to convert the audio recordings into text, automatically mask any customer credit card numbers or Social Security numbers in the text, and then analyze the text to determine whether customer sentiment is positive or negative. Which combination of services meets these requirements?",
        qVi: "Công ty vận hành tổng đài dùng Amazon Connect lưu file ghi âm cuộc gọi vào S3. Họ muốn chuyển giọng nói thành văn bản, tự động che giấu thông tin nhạy cảm (PII) như số thẻ tín dụng, sau đó phân tích xem thái độ khách hàng là tích cực hay tiêu cực. Kết hợp dịch vụ nào đáp ứng được?",
        options: [
          "A. Amazon Polly and Amazon Translate",
          "B. Amazon Transcribe (with PII Redaction enabled) combined with Amazon Comprehend (for Sentiment Analysis)",
          "C. Amazon Textract and Amazon Kendra",
          "D. Amazon Lex and Amazon Rekognition"
        ],
        correctIdx: 1,
        explanation: "Amazon Transcribe chuyển âm thanh thành văn bản kèm tính năng ẩn PII (PII Redaction), sau đó Amazon Comprehend thực hiện phân tích cảm xúc (Sentiment Analysis) trên văn bản đó."
      }
    ]
  },

  46: {
    jargon: [
      { term: "CloudWatch Unified Agent", plain: "Phần mềm nhỏ cài thêm vào bên trong hệ điều hành của máy EC2 để báo cáo dung lượng RAM đang dùng và dung lượng Ổ cứng còn trống về cho CloudWatch (vì mặc định CloudWatch mù tịt không nhìn thấy RAM và Disk Space!)." },
      { term: "CloudTrail Management Events vs Data Events", plain: "Management Events (Ghi sẵn mặc định) = Các lệnh quản trị lớn như Tạo/Xóa máy chủ EC2, Tạo S3 Bucket, Sửa Security Group. Data Events (Tắt mặc định vì tốn tiền) = Các lệnh đọc/ghi chi tiết từng file S3 (GetObject/PutObject) hoặc từng lần gọi hàm Lambda!" },
      { term: "AWS Config Auto-Remediation", plain: "Thanh tra tự động sửa sai: Khi AWS Config phát hiện có ai đó vừa mở cổng 22 (SSH) ra toàn thế giới trái quy định, nó tự động gọi SSM Automation đóng sập cổng 22 đó lại ngay lập tức!" }
    ],
    diagram: `
Phân Biệt Bộ Ba Giám Sát Trong 5 Giây:
 1. [Amazon CloudWatch] ──► Hiệu năng & Logs (CPU, Network, cài thêm Agent để đo RAM/Disk) + Báo động Alarm!
 2. [AWS CloudTrail]    ──► Camera Kiểm toán API ("AI đã bấm nút xóa DB? Từ IP nào? Lúc mấy giờ?").
 3. [AWS Config]        ──► Thanh tra Cấu hình & Tuân thủ ("Ổ EBS này có bật mã hóa không? SG có mở cổng 22 không?") + Tự động sửa sai!`,
    deepSections: [
      {
        title: "1. Những bẫy đề thi kinh điển về Amazon CloudWatch",
        content: "• <strong>Bẫy số 1 (Hỏi nhiều nhất!)</strong>: Mặc định CloudWatch chỉ đo được các chỉ số ở tầng ảo hóa bên ngoài (CPU Utilization, Network In/Out, Disk Read/Write IOPS). Nó <strong>KHÔNG THỂ đo được <code>Memory (RAM) Utilization</code>, <code>Disk Space Utilization (% ổ cứng còn trống)</code> hay <code>Swap Usage</code></strong>! Hễ đề bài đòi cảnh báo khi RAM vượt 80% hoặc ổ cứng đầy 90% → Bắt buộc phải chọn đáp án <strong>Cài đặt CloudWatch Unified Agent lên máy EC2</strong>!<br>• <strong>Độ phân giải chỉ số (Metric Resolution)</strong>: Mặc định EC2 gửi chỉ số mỗi 5 phút (Standard), có thể bật <em>Detailed Monitoring</em> (1 phút/lần), và với <em>Custom Metrics</em> có thể đẩy lên mức <strong>High Resolution (1 giây/lần)</strong>.<br>• <strong>CloudWatch Synthetics Canary</strong>: Tạo bot chạy định kỳ giả lập người dùng bấm vào trang web/API để phát hiện lỗi trước cả khi khách hàng thật gặp phải."
      },
      {
        title: "2. AWS CloudTrail & AWS Config chuyên sâu",
        content: "• <strong>AWS CloudTrail</strong>: Mặc định lưu lịch sử 90 ngày trong <em>Event History</em>. Muốn lưu lâu hơn 90 ngày → Tạo một <strong>Trail đẩy log về S3 Bucket</strong>. Muốn đảm bảo hacker không thể lén sửa đổi file log trên S3 mà không bị phát hiện → Bật tính năng <strong>CloudTrail Log File Integrity Validation</strong> (sử dụng hàm băm SHA-256 và chữ ký số RSA).<br>• <strong>AWS Config</strong>: Theo dõi lịch sử cấu hình và đánh giá độ tuân thủ (Compliance). Nếu đề bài hỏi: <em>'Làm thế nào để tự động đóng cổng 22 hoặc tự động bật Versioning ngay khi phát hiện có người cấu hình sai?'</em> → Dùng <strong>AWS Config Rules kết hợp với Remediations (AWS Systems Manager Automation documents)</strong>!"
      }
    ],
    extraCards: [
      { q: "Làm thế nào để đảm bảo và chứng minh với đoàn kiểm toán rằng các file nhật ký AWS CloudTrail lưu trữ trong S3 Bucket không hề bị ai chỉnh sửa hoặc xóa bớt kể từ khi được tạo ra?", a: "Bật tính năng CloudTrail Log File Integrity Validation (Xác thực tính toàn vẹn của file log bằng hàm băm SHA-256 và chữ ký số)." },
      { q: "Khi muốn tự động phát hiện bất kỳ Security Group nào bị mở cổng SSH 22 ra 0.0.0.0/0 và tự động xóa quy tắc vi phạm đó đi ngay lập tức mà không cần con người can thiệp, ta kết hợp 2 dịch vụ nào?", a: "AWS Config (Config Rule: restricted-ssh) kết hợp với AWS Systems Manager (SSM) Automation để Auto-remediation." },
      { q: "Mặc định một Trail trong AWS CloudTrail chỉ ghi lại Management Events. Nếu bộ phận bảo mật muốn ghi lại chi tiết từng lệnh đọc/ghi từng file cụ thể trên S3 (s3:GetObject, s3:PutObject) thì phải bật thêm loại sự kiện nào trong CloudTrail?", a: "CloudTrail Data Events." }
    ],
    quizzes: [
      {
        qEn: "A system administrator wants to create an Amazon CloudWatch alarm that sends an notification whenever an EC2 instance's memory (RAM) utilization exceeds 85% or its root disk free space drops below 10%. However, the administrator cannot find these metrics in the CloudWatch console. What must be done to collect these metrics?",
        qVi: "Quản trị viên muốn tạo cảnh báo CloudWatch khi dung lượng RAM của máy EC2 vượt quá 85% hoặc dung lượng trống của ổ đĩa dưới 10%, nhưng tìm mãi trong CloudWatch không thấy 2 chỉ số này. Phải làm gì để thu thập được chúng?",
        options: [
          "A. Enable EC2 Detailed Monitoring.",
          "B. Install and configure the Amazon CloudWatch Unified Agent on the EC2 instances to push custom memory and disk space utilization metrics to CloudWatch.",
          "C. Enable AWS CloudTrail Insights.",
          "D. Enable VPC Flow Logs."
        ],
        correctIdx: 1,
        explanation: "Mặc định Hypervisor của AWS không nhìn vào bên trong hệ điều hành để đo RAM hay dung lượng ổ cứng trống. Bắt buộc phải cài đặt CloudWatch Unified Agent vào trong OS của máy EC2."
      },
      {
        qEn: "A company's security team discovered that an unauthorized IAM user deleted a production Amazon RDS database yesterday afternoon. Which AWS service should the team check to identify the exact IAM user, IP address, and timestamp of the API call that deleted the database?",
        qVi: "Đội bảo mật phát hiện chiều hôm qua có kẻ đã xóa mất một cơ sở dữ liệu RDS Production. Đội ngũ nên kiểm tra dịch vụ nào để biết chính xác IAM user nào, từ địa chỉ IP nào và vào lúc mấy giờ đã gọi lệnh xóa DB đó?",
        options: [
          "A. Amazon CloudWatch Logs",
          "B. AWS CloudTrail",
          "C. AWS Config",
          "D. Amazon Inspector"
        ],
        correctIdx: 1,
        explanation: "AWS CloudTrail ghi lại toàn bộ lịch sử các lệnh gọi API (Management Events) trong tài khoản AWS, cho biết chính xác Ai (Who), Làm gì (What), Khi nào (When) và Từ IP nào (Where)."
      }
    ]
  },

  47: {
    jargon: [
      { term: "Consolidated Billing (Gộp hóa đơn)", plain: "Khi gom 20 tài khoản AWS của các phòng ban vào chung 1 AWS Organization, cuối tháng công ty chỉ phải thanh toán 1 hóa đơn tổng duy nhất và được cộng dồn mức sử dụng để hưởng chiết khấu giá sỉ + dùng ké gói Reserved Instances/Savings Plans đang dư của nhau!" },
      { term: "SCP (Service Control Policy)", plain: "Hàng rào luật pháp của Tập đoàn: SCP không bao giờ tự cấp quyền cho ai cả, nó chỉ đặt lệnh CẤM tối đa cho các tài khoản con (ví dụ: Cấm mọi tài khoản con không được tạo máy chủ ở ngoài Region Singapore, kể cả Root User của tài khoản con đó cũng phải chịu phép!)." },
      { term: "AWS Control Tower", plain: "Dịch vụ dựng sẵn một khu đô thị Đa tài khoản (Multi-account Landing Zone) chuẩn mực chỉ với vài cú click chuột — tự động cài sẵn cả hàng rào cấm SCP lẫn thanh tra AWS Config!" }
    ],
    diagram: `
Cấu trúc Cây Quản Trị Đa Tài Khoản (AWS Organizations + Control Tower):
                    [Management Account (Tài khoản Chủ - KHÔNG bị giới hạn bởi SCP!)]
                                            │
              ┌─────────────────────────────┴─────────────────────────────┐
              ▼ (Áp dụng SCP: Cấm tắt CloudTrail)                         ▼ (Áp dụng SCP: Chỉ cho dùng t3.micro)
    [OU: Production Accounts]                                   [OU: Developer Sandbox Accounts]
    (Dùng chung gói giảm giá RI/Savings Plans!)                 (Chia sẻ chung VPC Subnet qua AWS RAM!)`,
    deepSections: [
      {
        title: "1. AWS Organizations, Consolidated Billing & Service Control Policies (SCPs)",
        content: "• <strong>Lợi ích về chi phí của AWS Organizations</strong>: Các tài khoản thành viên được cộng dồn dung lượng S3/Data Transfer để hưởng mức giá bậc thang rẻ hơn (Volume discounts), và <strong>mặc định chia sẻ chung quyền lợi giảm giá của EC2 Reserved Instances & Savings Plans</strong> trong toàn bộ Organization!<br>• <strong>Quy tắc hoạt động của SCP (Service Control Policy)</strong>:<br>  - SCP <strong>KHÔNG CẤP QUYỀN</strong> (bạn vẫn phải gắn IAM Policy cho User bên trong tài khoản con). SCP chỉ đóng vai trò là <strong>bộ lọc giới hạn quyền tối đa</strong>.<br>  - SCP <strong>áp dụng cho toàn bộ Users và Roles bên trong tài khoản thành viên, BAO GỒM CẢ TÀI KHOẢN ROOT CỦA TÀI KHOẢN THÀNH VIÊN ĐÓ</strong>.<br>  - SCP <strong>KHÔNG BAO GIỜ có tác dụng lên tài khoản chủ (Management Account)</strong>."
      },
      {
        title: "2. AWS Control Tower, AWS RAM & AWS Service Catalog",
        content: "• <strong>AWS Control Tower</strong>: Khi đề bài có chữ <strong><em>'Set up and govern a secure, multi-account AWS environment (Landing Zone) based on best practices with preventive and detective guardrails'</em></strong> → Chọn ngay <strong>AWS Control Tower</strong>! (Trong đó: <em>Preventive Guardrails</em> dùng <strong>SCPs</strong> để chặn trước; còn <em>Detective Guardrails</em> dùng <strong>AWS Config</strong> để phát hiện vi phạm).<br>• <strong>AWS RAM (Resource Access Manager)</strong>: Chia sẻ tài nguyên hạ tầng giữa các tài khoản trong Organization mà không phải tạo lặp lại: <strong>VPC Subnets, AWS Transit Gateway, Route 53 Resolver Rules, License Manager, Aurora DB Clusters</strong>.<br>• <strong>AWS Service Catalog</strong>: Dùng khi công ty muốn tạo sẵn một danh mục các sản phẩm hạ tầng chuẩn (viết bằng CloudFormation) để nhân viên phòng ban tự bấm nút tạo máy chủ theo khuôn mẫu đã duyệt mà <strong>không cần cấp quyền IAM trực tiếp trên EC2/RDS cho nhân viên</strong>."
      }
    ],
    extraCards: [
      { q: "Trong AWS Control Tower, hai cơ chế bảo vệ 'Preventive Guardrails' (Rào chắn ngăn chặn) và 'Detective Guardrails' (Rào chắn phát hiện) sử dụng hai dịch vụ ngầm nào bên dưới?", a: "Preventive Guardrails sử dụng AWS Organizations Service Control Policies (SCPs); còn Detective Guardrails sử dụng AWS Config Rules." },
      { q: "Tài khoản A đã mua 10 gói EC2 Reserved Instances nhưng hiện chỉ dùng hết 6 gói. Tài khoản B nằm chung trong cùng một AWS Organization với Tài khoản A đang chạy 4 máy On-Demand cùng loại. Tài khoản B có được hưởng mức giá giảm của 4 gói RI dư thừa từ Tài khoản A không?", a: "CÓ. Nhờ tính năng Consolidated Billing trong AWS Organizations, ưu đãi giảm giá của Reserved Instances và Savings Plans được tự động chia sẻ giữa tất cả các tài khoản thành viên." },
      { q: "Service Control Policy (SCP) trong AWS Organizations có giới hạn được quyền của Management Account (Tài khoản chủ) không?", a: "KHÔNG. SCP chỉ áp dụng cho các Member Accounts (kể cả Root user của Member Account), nhưng KHÔNG bao giờ ảnh hưởng tới Management Account." }
    ],
    quizzes: [
      {
        qEn: "A company uses AWS Organizations to manage 15 AWS accounts across multiple departments. Due to European data sovereignty laws, the company must ensure that no user—including the root user of any member account—can launch AWS resources in any Region outside of eu-central-1 (Frankfurt). How can the solutions architect enforce this rule centrally?",
        qVi: "Công ty dùng AWS Organizations quản lý 15 tài khoản AWS. Do luật chủ quyền dữ liệu Châu Âu, công ty phải đảm bảo không một ai — kể cả Root user của các tài khoản thành viên — được phép tạo tài nguyên ở ngoài Region eu-central-1 (Frankfurt). Thực thi quy tắc này tập trung bằng cách nào?",
        options: [
          "A. Attach an IAM Permissions Boundary to each individual IAM user.",
          "B. Create a Service Control Policy (SCP) in AWS Organizations with an Explicit Deny for all actions when 'aws:RequestedRegion' is not 'eu-central-1', and attach it to the Root OU.",
          "C. Use AWS WAF geographic match rules.",
          "D. Configure Network ACLs."
        ],
        correctIdx: 1,
        explanation: "Service Control Policy (SCP) trong AWS Organizations cho phép áp đặt ranh giới quyền tập trung lên toàn bộ tài khoản thành viên (bao gồm cả Root user của các tài khoản đó)."
      },
      {
        qEn: "A large enterprise wants to centralize its networking by creating a single 'Network Account' that owns a VPC and its subnets, and then sharing specific subnets with multiple 'Application Accounts' within the same AWS Organization so developers can launch EC2 and RDS instances into those shared subnets. Which service enables this without VPC Peering?",
        qVi: "Tập đoàn muốn quản lý mạng tập trung bằng cách tạo 1 tài khoản Network sở hữu VPC và các Subnets, sau đó chia sẻ trực tiếp các Subnets này cho nhiều tài khoản Ứng dụng khác trong cùng AWS Organization để lập trình viên bật EC2/RDS ngay trong Subnet được chia sẻ. Dịch vụ nào giúp làm việc này?",
        options: [
          "A. AWS Resource Access Manager (AWS RAM)",
          "B. AWS Service Catalog",
          "C. AWS Secrets Manager",
          "D. Amazon Route 53"
        ],
        correctIdx: 0,
        explanation: "AWS Resource Access Manager (AWS RAM) cho phép chia sẻ VPC Subnets (VPC Sharing), Transit Gateways và Route 53 Resolver rules xuyên qua các tài khoản trong cùng một AWS Organization."
      }
    ]
  },

  48: {
    jargon: [
      { term: "CMK (Customer Managed Key) vs AWS Managed Key", plain: "AWS Managed Key (như aws/s3, aws/ebs) = Khóa miễn phí do AWS tự tạo, tự xoay vòng 1 năm/lần, bạn không chỉnh sửa quyền chia sẻ sang tài khoản khác được. Customer Managed Key (CMK) = Khóa do chính bạn tạo ($1/tháng), toàn quyền sửa Key Policy, bật/tắt xoay vòng 1 năm và chia sẻ Cross-Account!" },
      { term: "KMS Multi-Region Keys", plain: "Bộ khóa KMS song sinh có cùng chung 1 mã Key ID và cùng ruột mật mã nằm ở nhiều Region khác nhau — giúp bạn mã hóa dữ liệu ở Mỹ rồi đem sang Nhật giải mã trực tiếp mà không cần gọi mạng xuyên lục địa!" },
      { term: "ACM (AWS Certificate Manager)", plain: "Dịch vụ cấp phát và tự động gia hạn chứng chỉ bảo mật web HTTPS (SSL/TLS) HOÀN TOÀN MIỄN PHÍ để gắn vào ALB, CloudFront và API Gateway." }
    ],
    diagram: `
So sánh Cặp Đôi Lưu Trữ Cấu Hình & Mật Khẩu Kinh Điển Nhất:
 ├── Cần TỰ ĐỘNG XOAY VÒNG MẬT KHẨU ĐỊNH KỲ (Auto Rotation) cho RDS/Aurora/Redshift? ──► [AWS Secrets Manager] (Có phí)
 └── Cần lưu biến cấu hình phân cấp (/prod/db/url) MIỄN PHÍ, tiết kiệm chi phí nhất?  ──► [SSM Parameter Store] (Standard = Free!)`,
    deepSections: [
      {
        title: "1. AWS KMS chuyên sâu: Xoay vòng khóa (Rotation) & Chia sẻ Cross-Account",
        content: "• <strong>Automatic Key Rotation trên KMS</strong>:<br>  - <em>AWS Managed Keys</em>: Tự động xoay vòng <strong>mỗi 1 năm</strong> (bắt buộc).<br>  - <em>Customer Managed Keys (CMK)</em>: Bạn có thể bật tự động xoay vòng <strong>mỗi 1 năm (365 ngày)</strong> (hoặc tùy chỉnh từ 90 đến 2560 ngày).<br>  - <em>Imported Key Material (Khóa do bạn tự sinh ở dưới đất rồi upload lên KMS)</em>: <strong>KHÔNG hỗ trợ xoay vòng tự động</strong> (bạn phải tự xoay vòng thủ công!).<br>• <strong>Quy tắc Chia sẻ dữ liệu mã hóa bằng KMS sang Tài khoản khác (Cross-Account)</strong>: Phải dùng <strong>Customer Managed Key (CMK)</strong>, và bắt buộc phải cấp quyền ở <strong>CẢ 2 NƠI</strong>: (1) Sửa <strong>KMS Key Policy</strong> ở Tài khoản A cho phép Tài khoản B, VÀ (2) Cấp <strong>IAM Policy</strong> cho User ở Tài khoản B!"
      },
      {
        title: "2. AWS Secrets Manager vs SSM Parameter Store & Lưu ý sống còn về ACM",
        content: "• <strong>AWS Secrets Manager</strong>: Chọn ngay khi thấy chữ <strong><em>Rotate database credentials automatically, native RDS/Aurora integration, or replicate secrets across multiple Regions</em></strong>.<br>• <strong>SSM Parameter Store</strong>: Lưu tham số theo cây thư mục, tích hợp KMS để tạo <code>SecureString</code>. Có thể gắn <em>Parameter Policies (TTL)</em> để gửi cảnh báo qua EventBridge khi một mật khẩu sắp hết hạn cần đổi.<br>• <strong>AWS Certificate Manager (ACM) – Bẫy đề thi cực hay gặp</strong>:<br>  1. Bạn <strong>KHÔNG THỂ cài trực tiếp chứng chỉ Public của ACM vào bên trong một máy chủ EC2 đơn lẻ</strong> (vì ACM không cho tải Private Key xuống!). Muốn dùng chứng chỉ ACM cho EC2 → Phải đặt một <strong>ALB, NLB hoặc CloudFront</strong> ở phía trước máy EC2 rồi gắn chứng chỉ ACM lên đó!<br>  2. Khi gắn chứng chỉ ACM vào <strong>Amazon CloudFront</strong>, chứng chỉ đó <strong>BẮT BUỘC phải được tạo ở Region <code>us-east-1</code> (N. Virginia)</strong> bất kể máy chủ gốc của bạn đặt ở đâu!"
      }
    ],
    extraCards: [
      { q: "Một lập trình viên muốn gắn chứng chỉ SSL/TLS của AWS Certificate Manager (ACM) vào một bản phân phối Amazon CloudFront, nhưng không tìm thấy chứng chỉ vừa tạo ở Region Singapore (ap-southeast-1). Nguyên nhân là gì?", a: "Để sử dụng chứng chỉ ACM với Amazon CloudFront (dịch vụ toàn cầu), chứng chỉ ACM đó BẮT BUỘC phải được tạo hoặc import tại Region us-east-1 (N. Virginia)." },
      { q: "Chứng chỉ SSL/TLS công cộng miễn phí do AWS Certificate Manager (ACM) cấp có thể tải file Private Key về để cài trực tiếp lên Nginx/Apache bên trong máy chủ EC2 được không?", a: "KHÔNG. ACM không cho phép xuất (export) Private Key của chứng chỉ công cộng miễn phí. Phải gắn chứng chỉ ACM thông qua ALB, NLB, CloudFront hoặc API Gateway đứng trước EC2." },
      { q: "Với loại khóa KMS do khách hàng tự tạo chất liệu khóa ở dưới On-premise rồi nhập lên AWS (Imported Key Material), tính năng Automatic Key Rotation của KMS có hoạt động không?", a: "KHÔNG. KMS không hỗ trợ xoay vòng tự động đối với Imported Key Material; khách hàng phải tự thực hiện xoay vòng thủ công." }
    ],
    quizzes: [
      {
        qEn: "A company hosts a web application on an Amazon Aurora PostgreSQL database. Security compliance mandates that the database master password must be encrypted at rest and automatically rotated every 30 days without requiring any application downtime or manual intervention. Which AWS service meets this requirement with the LEAST operational effort?",
        qVi: "Công ty chạy ứng dụng trên DB Amazon Aurora PostgreSQL. Quy định bảo mật bắt buộc mật khẩu DB phải được mã hóa và tự động xoay vòng đổi mới mỗi 30 ngày mà không làm gián đoạn ứng dụng. Dịch vụ nào đáp ứng tốn ít công vận hành nhất?",
        options: [
          "A. AWS Systems Manager Parameter Store (Standard parameters)",
          "B. AWS Secrets Manager",
          "C. AWS KMS",
          "D. IAM Credentials Report"
        ],
        correctIdx: 1,
        explanation: "AWS Secrets Manager tích hợp sẵn tính năng tự động xoay vòng mật khẩu định kỳ (Automatic Rotation) cho RDS, Aurora, Redshift và DocumentDB bằng hàm Lambda dựng sẵn."
      },
      {
        qEn: "A solutions architect deployed a static website on an Amazon S3 bucket in the ap-northeast-1 (Tokyo) Region and placed an Amazon CloudFront distribution in front of it. The architect requested a public SSL/TLS certificate in AWS Certificate Manager (ACM) in the ap-northeast-1 Region, but CloudFront does not allow selecting the certificate. How should the architect fix this?",
        qVi: "Kiến trúc sư đặt website tĩnh trên S3 ở Region Tokyo (ap-northeast-1) và đặt CloudFront ở phía trước. Kiến trúc sư đã tạo chứng chỉ SSL trong ACM tại Region Tokyo nhưng CloudFront không hiển thị chứng chỉ đó để chọn. Sửa bằng cách nào?",
        options: [
          "A. Migrate the S3 bucket to the us-east-1 Region.",
          "B. Request or import a public SSL/TLS certificate in AWS Certificate Manager (ACM) in the us-east-1 (N. Virginia) Region and attach it to the CloudFront distribution.",
          "C. Use AWS CloudHSM instead of ACM.",
          "D. Request the SSL certificate inside Amazon Route 53."
        ],
        correctIdx: 1,
        explanation: "Mọi chứng chỉ ACM gắn vào Amazon CloudFront bắt buộc phải nằm tại Region us-east-1 (N. Virginia), bất kể Origin S3 hay ALB nằm ở Region nào."
      }
    ]
  },

  49: {
    jargon: [
      { term: "Rate-based Rule (Trên AWS WAF)", plain: "Quy tắc đếm số lần bấm của từng địa chỉ IP trong mỗi 5 phút: Nếu 1 địa chỉ IP gọi quá 500 lần trong 5 phút (nghi ngờ tấn công HTTP Flood hoặc cào dữ liệu), WAF tự động khóa mõm IP đó lại và tự mở ra khi IP đó ngừng spam!" },
      { term: "AWS Security Hub vs Amazon Detective", plain: "Security Hub = Bảng tổng hợp báo cáo từ mọi vệ sĩ (GuardDuty, Inspector, Macie, Config) về chung 1 màn hình và chấm điểm chuẩn bảo mật PCI-DSS/CIS. Detective = Thám tử điều tra nguyên nhân gốc rễ bằng đồ thị sau khi GuardDuty báo có kẻ đột nhập!" },
      { term: "AWS Artifact", plain: "Kho tài liệu Pháp lý & Kiểm toán: Nơi bạn vào tải các bản báo cáo chứng nhận bảo mật của AWS (ISO 27001, SOC 1/2/3, PCI-DSS) để nộp cho đoàn thanh tra nhà nước!" }
    ],
    diagram: `
Biệt Đội Bảo Mật Đa Tầng AWS (Nhìn Từ Khóa Chọn Đáp Án Trong 3 Giây!):
 ├── Chống SQL Injection / XSS / Chặn IP gửi quá nhiều request ở Layer 7? ──► [AWS WAF] (Chỉ gắn vào CloudFront, ALB, API GW, AppSync, Cognito!)
 ├── Chống tấn công DDoS lớn + Có đội chuyên gia SRT + Bảo hiểm hoàn tiền? ──► [AWS Shield Advanced]
 ├── AI phân tích ngầm CloudTrail + VPC Flow Logs + DNS Logs tìm hacker?  ──► [Amazon GuardDuty]
 ├── Quét lỗ hổng phần mềm (CVE) trên máy EC2, ảnh Docker ECR & Lambda?   ──► [Amazon Inspector]
 ├── Dùng AI quét các S3 Buckets tìm dữ liệu nhạy cảm cá nhân (PII)?       ──► [Amazon Macie]
 ├── Gom toàn bộ cảnh báo về 1 nơi & Kiểm tra chuẩn CIS / PCI-DSS?        ──► [AWS Security Hub]
 └── Tải báo cáo chứng nhận kiểm toán SOC / ISO / PCI của AWS?            ──► [AWS Artifact]`,
    deepSections: [
      {
        title: "1. Bẫy kinh điển nhất về AWS WAF và AWS Shield Advanced",
        content: "• <strong>AWS WAF gắn được vào đâu?</strong> Hãy học thuộc lòng danh sách các dịch vụ hỗ trợ gắn AWS WAF: <strong>Amazon CloudFront (Global), Application Load Balancer (ALB), Amazon API Gateway, AWS AppSync, Amazon Cognito User Pools, AWS App Runner, AWS Verified Access</strong>.<br>• <strong>BẪY SỐ 1</strong>: AWS WAF <strong>KHÔNG BAO GIỜ gắn trực tiếp được vào máy chủ EC2 hay Network Load Balancer (NLB)</strong>! Nếu đề bài nói: <em>'Ứng dụng web đang chạy trên EC2 gắn Elastic IP (hoặc sau NLB) bị tấn công SQL Injection hoặc HTTP Flood từ hàng nghìn IP liên tục thay đổi'</em> → Giải pháp bắt buộc là: <strong>Đặt một Application Load Balancer (ALB) hoặc Amazon CloudFront ở phía trước, rồi gắn AWS WAF (với Rate-based rule) lên ALB/CloudFront đó</strong>!<br>• <strong>AWS Shield Advanced</strong>: Chọn khi đề bài yêu cầu <strong><em>24/7 access to the AWS Shield Response Team (SRT) during DDoS attacks</em></strong> hoặc <strong><em>Financial protection against bill spikes (Cost protection) caused by DDoS scaling</em></strong>."
      },
      {
        title: "2. Phân biệt rõ GuardDuty, Inspector, Macie, Security Hub, Detective & Artifact",
        content: "• <strong>Amazon GuardDuty</strong>: Phát hiện mối đe dọa thông minh (Threat detection) bằng ML dựa trên 4 nguồn log: <strong>CloudTrail Logs, VPC Flow Logs, DNS Query Logs, và EKS Audit Logs</strong>. Muốn tự động cách ly máy EC2 bị nhiễm mã độc đào tiền ảo → Cho <strong>GuardDuty bắn sự kiện sang Amazon EventBridge để gọi hàm AWS Lambda tự động sửa Security Group cách ly máy EC2 đó</strong>!<br>• <strong>Amazon Inspector</strong>: Quét lỗ hổng phần mềm (Software vulnerabilities / CVEs) và cổng mạng hở trên <strong>EC2 instances (qua SSM Agent), Container Images trong Amazon ECR, và các hàm AWS Lambda</strong>.<br>• <strong>Amazon Macie</strong>: Quét <strong>S3 Buckets</strong> tìm dữ liệu nhạy cảm (PII, thẻ tín dụng, hồ sơ y tế).<br>• <strong>Amazon Detective</strong>: Dùng đồ thị ML để <strong>điều tra nguyên nhân gốc rễ (Root-cause investigation / Visualize security findings)</strong>.<br>• <strong>AWS Artifact</strong>: Không phải là công cụ quét lỗi, mà là cổng thông tin để <strong>tải báo cáo tuân thủ (Compliance reports: SOC, PCI, ISO)</strong>!"
      }
    ],
    extraCards: [
      { q: "Một trang web trên ALB bị tấn công HTTP Flood (Layer 7 DDoS) từ các địa chỉ IP gửi hàng nghìn request mỗi phút. Tính năng cụ thể nào trong AWS WAF giúp tự động chặn tạm thời bất kỳ IP nào vượt quá ngưỡng 1,000 requests trong 5 phút?", a: "AWS WAF Rate-based Rule." },
      { q: "Khi đoàn kiểm toán bên ngoài yêu cầu công ty cung cấp các báo cáo chứng nhận tuân thủ bảo mật SOC 2 và ISO 27001 của hạ tầng đám mây AWS, kiến trúc sư vào dịch vụ nào để tải các tài liệu này về?", a: "AWS Artifact." },
      { q: "Sau khi Amazon GuardDuty phát hiện một hành vi đáng ngờ trong tài khoản, kỹ sư bảo mật muốn sử dụng công cụ trực quan hóa bằng đồ thị để điều tra nhanh nguyên nhân gốc rễ (Root cause analysis) từ hàng terabyte log. Chọn dịch vụ nào?", a: "Amazon Detective." }
    ],
    quizzes: [
      {
        qEn: "A company runs a public web application directly on a single Amazon EC2 instance with an Elastic IP address. Recently, the application has been targeted by SQL injection attacks and Layer 7 HTTP flood attacks originating from constantly changing IP addresses. How can the solutions architect protect the application with the LEAST operational effort?",
        qVi: "Công ty đang chạy ứng dụng web trực tiếp trên 1 máy EC2 gắn Elastic IP. Gần đây ứng dụng liên tục bị tấn công SQL Injection và HTTP Flood từ các địa chỉ IP thay đổi liên tục. Làm sao bảo vệ ứng dụng tốn ít công sức nhất?",
        options: [
          "A. Attach AWS WAF directly to the Elastic Network Interface (ENI) of the EC2 instance.",
          "B. Place an Application Load Balancer (or Amazon CloudFront distribution) in front of the EC2 instance, and associate an AWS WAF web ACL (with SQL injection and rate-based rules) with the ALB/CloudFront.",
          "C. Manually block each IP address in the subnet Network ACL.",
          "D. Enable Amazon Macie."
        ],
        correctIdx: 1,
        explanation: "AWS WAF không thể gắn trực tiếp vào EC2. Phải đặt một ALB hoặc CloudFront ở phía trước EC2 để gắn AWS WAF kèm quy tắc chống SQLi và Rate-based rule."
      },
      {
        qEn: "A security team wants a service that continuously scans Amazon EC2 instances, container images stored in Amazon ECR, and AWS Lambda functions for known software vulnerabilities (CVEs) and unintended network exposure, generating a risk score for each finding. Which AWS service should be used?",
        qVi: "Đội bảo mật cần một dịch vụ tự động quét liên tục các máy chủ EC2, các ảnh container trong kho Amazon ECR và các hàm AWS Lambda để tìm lỗ hổng phần mềm đã biết (CVE) và chấm điểm rủi ro. Nên dùng dịch vụ nào?",
        options: [
          "A. Amazon GuardDuty",
          "B. Amazon Inspector",
          "C. Amazon Macie",
          "D. AWS Artifact"
        ],
        correctIdx: 1,
        explanation: "Amazon Inspector là dịch vụ quản lý lỗ hổng tự động chuyên quét CVE trên 3 mục tiêu: EC2 instances (qua SSM Agent), Container images trên ECR, và các hàm AWS Lambda."
      }
    ]
  },

  50: {
    jargon: [
      { term: "RTO (Recovery Time Objective) vs RPO (Recovery Point Objective)", plain: "RTO = Sập xong mất bao lâu thì web sống lại? (Đo thời gian ngừng hoạt động). RPO = Lúc sống lại thì bị mất dữ liệu của bao nhiêu phút trước khi sập? (Đo lượng dữ liệu bị mất)." },
      { term: "AWS DRS (Elastic Disaster Recovery) vs AWS MGN (Application Migration Service)", plain: "Cả hai đều chép nguyên từng khối ổ cứng máy chủ theo thời gian thực: AWS MGN = Dùng để di cư (chuyển nhà 1 lần) máy chủ từ On-premise lên AWS. AWS DRS = Dùng để làm bảo hiểm Khôi phục thảm họa lâu dài sang AWS hoặc sang Region khác!" },
      { term: "AWS Backup + Vault Lock", plain: "Trung tâm sao lưu toàn năng: Viết 1 lịch sao lưu tập trung cho cả EC2, EBS, EFS, RDS, Aurora, DynamoDB, S3 và khóa cứng bằng Vault Lock (WORM) để chống ransomware xóa bản backup!" }
    ],
    diagram: `
Thang Đo 4 Chiến Lược Disaster Recovery (DR) Trong Đề Thi SAA-C03:
 [Backup & Restore] ──────► [Pilot Light (Lửa mồi)] ──────► [Warm Standby] ────────────► [Multi-Site Active/Active]
 • RTO/RPO: Hàng giờ         • RTO: Vài chục phút            • RTO: Vài phút              • RTO/RPO: Gần bằng 0 giây!
 • Rẻ nhất                   • Chỉ bật DB, TẮT máy EC2!      • Bật sẵn cả Web+DB bản nhỏ  • Chạy full tải cả 2 Region (Đắt nhất)`,
    deepSections: [
      {
        title: "1. Mẹo phân biệt 100% không bao giờ nhầm giữa Pilot Light và Warm Standby",
        content: "Trong đề thi SAA-C03, rất nhiều người nhầm giữa <em>Pilot Light</em> và <em>Warm Standby</em>. Hãy dùng đúng quy tắc sau để chấm:<br>• Chọn <strong>Pilot Light (Ngọn lửa mồi)</strong> khi đề bài nói: Ở Region dự phòng, <strong>chỉ có tầng Database được bật và đồng bộ dữ liệu liên tục</strong> (ví dụ RDS Cross-Region Read Replica hoặc DynamoDB), còn <strong>các máy chủ Web/App EC2 thì đang TẮT (Stopped) hoặc chỉ lưu dưới dạng AMI</strong> và chỉ được bật lên khi thảm họa xảy ra.<br>• Chọn <strong>Warm Standby</strong> khi đề bài nói: Ở Region dự phòng <strong>có đầy đủ một bản thu nhỏ của TOÀN BỘ hệ thống (cả Web server lẫn Database đều đang chạy 24/7 ở cấu hình nhỏ nhất - Scaled-down version)</strong>, khi có thảm họa chỉ việc tăng quy mô (Scale out) lên!"
      },
      {
        title: "2. Bộ tứ công cụ Di chuyển (Migration) & Sao lưu tập trung: DMS, SCT, MGN & AWS Backup",
        content: "• <strong>AWS DMS (Database Migration Service)</strong>: Di chuyển DB với thời gian gián đoạn gần bằng 0 (nhờ tính năng <em>Continuous Data Replication / CDC</em>).<br>  - Cùng hệ DB (Homogeneous: Oracle sang RDS Oracle, MySQL sang Aurora MySQL) → Chỉ cần dùng <strong>AWS DMS</strong>.<br>  - Khác hệ DB (Heterogeneous: <strong>Oracle hoặc SQL Server sang Aurora PostgreSQL/MySQL, hoặc sang Redshift</strong>) → <strong>BẮT BUỘC phải chạy AWS SCT (Schema Conversion Tool) trước</strong> để dịch cấu trúc bảng và Stored Procedures, sau đó mới dùng <strong>AWS DMS</strong> để bơm dữ liệu!<br>• <strong>AWS Application Migration Service (AWS MGN)</strong>: Dịch vụ chính thức để <strong>Lift-and-shift (Rehost)</strong> các máy chủ vật lý hoặc VMware/Hyper-V từ On-premise lên EC2 với downtime tối thiểu.<br>• <strong>AWS Backup</strong>: Khi đề bài yêu cầu <strong><em>'Centrally configure and audit backup policies across multiple AWS services (EC2, EBS, EFS, FSx, RDS, DynamoDB, S3) and across multiple accounts in AWS Organizations'</em></strong> → Chọn ngay <strong>AWS Backup</strong> (kèm <em>AWS Backup Vault Lock</em> nếu cần chống xóa WORM)."
      }
    ],
    extraCards: [
      { q: "Dịch vụ nào giúp quản lý, tự động hóa lịch sao lưu tập trung cho hàng loạt dịch vụ AWS (EBS, RDS, DynamoDB, EFS, FSx, S3) xuyên suốt nhiều tài khoản trong AWS Organizations và hỗ trợ khóa chống xóa WORM?", a: "AWS Backup (kết hợp với AWS Backup Vault Lock)." },
      { q: "Khi thực hiện chiến lược 'Lift-and-shift' (Rehost) để di chuyển 100 máy chủ vật lý và máy ảo VMware từ trung tâm dữ liệu On-premise lên Amazon EC2 với thời gian gián đoạn tối thiểu, AWS khuyến nghị dùng dịch vụ nào?", a: "AWS Application Migration Service (AWS MGN)." },
      { q: "Nếu đề bài yêu cầu khôi phục thảm họa (Disaster Recovery) cho các máy chủ với RTO chỉ vài phút và RPO vài giây bằng cách nhân bản liên tục cấp độ khối (Continuous block-level replication) sang một môi trường staging giá rẻ trên AWS, ta chọn dịch vụ chuyên dụng nào?", a: "AWS Elastic Disaster Recovery (AWS DRS)." }
    ],
    quizzes: [
      {
        qEn: "A company wants to implement a disaster recovery (DR) strategy in a secondary AWS Region. To balance cost and recovery speed, the company wants a scaled-down but fully functional version of its entire production stack (including web servers, application servers, and databases) running at all times in the DR Region. In the event of a disaster, the DR environment will automatically scale out to handle full production traffic within minutes. Which DR strategy is this?",
        qVi: "Công ty muốn thiết lập DR ở Region thứ hai. Để cân bằng chi phí và tốc độ, họ muốn duy trì một phiên bản thu nhỏ nhưng hoạt động đầy đủ của toàn bộ hệ thống (gồm cả máy chủ web, ứng dụng và DB) luôn chạy sẵn ở Region DR. Khi có sự cố, hệ thống DR chỉ việc mở rộng quy mô để nhận toàn bộ tải trong vài phút. Đây là chiến lược DR nào?",
        options: [
          "A. Backup and Restore",
          "B. Pilot Light",
          "C. Warm Standby",
          "D. Multi-Site Active/Active"
        ],
        correctIdx: 2,
        explanation: "Chạy sẵn một phiên bản thu nhỏ nhưng đầy đủ mọi tầng của hệ thống (fully functional scaled-down version) 24/7 ở Region dự phòng chính là định nghĩa của Warm Standby."
      },
      {
        qEn: "An enterprise is migrating a 10 TB on-premises Oracle database to Amazon Aurora PostgreSQL. The database must remain online and accessible to users during the migration to ensure near-zero downtime. Which combination of AWS tools should the solutions architect use?",
        qVi: "Doanh nghiệp di chuyển một cơ sở dữ liệu Oracle nặng 10 TB từ dưới On-premise lên Amazon Aurora PostgreSQL. Cơ sở dữ liệu gốc phải tiếp tục hoạt động phục vụ người dùng trong suốt quá trình di chuyển để đảm bảo gần như không gián đoạn. Cần kết hợp bộ công cụ nào?",
        options: [
          "A. Use S3 Transfer Acceleration only.",
          "B. Use the AWS Schema Conversion Tool (AWS SCT) to convert the schema and PL/SQL code to PostgreSQL, combined with AWS Database Migration Service (AWS DMS) with Continuous Data Replication (CDC) enabled.",
          "C. Use Amazon Data Lifecycle Manager (DLM).",
          "D. Take an EBS Snapshot of the Oracle server and attach it to Aurora."
        ],
        correctIdx: 1,
        explanation: "Vì đây là di chuyển khác hệ quản trị CSDL (Heterogeneous migration: từ Oracle sang PostgreSQL), bắt buộc phải dùng AWS SCT để chuyển đổi Schema trước, sau đó dùng AWS DMS với tính năng CDC để đồng bộ dữ liệu liên tục mà không gây downtime."
      }
    ]
  },

  51: {
    jargon: [
      { term: "PaaS (Platform as a Service - Elastic Beanstalk)", plain: "Dịch vụ dọn sẵn mâm cỗ cho Lập trình viên: Bạn chỉ việc ném file code .jar / .war / .zip lên, Elastic Beanstalk tự động đi thuê EC2, tự lắp Load Balancer, tự cài Auto Scaling mà bạn không tốn 1 xu tiền phí dịch vụ Beanstalk (chỉ trả tiền tài nguyên EC2/RDS bên dưới)!" },
      { term: "CloudFormation StackSets", plain: "Tính năng nâng cấp của CloudFormation: Chỉ bấm nút 1 lần, nó tự động mang bản vẽ hạ tầng YAML đi triển khai đồng loạt lên 50 Tài khoản AWS ở 10 Regions khác nhau trong toàn tập đoàn!" },
      { term: "AWS Trusted Advisor", plain: "Vị cố vấn tự động kiểm tra tài khoản của bạn theo 5 trụ cột: Tối ưu chi phí, Hiệu năng, Bảo mật (cảnh báo S3 mở công khai, Root chưa bật MFA), Chịu lỗi và Hạn mức dịch vụ (Service Quotas)." }
    ],
    diagram: `
Tự Động Hóa Hạ Tầng & Tối Ưu Hóa Chi Phí:
 ├── Lập trình viên muốn đưa Web App lên nhanh nhất mà không muốn tự lắp ráp hạ tầng? ──► [AWS Elastic Beanstalk]
 ├── Triển khai hạ tầng bằng code (YAML/JSON) tự động ra nhiều Accounts & nhiều Regions? ──► [AWS CloudFormation StackSets]
 ├── Dùng AI phân tích và khuyên nên hạ cỡ máy EC2 / EBS / Lambda đang bị mua thừa?      ──► [AWS Compute Optimizer]
 └── Dự báo hóa đơn 12 tháng tới & Đặt cảnh báo gửi Email/SNS khi vượt ngân sách?       ──► [AWS Cost Explorer] & [AWS Budgets]`,
    deepSections: [
      {
        title: "1. AWS Elastic Beanstalk & AWS CloudFormation (StackSets, DeletionPolicy, Drift)",
        content: "• <strong>AWS Elastic Beanstalk</strong>: Phù hợp cho bài toán đưa ứng dụng web (Java, .NET, Node.js, Python, Docker) lên mây nhanh nhất mà vẫn giữ quyền kiểm soát máy chủ EC2 bên dưới.<br>• <strong>AWS CloudFormation</strong>:<br>  - <strong>CloudFormation StackSets (Cực hay hỏi!)</strong>: Khi đề bài nói <em>'Triển khai cùng một mẫu IAM Role, VPC hoặc Config Rule đồng loạt trên tất cả các tài khoản thành viên trong AWS Organizations và trên nhiều Regions'</em> → Chọn ngay <strong>CloudFormation StackSets</strong>!<br>  - <strong>DeletionPolicy</strong>: Để ngăn chặn việc ai đó xóa nhầm CloudFormation Stack làm mất luôn cả Database RDS bên trong → Đặt thuộc tính <code>DeletionPolicy: Retain</code> (giữ lại tài nguyên) hoặc <code>DeletionPolicy: Snapshot</code> (chụp bản sao lưu cuối trước khi xóa).<br>  - <strong>Drift Detection</strong>: Phát hiện xem có ai đã lén vào Console sửa tay cấu hình làm lệch so với file code CloudFormation gốc hay không."
      },
      {
        title: "2. Quản lý Chi phí & Khuyến nghị Hạ tầng: Compute Optimizer, Trusted Advisor & Cost Explorer",
        content: "• <strong>AWS Compute Optimizer</strong>: Dùng Machine Learning phân tích CloudWatch metrics để đưa ra khuyến nghị <strong>Right-sizing (hạ hoặc nâng cấu hình)</strong> cho <strong>EC2 instances, Auto Scaling Groups, EBS volumes, AWS Lambda functions và ECS on Fargate</strong>.<br>• <strong>AWS Trusted Advisor</strong>: Kiểm tra tài khoản theo 5 danh mục (Cost Optimization, Performance, Security, Fault Tolerance, Service Limits). Lưu ý: Để mở khóa toàn bộ các bài kiểm tra (Full checks) và kích hoạt cảnh báo tự động qua EventBridge, tài khoản cần gói hỗ trợ từ <strong>AWS Business Support hoặc Enterprise Support</strong> trở lên.<br>• <strong>Cost Allocation Tags</strong>: Để phân tách hóa đơn chi phí chi tiết theo từng phòng ban, từng dự án hoặc từng môi trường (Dev/Prod) trong <em>Cost Explorer</em>."
      }
    ],
    extraCards: [
      { q: "Tính năng nào của AWS CloudFormation cho phép quản trị viên triển khai, cập nhật hoặc xóa cùng một bản thiết kế hạ tầng (Template) đồng loạt trên hàng chục tài khoản AWS và nhiều Regions chỉ với một thao tác?", a: "AWS CloudFormation StackSets." },
      { q: "Trong file mẫu AWS CloudFormation, cần cấu hình thuộc tính nào trên tài nguyên cơ sở dữ liệu Amazon RDS để đảm bảo nếu có người xóa nhầm CloudFormation Stack thì RDS sẽ tự động chụp lại một bản Snapshot cuối cùng trước khi bị xóa?", a: "Cấu hình thuộc tính 'DeletionPolicy: Snapshot' (hoặc 'DeletionPolicy: Retain' để giữ nguyên DB)." },
      { q: "Công cụ nào của AWS giúp kiểm tra tự động 5 hạng mục (Tối ưu chi phí, Hiệu năng, Bảo mật, Khả năng chịu lỗi, và Giới hạn dịch vụ Service Quotas) cho tài khoản AWS?", a: "AWS Trusted Advisor." }
    ],
    quizzes: [
      {
        qEn: "A security team in a large enterprise needs to deploy a standardized set of IAM roles and Amazon S3 audit buckets across 40 AWS member accounts in 5 different AWS Regions within their AWS Organization. Whenever a new account is added to the Organization, these resources must be provisioned automatically. Which solution meets this requirement with the LEAST operational effort?",
        qVi: "Đội bảo mật của tập đoàn cần triển khai một bộ IAM Roles và S3 buckets chuẩn hóa đồng loạt lên 40 tài khoản AWS thành viên ở 5 Regions khác nhau trong AWS Organization. Hễ có tài khoản mới thêm vào là phải tự động tạo sẵn các tài nguyên này. Giải pháp nào tốn ít công sức nhất?",
        options: [
          "A. Manually log in to each of the 40 accounts and run AWS CLI scripts.",
          "B. Use AWS CloudFormation StackSets (integrated with AWS Organizations and automatic deployments enabled).",
          "C. Use AWS Elastic Beanstalk.",
          "D. Use AWS Compute Optimizer."
        ],
        correctIdx: 1,
        explanation: "AWS CloudFormation StackSets cho phép triển khai hạ tầng tự động xuyên qua nhiều tài khoản (Multi-account) và nhiều vùng (Multi-Region) trong AWS Organizations, bao gồm cả việc tự động chạy khi có tài khoản mới gia nhập OU."
      },
      {
        qEn: "A CFO wants to reduce the company's monthly AWS bill. The engineering team suspects that many EC2 instances, EBS volumes, and AWS Lambda functions were over-provisioned with far more CPU, IOPS, and memory than they actually use. Which AWS service uses machine learning to analyze historical utilization metrics and recommend optimal right-sizing configurations?",
        qVi: "Giám đốc tài chính muốn cắt giảm hóa đơn AWS hàng tháng. Đội kỹ thuật nghi ngờ nhiều máy EC2, ổ EBS và hàm Lambda đang bị cấp phát dư thừa CPU, IOPS và RAM so với nhu cầu thực tế. Dịch vụ nào dùng Machine Learning phân tích lịch sử sử dụng để gợi ý hạ cấu hình (Right-sizing) chuẩn xác nhất?",
        options: [
          "A. AWS Budgets",
          "B. AWS Compute Optimizer",
          "C. AWS Artifact",
          "D. Amazon Inspector"
        ],
        correctIdx: 1,
        explanation: "AWS Compute Optimizer sử dụng Machine Learning phân tích lịch sử CloudWatch metrics để phát hiện các tài nguyên bị cấp phát thừa (Over-provisioned) và đề xuất cấu hình tối ưu cho EC2, ASG, EBS, Lambda và ECS Fargate."
      }
    ]
  },

  52: {
    jargon: [
      { term: "Block vs File vs Object Storage", plain: "Block (EBS/Instance Store) = Ổ cứng gắn cho 1 máy chủ. File (EFS/FSx) = Thư mục mạng chia sẻ cho hàng trăm máy chủ cùng mount. Object (S3) = Kho chứa file vô hạn truy cập qua link HTTP REST API." },
      { term: "RDBMS (RDS/Aurora) vs NoSQL (DynamoDB)", plain: "RDBMS = Dữ liệu có bảng biểu quan hệ chặt chẽ, JOIN nhiều bảng, giao dịch ACID (dùng RDS Proxy nếu gọi từ Lambda). NoSQL = Dữ liệu dạng Key-Value/JSON cần tốc độ vài mili-giây ở mọi quy mô, không cần JOIN (dùng DAX nếu cần đọc micro-giây)." }
    ],
    diagram: `
Sơ đồ Phản Xạ 5 Giây Nhóm Storage & Database:
 [Storage]
  ├── 1 máy EC2 + Cần > 16,000 IOPS hoặc Multi-Attach cùng 1 AZ? ──► EBS io1/io2
  ├── Nhiều máy Linux + Đa AZ (Multi-AZ) + POSIX?                ──► Amazon EFS (+ EFS-IA tiết kiệm 90%)
  ├── Nhiều máy Windows + SMB + Active Directory?                ──► FSx for Windows File Server
  ├── Siêu máy tính HPC + Machine Learning + Gắn liền S3?        ──► FSx for Lustre
  └── Lưu file vô hạn + Phân tích SQL trực tiếp không cần DB?     ──► Amazon S3 + Amazon Athena (Định dạng Parquet)`,
    deepSections: [
      {
        title: "1. Tổng hợp các bẫy kinh điển nhất giữa các dịch vụ Lưu trữ (Storage)",
        content: "• <strong>Bẫy EBS vs EFS</strong>: Nếu đề bài có từ <em>'Multiple EC2 instances across multiple Availability Zones sharing files'</em> → <strong>Gạch bỏ ngay mọi đáp án có chữ EBS</strong> (kể cả EBS Multi-Attach vì EBS Multi-Attach chỉ chạy trong <strong>1 AZ duy nhất</strong>!). Hãy chọn <strong>Amazon EFS</strong> (cho Linux) hoặc <strong>FSx for Windows</strong>.<br>• <strong>Bẫy S3 Storage Classes</strong>:<br>  - Tần suất truy cập không biết trước / thay đổi thất thường → <strong>S3 Intelligent-Tiering</strong>.<br>  - Ít truy cập + Có thể tạo lại dễ dàng (Thumbnails) → <strong>S3 One Zone-IA</strong>.<br>  - Lưu trữ lạnh hiếm khi đọc nhưng khi cần phải lấy ra trong <strong>mili-giây</strong> → <strong>S3 Glacier Instant Retrieval</strong>.<br>  - Lưu trữ lạnh lấy ra trong <strong>1–5 phút</strong> → <strong>S3 Glacier Flexible Retrieval (Expedited)</strong>."
      },
      {
        title: "2. Tổng hợp các bẫy kinh điển nhất giữa các dịch vụ Database",
        content: "• <strong>RDS Multi-AZ vs Read Replica</strong>: Multi-AZ chỉ để <strong>Chịu lỗi (High Availability)</strong> chứ không tăng tốc độ đọc! Muốn giảm tải cho DB chính khi chạy báo cáo nặng → <strong>Tạo Read Replica</strong>.<br>• <strong>DynamoDB vs Aurora</strong>: Nếu đề bài có chữ <em>Relational, SQL joins, ACID compliant, minimal code changes from MySQL/PostgreSQL</em> → <strong>Aurora</strong>. Nếu có chữ <em>Serverless key-value/JSON, single-digit millisecond latency, unpredictable spiky traffic</em> → <strong>DynamoDB (On-Demand)</strong>."
      }
    ],
    extraCards: [
      { q: "Phản xạ nhanh: Đề bài yêu cầu 'Chia sẻ file cho nhiều máy chủ qua nhiều AZ (Multi-AZ)' -> Khi nào chọn EFS, khi nào chọn FSx for Windows, và tại sao phải loại ngay EBS Multi-Attach?", a: "Chọn EFS nếu là máy Linux (NFS/POSIX); chọn FSx for Windows nếu là máy Windows (SMB/AD). Loại ngay EBS Multi-Attach vì EBS chỉ hoạt động trong phạm vi 1 AZ duy nhất." },
      { q: "Phản xạ nhanh: Cần giảm tải cho cơ sở dữ liệu khi có quá nhiều lượt đọc lặp đi lặp lại cùng một dữ liệu -> Khi nào chọn RDS Read Replica, khi nào chọn ElastiCache, và khi nào chọn DAX?", a: "RDS Read Replica: Chạy các câu truy vấn SQL báo cáo (BI/Reporting) nặng. ElastiCache (Redis): Lưu cache kết quả truy vấn hoặc User Session cho RDS. DAX: Lưu cache micro-giây chuyên dụng đứng trước DynamoDB." }
    ],
    quizzes: [
      {
        qEn: "A company runs a high-traffic web application across three Availability Zones using Linux EC2 instances, AWS Lambda functions, and Amazon ECS Fargate containers. All three compute platforms need concurrent read and write access to the same shared POSIX file storage. Which storage service meets this requirement?",
        qVi: "Công ty chạy ứng dụng trên 3 AZ sử dụng đồng thời cả máy chủ EC2 Linux, hàm AWS Lambda và các container ECS Fargate. Cả 3 nền tảng tính toán này đều cần đọc và ghi đồng thời vào chung một hệ thống lưu trữ file chuẩn POSIX. Dịch vụ nào đáp ứng được?",
        options: [
          "A. Amazon EBS io2 Block Express",
          "B. Amazon EFS (Elastic File System)",
          "C. Amazon S3 Glacier",
          "D. EC2 Instance Store"
        ],
        correctIdx: 1,
        explanation: "Amazon EFS là hệ thống file mạng chuẩn POSIX duy nhất có thể mount đồng thời vào cả EC2 Linux, ECS Fargate containers và hàm AWS Lambda trải rộng trên nhiều Availability Zones."
      },
      {
        qEn: "A global e-commerce application uses an Amazon Aurora MySQL database in us-east-1. The company is expanding to Europe (eu-west-1) and Japan (ap-northeast-1) and requires sub-second data replication latency to the secondary Regions for local read queries, plus the ability to promote a secondary Region to full read/write capability in under 1 minute during a Region-wide disaster. Which solution meets these requirements?",
        qVi: "Ứng dụng dùng Aurora MySQL ở Mỹ (us-east-1) muốn mở rộng sang Châu Âu và Nhật Bản, yêu cầu độ trễ nhân bản dữ liệu sang các Region phụ dưới 1 giây để phục vụ đọc tại chỗ, đồng thời có thể nâng cấp Region phụ lên đọc/ghi hoàn chỉnh trong dưới 1 phút nếu Region chính gặp thảm họa. Chọn giải pháp nào?",
        options: [
          "A. RDS Multi-AZ deployment",
          "B. Amazon Aurora Global Database",
          "C. Daily cross-Region EBS Snapshot copies",
          "D. Amazon Redshift"
        ],
        correctIdx: 1,
        explanation: "Amazon Aurora Global Database nhân bản dữ liệu sang tối đa 5 Regions phụ với độ trễ dưới 1 giây (<1s) và hỗ trợ khôi phục thảm họa toàn Region với RTO dưới 1 phút."
      }
    ]
  },

  53: {
    jargon: [
      { term: "Anycast Static IP (Global Accelerator) vs Edge Cache (CloudFront)", plain: "CloudFront = Lưu bản sao file ảnh/video tại trạm gần nhà khách hàng. Global Accelerator = Không lưu file nào cả, chỉ cấp 2 con số IP tĩnh cố định toàn cầu để dẫn gói tin TCP/UDP/HTTP đi vào đường cáp quang VIP của AWS!" },
      { term: "Gateway Endpoint (Free) vs Interface Endpoint (PrivateLink)", plain: "Chỉ có S3 và DynamoDB được ưu ái dùng Gateway Endpoint miễn phí qua Route Table. Tất cả các dịch vụ còn lại (SQS, SNS, KMS, SSM...) đều phải dùng Interface Endpoint có tính phí!" }
    ],
    diagram: `
Luồng Đi Của Gói Tin Từ Người Dùng Vào Tận Trong VPC:
[Người dùng] ──► [Route 53 (Alias Record)] ──► [CloudFront (HTTP Cache) / Global Accelerator (TCP/UDP Static IP)]
                                                                   │
                                                                   ▼
                        [VPC: Public Subnet (Đặt ALB / NLB / NAT Gateway) ──► Private Subnet (Đặt EC2 / RDS)]
                                                                                     │
                                                                   (Gọi S3/DynamoDB không tốn tiền NAT!)
                                                                                     ▼
                                                                        [Gateway VPC Endpoint (Free!)]`,
    deepSections: [
      {
        title: "1. Tổng duyệt các cặp đấu Mạng & Cân bằng tải",
        content: "• <strong>ALB vs NLB vs GWLB</strong>:<br>  - HTTP/HTTPS, định tuyến theo URL Path/Host, Docker/Lambda → <strong>ALB (Layer 7)</strong>.<br>  - TCP/UDP siêu tốc, hàng triệu req/s, cấp <strong>Static Elastic IP cố định mỗi AZ</strong> → <strong>NLB (Layer 4)</strong>.<br>  - Đưa gói tin đi qua cụm tường lửa ảo bên thứ 3 (Fortinet/Palo Alto/IDS/IPS) → <strong>GWLB (Layer 3 - GENEVE)</strong>.<br>• <strong>VPC Peering vs Transit Gateway vs AWS PrivateLink</strong>:<br>  - Nối 2–3 VPC đơn giản, không trùng IP → <strong>VPC Peering</strong>.<br>  - Nối hàng chục VPC + VPN + Direct Connect theo mô hình Hub-and-Spoke → <strong>AWS Transit Gateway</strong>.<br>  - Mở duy nhất 1 dịch vụ nội bộ sang các VPC khác (chấp nhận cả khi <strong>trùng dải IP CIDR</strong>) → <strong>AWS PrivateLink (NLB + VPC Endpoint Service)</strong>."
      }
    ],
    extraCards: [
      { q: "Tổng kết Firewall: Khi nào dùng Security Group, khi nào dùng Network ACL, khi nào dùng AWS WAF, và khi nào dùng AWS Network Firewall?", a: "SG: Tường lửa Stateful cấp EC2 (chỉ Allow). NACL: Tường lửa Stateless cấp Subnet (có Deny IP cụ thể). WAF: Bảo vệ Web Layer 7 chống SQLi/XSS trên ALB/CloudFront. Network Firewall: Lọc tên miền (FQDN) chiều ra và IPS cho toàn VPC." },
      { q: "Tổng kết Hybrid: Khi cần đường truyền riêng băng thông 10 Gbps ổn định VÀ có mã hóa IPsec VÀ có đường dự phòng tiết kiệm chi phí nhất khi đứt cáp, kiến trúc chuẩn là gì?", a: "Dùng AWS Direct Connect làm đường chính, chạy AWS Site-to-Site VPN đè lên trên để mã hóa IPsec, và tạo thêm 1 kết nối Site-to-Site VPN thứ hai qua Internet làm đường dự phòng (Backup)." }
    ],
    quizzes: [
      {
        qEn: "A company runs a web application on EC2 instances in private subnets behind an Application Load Balancer (ALB). Corporate customers require fixed static IP addresses to whitelist in their firewalls, AND the application requires Layer 7 path-based routing (`/api/v1` vs `/api/v2`). Which architecture meets BOTH requirements?",
        qVi: "Công ty chạy ứng dụng web sau ALB. Khách hàng doanh nghiệp vừa yêu cầu phải có địa chỉ IP tĩnh cố định để mở tường lửa (Whitelist), VỪA yêu cầu ứng dụng phải định tuyến theo đường dẫn URL ở Layer 7 (`/api/v1` và `/api/v2`). Kiến trúc nào đáp ứng được CẢ HAI yêu cầu?",
        options: [
          "A. Attach Elastic IP addresses directly to the Application Load Balancer.",
          "B. Place a Network Load Balancer (NLB with static Elastic IPs) in front of the Application Load Balancer (ALB) and forward traffic from the NLB to the ALB.",
          "C. Replace the ALB with a Gateway Load Balancer.",
          "D. Use a CNAME record in Route 53."
        ],
        correctIdx: 1,
        explanation: "ALB không hỗ trợ gắn Static/Elastic IP, còn NLB không hỗ trợ định tuyến Layer 7 Path-based routing. Đặt NLB (gắn Elastic IP) ở phía trước trỏ vào ALB ở phía sau giải quyết hoàn hảo cả hai yêu cầu."
      },
      {
        qEn: "An application running on EC2 instances inside an isolated private subnet (with no Internet Gateway and no NAT Gateway) needs to securely read secrets from AWS Secrets Manager and send messages to Amazon SQS. Which VPC feature enables this private connectivity?",
        qVi: "Ứng dụng chạy trên EC2 trong một Private Subnet bị cô lập hoàn toàn (không có Internet Gateway và không có NAT Gateway) cần đọc mật khẩu từ AWS Secrets Manager và gửi tin nhắn tới Amazon SQS. Tính năng nào của VPC cho phép kết nối riêng tư này?",
        options: [
          "A. Gateway VPC Endpoints",
          "B. Interface VPC Endpoints (AWS PrivateLink) for Secrets Manager and SQS",
          "C. Egress-Only Internet Gateway",
          "D. VPC Flow Logs"
        ],
        correctIdx: 1,
        explanation: "Gateway VPC Endpoint chỉ hỗ trợ S3 và DynamoDB. Đối với Secrets Manager và SQS, phải sử dụng Interface VPC Endpoints (powered by AWS PrivateLink)."
      }
    ]
  },

  54: {
    jargon: [
      { term: "Pull-based (SQS) vs Push-based (SNS)", plain: "SQS = Hòm thư thụ động (máy chủ rảnh lúc nào tự thò tay vào lấy việc ra làm). SNS = Loa phóng thanh chủ động (bắn tin nhắn tức thì tới hàng loạt người nhận cùng lúc)." },
      { term: "Event-Driven Serverless Architecture", plain: "Kiến trúc hướng sự kiện không máy chủ: Thay vì bật máy chủ ngồi chờ 24/24, khi có sự kiện (upload file S3, thay đổi dòng DynamoDB, hoặc đến giờ hẹn trên EventBridge) thì hệ thống mới tự bật dậy xử lý." }
    ],
    diagram: `
Bảng Chọn Nhanh Công Cụ Tính Toán & Bất Đồng Bộ:
 ├── Tác vụ ngắn (< 15 phút, <= 10GB RAM), chạy theo sự kiện?       ──► [AWS Lambda]
 ├── Tác vụ chạy Docker Container dài hạn (> 15 phút), Serverless?  ──► [ECS với AWS Fargate] (Hoặc [AWS Batch] cho xử lý lô)
 ├── Điều phối chuỗi nhiều bước, tự động Retry, chờ duyệt 1 năm?    ──► [AWS Step Functions]
 ├── Gửi 1 sự kiện cho 5 dịch vụ xử lý độc lập không mất tin?       ──► [1 SNS Topic + 5 SQS Queues (Fan-out)]
 └── Thu thập dòng dữ liệu đổ thẳng vào S3/Redshift/OpenSearch?     ──► [Kinesis Data Firehose]`,
    deepSections: [
      {
        title: "1. Tổng duyệt các câu hỏi So sánh nhóm Decoupling & Messaging",
        content: "• <strong>SQS vs SNS vs Kinesis vs EventBridge</strong>:<br>  - Cần hàng đợi giữa tầng Web và tầng Worker để chống quá tải → <strong>Amazon SQS</strong> (nhớ bật <em>Long Polling</em> giảm chi phí và tăng <em>Visibility Timeout</em> nếu bị xử lý trùng).<br>  - Cần gửi thông báo cho nhiều hệ thống cùng lúc → <strong>SNS + SQS (Fan-out)</strong>.<br>  - Cần thu thập dữ liệu thời gian thực theo thứ tự lớn và lưu lại 365 ngày để phát lại (Replay) → <strong>Kinesis Data Streams</strong>.<br>  - Cần kết nối sự kiện từ các phần mềm SaaS bên ngoài (Shopify, Zendesk, Datadog) hoặc lọc quy tắc sự kiện JSON nâng cao từ hơn 100 dịch vụ AWS → <strong>Amazon EventBridge</strong>."
      }
    ],
    extraCards: [
      { q: "Tổng kết Compute: Khi nào chọn AWS Lambda, khi nào chọn ECS Fargate, và khi nào chọn AWS Batch?", a: "Lambda: Tác vụ hướng sự kiện chạy dưới 15 phút, RAM <= 10GB. ECS Fargate: Chạy dịch vụ Web/Microservices đóng gói Docker liên tục hoặc tác vụ > 15 phút không muốn quản lý EC2. AWS Batch: Xếp hàng đợi và chạy hàng nghìn tác vụ tính toán lô (Batch jobs) quy mô lớn." },
      { q: "Khi cần nhận sự kiện trực tiếp từ các đối tác phần mềm SaaS bên thứ 3 (như Zendesk, Shopify, PagerDuty) đẩy vào hệ thống AWS để kích hoạt hàm Lambda hoặc Step Functions, ta dùng dịch vụ nào?", a: "Amazon EventBridge (thông qua Partner Event Bus)." }
    ],
    quizzes: [
      {
        qEn: "A financial company needs to run a daily container-based data processing job that takes 45 minutes to complete and requires 32 GB of RAM. The team wants a serverless solution so they do not have to manage any EC2 instances. Which service should the solutions architect recommend?",
        qVi: "Công ty tài chính cần chạy một tác vụ xử lý dữ liệu đóng gói trong container mỗi ngày, mất 45 phút để hoàn thành và cần 32 GB RAM. Đội ngũ muốn một giải pháp Serverless để không phải quản lý máy chủ EC2. Nên chọn dịch vụ nào?",
        options: [
          "A. AWS Lambda",
          "B. Amazon ECS with AWS Fargate (or AWS Batch on AWS Fargate)",
          "C. Amazon CloudFront Functions",
          "D. Amazon API Gateway"
        ],
        correctIdx: 1,
        explanation: "AWS Lambda bị giới hạn cứng tối đa 15 phút và 10 GB RAM nên không thể chạy tác vụ 45 phút / 32 GB RAM. Giải pháp Serverless phù hợp nhất là chạy container trên AWS Fargate (qua ECS hoặc AWS Batch)."
      },
      {
        qEn: "An application processes orders using an Amazon SQS FIFO queue. To increase throughput, the architect deployed 10 EC2 consumer instances, but notices that only 1 EC2 instance is processing messages at any given time while the other 9 sit idle. Why is this happening and how can it be fixed?",
        qVi: "Ứng dụng xử lý đơn hàng dùng hàng đợi SQS FIFO. Để tăng tốc độ, kiến trúc sư bật 10 máy EC2 cùng đọc hàng đợi, nhưng phát hiện tại một thời điểm chỉ có đúng 1 máy EC2 làm việc còn 9 máy kia ngồi chơi. Tại sao và cách sửa là gì?",
        options: [
          "A. All messages are being sent with the same single 'MessageGroupId' value. Assign distinct 'MessageGroupId' values (e.g., by CustomerID) so SQS FIFO can process multiple message groups in parallel across consumers.",
          "B. SQS FIFO queues only allow 1 EC2 consumer instance to connect at a time.",
          "C. SQS Long Polling is not enabled.",
          "D. The Visibility Timeout is set to 0."
        ],
        correctIdx: 0,
        explanation: "Trong SQS FIFO, các tin nhắn có cùng MessageGroupId được khóa chặt để xử lý tuần tự từng cái một. Muốn 10 máy xử lý song song mà vẫn giữ đúng thứ tự cho từng khách hàng, phải dùng nhiều MessageGroupId khác nhau (ví dụ: CustomerID)."
      }
    ]
  },

  55: {
    jargon: [
      { term: "Defense in Depth (Bảo mật chiều sâu đa lớp)", plain: "Không bao giờ tin tưởng 1 lớp khóa duy nhất: Ngoài cổng dùng Shield + WAF; vào VPC dùng NACL + Security Group; trên ổ cứng dùng KMS; lấy mật khẩu dùng Secrets Manager; và bật camera GuardDuty + CloudTrail canh gác 24/7!" },
      { term: "Least Privilege (Nguyên tắc Tối thiểu quyền)", plain: "Ai cần làm việc gì thì chỉ cấp vừa đủ quyền cho đúng việc đó trong thời gian ngắn nhất (dùng IAM Role + Access Advisor để cắt tỉa quyền thừa)." }
    ],
    diagram: `
Tổng Kết Sơ Đồ Bảo Mật & Quản Trị Toàn Diện:
 [Quản trị Đa tài khoản] : AWS Organizations + SCP (Cấm vượt rào) + Control Tower + AWS RAM (Chia sẻ Subnet/TGW)
 [Mã hóa & Mật khẩu]     : KMS (FIPS 140-2 L2, Xoay vòng 1 năm) vs CloudHSM (Dedicated L3) | Secrets Manager (Xoay vòng mật khẩu DB)
 [Giám sát & Phát hiện]  : CloudWatch (RAM/Disk qua Agent) | CloudTrail (Ai gọi API?) | Config (Tuân thủ) | GuardDuty (AI bắt hacker)`,
    deepSections: [
      {
        title: "1. Tổng duyệt các câu hỏi Bẫy Bảo mật dễ mất điểm nhất",
        content: "• <strong>KMS vs CloudHSM</strong>: 99% câu hỏi chọn <strong>AWS KMS</strong>. Chỉ chọn <strong>CloudHSM</strong> khi đề bài nói rõ <em>'Dedicated single-tenant hardware security module, FIPS 140-2 Level 3, full customer control over keys where AWS has zero access'</em>.<br>• <strong>Secrets Manager vs Parameter Store</strong>: Cần <strong>tự động xoay vòng mật khẩu DB</strong> → Chọn <strong>Secrets Manager</strong>. Cần lưu tham số cấu hình <strong>miễn phí</strong> → Chọn <strong>SSM Parameter Store</strong>.<br>• <strong>Macie vs GuardDuty vs Inspector</strong>: Tìm dữ liệu nhạy cảm PII trên S3 → <strong>Macie</strong>. Phân tích log tìm hacker/đào coin → <strong>GuardDuty</strong>. Quét lỗ hổng CVE trên EC2/ECR/Lambda → <strong>Inspector</strong>."
      }
    ],
    extraCards: [
      { q: "Tổng kết Kiểm toán: Khi đề bài hỏi 'Ai đã gọi API xóa tài nguyên?', 'Tài nguyên nào đang cấu hình sai quy định bảo mật?' và 'Có kẻ gian nào đang dò quét cổng mạng hoặc dùng trộm Access Key không?', ta lần lượt chọn 3 dịch vụ nào?", a: "1) Ai gọi API -> AWS CloudTrail. 2) Cấu hình sai quy định -> AWS Config. 3) Phát hiện kẻ gian/dò cổng/lộ key bằng AI -> Amazon GuardDuty." },
      { q: "Khi một máy chủ EC2 bị Amazon GuardDuty phát hiện đang thực hiện hành vi đào tiền ảo hoặc giao tiếp với máy chủ điều khiển độc hại (Command & Control), làm thế nào để tự động hóa việc cách ly máy chủ này ngay lập tức?", a: "Tạo một quy tắc trên Amazon EventBridge bắt sự kiện cảnh báo (Finding) từ GuardDuty và kích hoạt hàm AWS Lambda để tự động thay đổi Security Group của máy EC2 đó sang một Security Group cô lập." }
    ],
    quizzes: [
      {
        qEn: "A healthcare company stores millions of files in dozens of Amazon S3 buckets across multiple AWS accounts. A new compliance officer wants to automatically discover and classify any files across all buckets that might accidentally contain unencrypted patient names, addresses, or credit card numbers (PII), and receive alerts in AWS Security Hub. Which service should be enabled?",
        qVi: "Công ty y tế lưu hàng triệu file trên hàng chục S3 buckets. Giám đốc tuân thủ mới muốn tự động rà quét và phân loại bất kỳ file nào trên toàn bộ các S3 buckets có vô tình chứa tên bệnh nhân, địa chỉ hoặc số thẻ tín dụng (PII) và gửi cảnh báo về Security Hub. Cần bật dịch vụ nào?",
        options: [
          "A. Amazon Inspector",
          "B. Amazon Macie",
          "C. AWS Shield Advanced",
          "D. Amazon Rekognition"
        ],
        correctIdx: 1,
        explanation: "Amazon Macie sử dụng Machine Learning và nhận diện mẫu để tự động khám phá, phân loại và bảo vệ dữ liệu nhạy cảm cá nhân (PII) lưu trữ trong các S3 Buckets."
      },
      {
        qEn: "A company wants to automatically detect if an EC2 instance in its AWS account is compromised and communicating with known cryptocurrency mining pools or malicious IP addresses, and then automatically isolate the instance by replacing its security group. Which combination of services achieves this with the LEAST operational overhead?",
        qVi: "Công ty muốn tự động phát hiện nếu có máy EC2 nào bị chiếm quyền điều khiển để đào tiền ảo hoặc kết nối tới IP độc hại, sau đó tự động cách ly máy EC2 đó bằng cách đổi Security Group. Kết hợp dịch vụ nào tối ưu nhất?",
        options: [
          "A. Amazon GuardDuty + Amazon EventBridge + AWS Lambda",
          "B. AWS Artifact + Amazon Athena",
          "C. AWS Cost Explorer + AWS Budgets",
          "D. Amazon Macie + S3 Object Lock"
        ],
        correctIdx: 0,
        explanation: "Amazon GuardDuty tự động phân tích VPC Flow Logs, DNS Logs và CloudTrail để phát hiện hành vi đào tiền ảo, sau đó bắn Finding sang Amazon EventBridge để kích hoạt hàm AWS Lambda tự động cách ly máy chủ."
      }
    ]
  },

  56: {
    jargon: [
      { term: "Keyword-First Technique (Đọc câu cuối trước)", plain: "Tuyệt chiêu làm bài thi SAA-C03 không bị mỏi mắt: Đừng đọc từ dòng đầu tiên! Hãy nhìn xuống câu hỏi cuối cùng trước để biết giám khảo đang đòi 'Rẻ nhất (MOST cost-effective)' hay 'Nhàn nhất (LEAST operational overhead)' rồi mới quét ngược lên tìm từ khóa!" },
      { term: "Distractor Elimination (Loại trừ phương án nhiễu)", plain: "Trong 4 đáp án A, B, C, D của AWS luôn có 2 đáp án phạm lỗi kỹ thuật ngớ ngẩn (ví dụ: Gắn WAF vào EC2, chạy Lambda 30 phút, dùng CNAME cho Root domain). Gạch bỏ ngay 2 câu đó trong 5 giây đầu tiên!" }
    ],
    diagram: `
Chiến Thuật 3 Bước Giải Quyết Mọi Câu Hỏi Dài Trong Đề Thi SAA-C03:
 [Bước 1: Đọc câu hỏi cuối cùng (5 giây)]
    ├── Hỏi "LEAST operational overhead / Effort"? ──► Tìm đáp án dùng Serverless / Managed Service (Fargate, Lambda, Athena, RDS Proxy, Aurora)!
    ├── Hỏi "MOST cost-effective"?                 ──► Tìm đáp án dùng Spot, S3 Lifecycle/Glacier, Gateway VPC Endpoint (Free), gp3, On-Demand DynamoDB!
    └── Hỏi "HIGHEST availability / Resiliency"?   ──► Tìm đáp án Multi-AZ, Aurora Global DB, Multi-Region Active-Active!
           │
           ▼
 [Bước 2: Gạch bỏ ngay 2 đáp án sai kiến thức cứng] ──► [Bước 3: Chọn đáp án khớp Keyword giữa 2 câu còn lại!]`,
    deepSections: [
      {
        title: "1. Top 10 'Phản xạ Điều kiện' giúp bạn ăn điểm ngay trong 10 giây",
        content: "1. <em>EC2 trong Private Subnet gọi S3/DynamoDB tốn tiền NAT Gateway</em> → <strong>Gateway VPC Endpoint (Miễn phí)</strong>.<br>2. <em>Hàng trăm hàm Lambda gọi RDS gây lỗi Too many connections</em> → <strong>Amazon RDS Proxy</strong>.<br>3. <em>Chia sẻ file POSIX cho nhiều máy Linux qua nhiều AZ</em> → <strong>Amazon EFS</strong> (Windows SMB/AD → <strong>FSx for Windows</strong>; HPC + S3 → <strong>FSx for Lustre</strong>).<br>4. <em>Báo cáo BI làm chậm DB chính</em> → <strong>RDS Read Replica</strong> (Tự động chuyển đổi dự phòng khi sập AZ → <strong>RDS Multi-AZ</strong>).<br>5. <em>Định tuyến theo URL Path / Hostname / Microservices</em> → <strong>ALB</strong> (Cần TCP/UDP siêu tốc hoặc Static IP mỗi AZ → <strong>NLB</strong>; Cần IP tĩnh toàn cầu + Failover đa Region không cache → <strong>Global Accelerator</strong>).<br>6. <em>Gắn WAF bảo vệ máy EC2</em> → Đặt <strong>ALB hoặc CloudFront</strong> trước EC2 rồi gắn WAF.<br>7. <em>Gửi 1 sự kiện cho nhiều dịch vụ độc lập không mất tin</em> → <strong>SNS + SQS (Fan-out)</strong>.<br>8. <em>Quản trị vào EC2 trong Private Subnet không mở cổng 22, không Bastion</em> → <strong>SSM Session Manager</strong>.<br>9. <em>Tự động xoay vòng mật khẩu DB</em> → <strong>AWS Secrets Manager</strong>.<br>10. <em>Đo RAM và Disk trống của EC2</em> → <strong>Cài CloudWatch Unified Agent</strong>."
      },
      {
        title: "2. Tâm lý chiến khi bắt đầu chuỗi 24 buổi luyện đề (Buổi 57 → 80)",
        content: "• Ở 2 đề đầu tiên (Đề 1 & Đề 2), việc bạn chỉ đạt <strong>55% – 65%</strong> là hoàn toàn bình thường! Đừng nản lòng vì mục đích của việc luyện đề là để quen mặt các từ vựng tiếng Anh thực tế.<br>• Mỗi ngày bạn chỉ cần làm đúng <strong>16 câu (trong 1 tiếng)</strong>. Khi làm sai 1 câu, hãy bấm nút <strong>➕ Thêm Thẻ Mới Vào Web</strong> ở góc trên để biến lỗi sai đó thành 1 thẻ Flashcard của riêng bạn!"
      }
    ],
    extraCards: [
      { q: "Tổng kết 5 bẫy 'Không thể làm được' hay dùng để loại đáp án sai trong đề thi SAA-C03?", a: "1) Không thể gắn WAF trực tiếp vào EC2/NLB. 2) Không thể chạy Lambda quá 15 phút. 3) Không thể đặt NAT Gateway trong Private Subnet. 4) Không thể dùng CNAME cho Zone Apex (Root domain). 5) Không thể đọc dữ liệu trên máy Standby của RDS Multi-AZ tiêu chuẩn." },
      { q: "Khi gặp một câu hỏi mà cả 2 đáp án A (Tự cài phần mềm trên EC2) và B (Dùng dịch vụ AWS Managed/Serverless) đều giải quyết được bài toán kỹ thuật, còn câu cuối hỏi 'MOST operationally efficient / LEAST operational overhead', ta luôn chọn đáp án nào?", a: "Luôn chọn đáp án B (Sử dụng dịch vụ AWS Managed hoặc Serverless như Fargate, Lambda, Athena, RDS, ElastiCache, DataSync)." }
    ],
    quizzes: [
      {
        qEn: "A company is designing a new 3-tier web application on AWS. Which of the following architectural designs contains a fundamental technical flaw that will prevent it from working?",
        qVi: "Công ty đang thiết kế ứng dụng web 3 tầng trên AWS. Thiết kế nào dưới đây chứa một lỗi kỹ thuật sai bản chất khiến hệ thống KHÔNG THỂ hoạt động được?",
        options: [
          "A. Placing an Application Load Balancer in a public subnet and EC2 instances in a private subnet.",
          "B. Placing a Public NAT Gateway inside a private subnet and attaching AWS WAF directly to a Network Load Balancer.",
          "C. Creating a Gateway VPC Endpoint for Amazon S3 and adding it to the private subnet route table.",
          "D. Placing Amazon RDS Proxy between AWS Lambda and Amazon Aurora."
        ],
        correctIdx: 1,
        explanation: "Câu B chứa tới 2 lỗi kỹ thuật nghiêm trọng thường dùng làm phương án nhiễu trong đề thi: (1) NAT Gateway bắt buộc phải đặt ở Public Subnet chứ không thể đặt ở Private Subnet; (2) AWS WAF chỉ gắn được vào ALB/CloudFront/API Gateway chứ không gắn được vào NLB."
      },
      {
        qEn: "An architect is reviewing four requirements for a new cloud-native system. Which requirement CANNOT be met by AWS Lambda alone and requires an alternative compute service like AWS Batch or Amazon ECS on AWS Fargate?",
        qVi: "Kiến trúc sư đang xem xét 4 yêu cầu cho hệ thống mới. Yêu cầu nào dưới đây KHÔNG THỂ đáp ứng được bằng AWS Lambda mà bắt buộc phải chuyển sang dùng AWS Batch hoặc ECS Fargate?",
        options: [
          "A. Generating image thumbnails in 5 seconds whenever a file is uploaded to Amazon S3.",
          "B. Running a continuous 40-minute video transcoding and compression job per file.",
          "C. Validating a JWT token for Amazon API Gateway in 50 milliseconds.",
          "D. Processing change records from Amazon DynamoDB Streams."
        ],
        correctIdx: 1,
        explanation: "AWS Lambda có giới hạn cứng thời gian thực thi tối đa (Maximum timeout) là 15 phút (900 giây). Mọi tác vụ chạy liên tục trên 15 phút (như 40 phút) đều phải loại bỏ Lambda và chọn ECS Fargate hoặc AWS Batch."
      }
    ]
  }
};

// Gộp toàn bộ 4 phần nội dung chuyên sâu (Buổi 1 -> 56) vào làm một và tự động nạp vào STUDY_DATA ngay khi tải trang!
(function mergeAndApplyAllDeepContent() {
  window.DEEP_CONTENT_ALL = Object.assign(
    {},
    window.DEEP_CONTENT_PART1 || {},
    window.DEEP_CONTENT_PART2 || {},
    window.DEEP_CONTENT_PART3 || {},
    window.DEEP_CONTENT_PART4 || {}
  );

  if (!window.STUDY_DATA || !window.STUDY_DATA.sessions) return;

  window.STUDY_DATA.sessions.forEach(function (s) {
    const rich = window.DEEP_CONTENT_ALL[s.id];
    if (rich) {
      s.jargon = rich.jargon;
      s.diagram = rich.diagram;
      s.deepSections = rich.deepSections;
      s.quizzes = rich.quizzes;

      // Bổ sung thêm các thẻ Flashcard mới (extraCards) vào danh sách thẻ của buổi học (tránh trùng lặp)
      if (Array.isArray(rich.extraCards) && Array.isArray(s.cards)) {
        rich.extraCards.forEach(function (ec) {
          const exists = s.cards.some(function (existing) {
            return existing.q === ec.q;
          });
          if (!exists) {
            s.cards.push(ec);
          }
        });
      }
    } else if (s.id > 56) {
      // Cho các buổi luyện đề từ 57 -> 80: Bổ sung từ điển giải nghĩa và câu hỏi phản xạ luyện đề
      s.jargon = s.jargon || [
        {
          term: "Active Recall (Chủ động truy xuất ký ức)",
          plain: "Khi đọc giải thích câu làm sai, đừng chỉ gật gù đọc lướt! Hãy tóm tắt lý do sai thành 1 câu hỏi ngắn rồi bấm nút '➕ Thêm Thẻ Mới Vào Web' để ngày mai Anki hỏi lại bạn."
        },
        {
          term: "65% -> 80% Rule (Quy tắc vượt vũ môn)",
          plain: "Lần đầu làm đề đạt 55-65% là hoàn toàn bình thường. Sau khi tạo Flashcard cho các câu sai và làm lại lần 2 đạt trên 80% nghĩa là bạn đã sẵn sàng đỗ kỳ thi thật (720/1000 điểm)!"
        }
      ];
      s.deepSections = s.deepSections || [
        {
          title: "Hướng dẫn thực hành 60 phút cho Buổi Luyện Đề hôm nay",
          content: "1. Mở kho đề miễn phí tại tab <strong>🎁 Kho Đề & Tài Liệu Free</strong> (DevCloudly / ಕಾಣ ExamTopics / Dumps) và làm đúng <strong>16 câu tiếp theo</strong> theo tiến độ của buổi này.<br>2. Áp dụng kỹ thuật <strong>Đọc câu hỏi cuối cùng trước</strong> để bắt từ khóa (<em>Most cost-effective, Least operational overhead, Highest availability</em>).<br>3. Với bất kỳ câu nào bạn chọn sai hoặc phân vân giữa 2 đáp án: Hãy bấm nút <strong>➕ Thêm Thẻ Mới Vào Web</strong> ngay bên dưới để biến kiến thức đó thành thẻ Spaced Repetition!"
        }
      ];
    }
  });
})();
