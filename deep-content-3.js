// Bộ Giáo Trình Chi Tiết Toàn Diện Phần 3 (Buổi 29 -> 43: Chặng 4 & Chặng 5)
window.DEEP_CONTENT_PART3 = {
  29: {
    jargon: [
      { term: "SMB (Server Message Block) & NTFS", plain: "Chuẩn chia sẻ thư mục mạng mặc định của hệ điều hành Microsoft Windows (trên Linux thì dùng NFS/EFS, còn trên Windows thì dùng SMB/FSx for Windows)." },
      { term: "Scratch vs Persistent File System (FSx for Lustre)", plain: "Scratch = Ổ nháp siêu tốc giá rẻ dùng cho tính toán ngắn hạn (không nhân bản dữ liệu, hỏng phần cứng là mất). Persistent = Ổ lưu trữ lâu dài có tự động nhân bản và tự thay thế phần cứng lỗi trong vài phút." },
      { term: "DFS Namespaces (Distributed File System)", plain: "Tính năng của FSx for Windows giúp gom nhiều ổ đĩa mạng khác nhau lại dưới 1 cây thư mục ảo duy nhất để mở rộng dung lượng tới hàng trăm Terabyte." }
    ],
    diagram: `
Chọn Nhanh 4 Anh Em Nhà Amazon FSx:
 ├── Máy chủ Windows + Giao thức SMB + Active Directory?          ──► [FSx for Windows File Server]
 ├── Siêu máy tính HPC + Machine Learning + Tích hợp thẳng S3?   ──► [FSx for Lustre] (Scratch = Ngắn hạn / Persistent = Lâu dài)
 ├── Đang dùng NetApp dưới On-prem (Đa giao thức NFS/SMB/iSCSI)? ──► [FSx for NetApp ONTAP]
 └── Đang dùng hệ thống file ZFS trên Linux dưới On-prem?        ──► [FSx for OpenZFS]`,
    deepSections: [
      {
        title: "1. Phân biệt rõ Amazon EFS vs FSx for Windows vs FSx for Lustre",
        content: "• <strong>Amazon EFS</strong>: Dành cho nhiều máy <strong>Linux</strong> (giao thức NFS, chuẩn POSIX).<br>• <strong>Amazon FSx for Windows File Server</strong>: Dành cho các máy chủ <strong>Windows</strong> (cũng hỗ trợ mount từ Linux qua SMB). Hỗ trợ đầy đủ <strong>SMB, NTFS, Microsoft Active Directory (AD), ACLs, DFS Namespaces</strong> và có tùy chọn <strong>Multi-AZ</strong> (tự động Failover) hoặc Single-AZ.<br>• <strong>Amazon FSx for Lustre (Linux + Cluster)</strong>: Hệ thống file phân tán song song nhanh nhất thế giới dành cho <strong>HPC (High Performance Computing), Machine Learning, Video Processing, Financial Modeling</strong> (hàng trăm GB/s, độ trễ dưới 1ms). Điểm ăn tiền nhất: <strong>Tích hợp liền mạch với Amazon S3</strong> (đọc dữ liệu từ S3 dưới dạng file Lustre và ghi kết quả tính toán ngược lại về S3)."
      },
      {
        title: "2. Khi nào chọn Scratch vs Persistent trên FSx for Lustre & Khi nào chọn NetApp ONTAP?",
        content: "• Trên <strong>FSx for Lustre</strong>:<br>  - Chọn <strong>Scratch File System</strong> khi đề bài nói: <em>'Xử lý dữ liệu ngắn hạn (Short-term processing), ưu tiên tốc độ bùng nổ cao nhất và tiết kiệm chi phí nhất, dữ liệu có thể tạo lại nếu mất'</em>.<br>  - Chọn <strong>Persistent File System</strong> khi đề bài nói: <em>'Lưu trữ lâu dài (Long-term storage), dữ liệu nhạy cảm không được phép mất khi hỏng ổ đĩa'</em> (dữ liệu được nhân bản trong cùng 1 AZ).<br>• <strong>FSx for NetApp ONTAP</strong>: Chọn khi đề bài nhắc tới việc di chuyển hệ thống lưu trữ <strong>NetApp</strong> lên AWS, cần các tính năng của ONTAP như <em>SnapMirror, SnapVault, Data tiering, De-duplication, Cloning</em> hoặc cần truy cập đồng thời qua cả <strong>NFS (Linux) và SMB (Windows)</strong>."
      }
    ],
    extraCards: [
      { q: "Trong Amazon FSx for Lustre, phân biệt khi nào dùng Scratch File System và khi nào dùng Persistent File System?", a: "Scratch: Dành cho xử lý ngắn hạn tạm thời, chi phí thấp, không nhân bản dữ liệu. Persistent: Dành cho lưu trữ lâu dài, dữ liệu được nhân bản trong cùng AZ và tự động thay thế phần cứng lỗi." },
      { q: "Công ty muốn di chuyển hệ thống NAS đang chạy NetApp dưới On-premise lên AWS mà vẫn giữ nguyên các tính năng SnapMirror, chống trùng lặp (Deduplication) và truy cập đa giao thức (NFS + SMB). Chọn dịch vụ nào?", a: "Amazon FSx for NetApp ONTAP." }
    ],
    quizzes: [
      {
        qEn: "A financial services company runs a high-performance computing (HPC) risk simulation on hundreds of Linux EC2 instances. The simulation reads raw input data from an Amazon S3 bucket, requires hundreds of GB/s of throughput with sub-millisecond latency during the 4-hour calculation, and writes the final results back to the S3 bucket. Which storage service is MOST suitable?",
        qVi: "Công ty tài chính chạy mô phỏng rủi ro HPC trên hàng trăm máy EC2 Linux. Mô phỏng cần đọc dữ liệu đầu vào từ S3, đòi hỏi băng thông hàng trăm GB/s với độ trễ dưới 1ms trong suốt 4 giờ tính toán, rồi ghi kết quả trả ngược về S3. Dịch vụ lưu trữ nào phù hợp nhất?",
        options: [
          "A. Amazon EFS",
          "B. Amazon FSx for Lustre (Scratch file system) linked to the Amazon S3 bucket",
          "C. Amazon FSx for Windows File Server",
          "D. Amazon EBS sc1"
        ],
        correctIdx: 1,
        explanation: "Amazon FSx for Lustre được thiết kế chuyên biệt cho bài toán HPC/Machine Learning đòi hỏi băng thông hàng trăm GB/s và tích hợp đọc/ghi hai chiều trực tiếp với Amazon S3."
      },
      {
        qEn: "An enterprise is migrating a fleet of Microsoft Windows Server applications to AWS. The applications require a shared network file system that supports the SMB protocol, Windows NTFS permissions, and integrates directly with the company's self-managed Microsoft Active Directory across multiple Availability Zones. Which service should be used?",
        qVi: "Doanh nghiệp đưa dàn ứng dụng Windows Server lên AWS. Các ứng dụng cần một ổ đĩa mạng chia sẻ hỗ trợ giao thức SMB, phân quyền Windows NTFS và tích hợp trực tiếp với Microsoft Active Directory trên nhiều AZ. Chọn dịch vụ nào?",
        options: [
          "A. Amazon EFS",
          "B. Amazon FSx for Windows File Server (Multi-AZ)",
          "C. Amazon S3 File Gateway",
          "D. Amazon EBS Multi-Attach"
        ],
        correctIdx: 1,
        explanation: "Amazon FSx for Windows File Server cung cấp hệ thống file mạng thuần Windows hỗ trợ đầy đủ SMB, NTFS, Active Directory và triển khai Multi-AZ."
      }
    ]
  },

  30: {
    jargon: [
      { term: "Hybrid Storage", plain: "Mô hình chân trong chân ngoài: Máy chủ vẫn đặt ở dưới tòa nhà công ty (On-premise), nhưng ổ cứng lưu trữ thì vươn lên đám mây S3 của AWS." },
      { term: "Cached Volumes vs Stored Volumes (Volume Gateway)", plain: "Cached = Toàn bộ dữ liệu gốc cất trên S3, dưới công ty chỉ giữ 1 phần nhỏ hay dùng làm bộ đệm. Stored = Toàn bộ dữ liệu gốc nằm ngay dưới ổ cứng công ty, đồng thời chụp EBS Snapshot gửi ngầm lên S3 để dự phòng." },
      { term: "AWS Snowcone vs Snowball Edge vs Snowmobile", plain: "3 kích cỡ thiết bị chuyển dữ liệu vật lý: Snowcone = Cục ổ cứng nhỏ bỏ vừa balo (8-14 TB). Snowball Edge = Vali chống sốc (80 TB). Snowmobile = Nguyên chiếc xe đầu kéo container (100 PB)!" }
    ],
    diagram: `
Bản đồ Di chuyển & Kết nối Dữ liệu Hybrid:
 ├── Muốn máy chủ dưới On-premise mở file trên S3 qua NFS/SMB có Local Cache? ──► [AWS Storage Gateway - S3 File Gateway]
 ├── Muốn đồng bộ/di chuyển dữ liệu qua mạng Internet/DX nhanh gấp 10 lần?   ──► [AWS DataSync] (Giữ nguyên Metadata!)
 ├── Mạng Internet quá yếu mà cần bê 100 TB lên S3 trong 1 tuần?             ──► [AWS Snowball Edge] ──► [S3 Standard] ──(Lifecycle)──► [Glacier]
 └── Đối tác bên ngoài chỉ biết đẩy file qua giao thức SFTP / FTPS / FTP?    ──► [AWS Transfer Family] (Lưu thẳng vào S3/EFS!)`,
    deepSections: [
      {
        title: "1. Bốn loại AWS Storage Gateway (Đề thi rất hay hỏi phân biệt!)",
        content: "• <strong>1. S3 File Gateway</strong>: Biến S3 Bucket thành ổ mạng <strong>NFS/SMB</strong> cho máy chủ dưới On-premise; các file mới dùng được lưu vào <strong>Local Cache</strong> ngay tại công ty để mở cực nhanh.<br>• <strong>2. FSx File Gateway</strong>: Cung cấp quyền truy cập độ trễ thấp kèm Local Cache từ On-premise vào thẳng <em>Amazon FSx for Windows File Server</em> trên mây.<br>• <strong>3. Volume Gateway (Giao thức Block iSCSI)</strong>: Dùng để sao lưu ổ cứng máy chủ On-premise thành các bản <em>EBS Snapshots</em> (Gồm <em>Cached Volumes</em> và <em>Stored Volumes</em>).<br>• <strong>4. Tape Gateway (VTL - Virtual Tape Library)</strong>: Khi đề bài có chữ <strong><em>'Replace physical backup magnetic tapes while keeping existing tape backup software (Veeam, NetBackup)'</em></strong> → Chọn ngay <strong>Tape Gateway</strong>!"
      },
      {
        title: "2. AWS DataSync vs Snowball Edge vs AWS Transfer Family",
        content: "• <strong>AWS DataSync</strong>: Chọn khi công ty <strong>có sẵn đường truyền mạng đủ nhanh (Internet hoặc Direct Connect)</strong> và muốn di chuyển hoặc đồng bộ định kỳ hàng chục TB từ NAS (NFS/SMB) dưới On-premise lên S3, EFS hoặc FSx mà vẫn <strong>giữ nguyên thông tin quyền file (preserve file metadata & permissions)</strong> và kiểm soát giới hạn băng thông (bandwidth throttling).<br>• <strong>AWS Snowball Edge</strong>: Chọn khi <strong>băng thông mạng quá chậm (mất nhiều tháng nếu truyền qua mạng)</strong>. Nhớ bẫy kinh điển: <strong>Snowball KHÔNG chép thẳng vào Glacier được</strong>, phải chép vào S3 trước rồi dùng S3 Lifecycle chuyển xuống Glacier! Ngoài ra <em>Snowball Edge Compute Optimized</em> có thể chạy sẵn <strong>EC2 instances hoặc hàm Lambda ngay trên chiếc hộp</strong> ở những nơi không có mạng (tàu biển, giàn khoan, hầm mỏ).<br>• <strong>AWS Transfer Family</strong>: Dịch vụ quản lý hoàn toàn cho phép khách hàng dùng giao thức cũ <strong>SFTP, FTPS, FTP</strong> upload/download trực tiếp vào <strong>Amazon S3 hoặc Amazon EFS</strong>."
      }
    ],
    extraCards: [
      { q: "Công ty có 80 TB dữ liệu nằm trên máy chủ NAS (NFS) dưới On-premise và có sẵn đường truyền Direct Connect 10 Gbps nhàn rỗi. Công cụ nào giúp chép toàn bộ dữ liệu lên Amazon EFS nhanh nhất mà vẫn giữ nguyên toàn bộ quyền hạn và metadata của file?", a: "AWS DataSync." },
      { q: "Một ngân hàng cần cung cấp máy chủ SFTP có tính sẵn sàng cao để các đối tác tải báo cáo tài chính lên lưu trực tiếp vào Amazon S3 mà không muốn tự cài đặt hay quản lý máy chủ EC2. Chọn dịch vụ nào?", a: "AWS Transfer Family (AWS Transfer for SFTP)." },
      { q: "Trên tàu nghiên cứu ngoài biển khơi không có kết nối Internet, các nhà khoa học cần một thiết bị phần cứng của AWS vừa lưu trữ được hàng chục TB dữ liệu vừa chạy được máy ảo EC2 tại chỗ (Edge computing) để tiền xử lý dữ liệu trước khi tàu cập cảng. Chọn thiết bị nào?", a: "AWS Snowball Edge Compute Optimized." }
    ],
    quizzes: [
      {
        qEn: "A company has 500 TB of archival files on an on-premises NAS server and wants to migrate them to Amazon S3 Glacier Deep Archive. The company's internet connection is only 50 Mbps, which cannot be upgraded. What is the MOST efficient way to migrate this data?",
        qVi: "Công ty có 500 TB file lưu trữ trên máy chủ NAS dưới đất muốn đưa lên S3 Glacier Deep Archive, nhưng đường truyền Internet chỉ có 50 Mbps không nâng cấp được. Cách hiệu quả nhất để chuyển khối dữ liệu này là gì?",
        options: [
          "A. Use AWS DataSync over the 50 Mbps internet connection.",
          "B. Order AWS Snowball Edge devices to copy the data to Amazon S3 Standard, and then use an S3 Lifecycle policy to transition the objects to S3 Glacier Deep Archive.",
          "C. Use AWS Snowball Edge to load the data directly into S3 Glacier Deep Archive without using S3 Standard.",
          "D. Use S3 Transfer Acceleration."
        ],
        correctIdx: 1,
        explanation: "Vì đường truyền 50 Mbps quá chậm cho 500 TB nên phải dùng thiết bị vật lý Snowball Edge. Tuy nhiên Snowball không thể nạp trực tiếp vào Glacier, mà phải nạp vào S3 trước rồi dùng S3 Lifecycle chuyển xuống Glacier Deep Archive."
      },
      {
        qEn: "A hospital currently uses physical magnetic tapes and commercial backup software to archive patient records. The hospital wants to eliminate the cost of managing physical tapes by storing virtual tapes in Amazon S3 Glacier while continuing to use its existing tape backup software workflows without modification. Which solution meets this requirement?",
        qVi: "Bệnh viện đang dùng cuộn băng từ vật lý và phần mềm sao lưu thương mại. Họ muốn bỏ băng từ vật lý để lưu băng từ ảo lên S3 Glacier nhưng vẫn giữ nguyên phần mềm sao lưu hiện tại không sửa đổi quy trình. Chọn giải pháp nào?",
        options: [
          "A. AWS Storage Gateway - S3 File Gateway",
          "B. AWS Storage Gateway - Tape Gateway (Virtual Tape Library)",
          "C. AWS Storage Gateway - Volume Gateway",
          "D. AWS Backup"
        ],
        correctIdx: 1,
        explanation: "Storage Gateway - Tape Gateway (VTL) giả lập đầu đọc băng từ chuẩn iSCSI giúp giữ nguyên phần mềm sao lưu cũ và tự động lưu trữ các cuộn băng từ ảo xuống S3 Glacier."
      }
    ]
  },

  31: {
    jargon: [
      { term: "Decoupling (Tách rời sự phụ thuộc)", plain: "Thay vì để máy A gọi trực tiếp máy B (nếu máy B sập hoặc chậm thì máy A chết chùm), ta đặt cái rổ hàng đợi SQS ở giữa: Máy A cứ bỏ việc vào rổ rồi đi làm việc khác, máy B rảnh lúc nào lấy ra làm lúc đó!" },
      { term: "Visibility Timeout (Thời gian tàng hình)", plain: "Khi máy chủ số 1 thò tay bốc 1 tin nhắn ra làm, tin nhắn đó tàng hình 30 giây để máy chủ số 2 không bốc trùng. Nếu máy 1 làm xong và gọi DeleteMessage thì tin nhắn biến mất; nếu máy 1 bị treo quá 30s thì tin nhắn hiện lại cho máy 2 làm!" },
      { term: "SQS Message Group ID (Trong FIFO Queue)", plain: "Giúp phân luồng xử lý song song mà vẫn giữ đúng thứ tự cho từng khách hàng: Ví dụ gán MessageGroupId = CustomerID, thì các đơn hàng của khách A luôn đi đúng thứ tự của khách A, nhưng đơn của khách A và khách B được nhiều máy EC2 xử lý song song cùng lúc!" }
    ],
    diagram: `
[Tầng Web] ──(SendMessage)──► [Amazon SQS Queue (Lưu tối đa 14 ngày, Max 256KB/tin)]
                                     │
         ┌───────────────────────────┴───────────────────────────┐
         ▼ (Nếu lỗi quá 3 lần -> Đẩy sang rổ cách ly)            ▼ (Bật Long Polling 20s để tiết kiệm tiền)
[Dead Letter Queue (DLQ)]                              [Cụm EC2 Auto Scaling dựa trên chỉ số: ApproximateNumberOfMessagesVisible]`,
    deepSections: [
      {
        title: "1. Các con số giới hạn và tính năng cốt lõi của Amazon SQS trong đề thi",
        content: "• <strong>Thời gian lưu giữ tin nhắn (Message Retention)</strong>: Mặc định 4 ngày, tối thiểu 1 phút, <strong>tối đa 14 ngày</strong>.<br>• <strong>Kích thước tối đa 1 tin nhắn</strong>: <strong>256 KB</strong>. Câu hỏi bẫy: <em>'Làm sao gửi một tin nhắn nặng 50 MB qua SQS?'</em> → Dùng thư viện <strong>SQS Extended Client Library for Java</strong> (nó tự động lưu cục dữ liệu 50 MB đó vào <strong>Amazon S3</strong>, rồi chỉ gửi một tin nhắn nhỏ chứa đường dẫn con trỏ S3 đi qua SQS!).<br>• <strong>SQS FIFO Queue</strong>: Đảm bảo đúng thứ tự (First-In-First-Out) và chống trùng lặp (Deduplication trong cửa sổ 5 phút). Mặc định xử lý 300 msg/s (hoặc 3,000 msg/s nếu gửi theo Batch; lên tới 70,000 msg/s nếu bật <em>High Throughput FIFO</em>). Nhớ: Dùng tham số <strong><code>MessageGroupId</code></strong> để gom nhóm thứ tự theo từng đối tượng!"
      },
      {
        title: "2. Cách cấu hình Auto Scaling cho dàn máy EC2 xử lý hàng đợi SQS (Câu hỏi kinh điển!)",
        content: "Đề thi SAA-C03 cực kỳ hay hỏi: <em>'Một dàn máy EC2 nằm trong Auto Scaling Group lấy việc từ hàng đợi SQS ra xử lý. Nhưng hiện tại ASG đang co giãn theo chỉ số CPU của EC2, khiến lúc hàng đợi SQS bị ứ đọng hàng triệu tin nhắn mà CPU thấp thì ASG không chịu bật thêm máy! Phải sửa thế nào?'</em><br>👉 <strong>Giải pháp chuẩn AWS</strong>: Không co giãn theo CPU nữa! Hãy co giãn dựa trên chỉ số CloudWatch của SQS là <strong><code>ApproximateNumberOfMessagesVisible</code></strong> (Số lượng tin nhắn đang tồn đọng trong hàng đợi). Tốt hơn nữa là tạo một <strong>Custom CloudWatch Metric lấy <code>ApproximateNumberOfMessagesVisible</code> chia cho số lượng máy EC2 đang chạy (Backlog per instance)</strong> rồi dùng <em>Target Tracking Scaling Policy</em>!"
      }
    ],
    extraCards: [
      { q: "Giới hạn kích thước tối đa của 1 tin nhắn trên Amazon SQS là bao nhiêu KB? Nếu ứng dụng cần gửi các thông điệp lớn tới 100 MB qua SQS thì giải pháp chuẩn là gì?", a: "Giới hạn của SQS là 256 KB. Để gửi tin nhắn lớn tới 100 MB (tối đa 2 GB), dùng SQS Extended Client Library kết hợp với Amazon S3 (lưu nội dung lớn trên S3 và gửi metadata qua SQS)." },
      { q: "Khi thiết kế một cụm EC2 Auto Scaling Group chuyên xử lý các tác vụ lấy từ hàng đợi Amazon SQS, ta nên cấu hình ASG co giãn dựa trên chỉ số CloudWatch nào?", a: "Chỉ số 'ApproximateNumberOfMessagesVisible' của SQS (hoặc tỷ lệ Backlog per instance = Số tin nhắn tồn đọng chia cho số máy EC2 đang chạy)." },
      { q: "Trong SQS FIFO Queue, tham số bắt buộc nào được dùng để phân nhóm các tin nhắn cần giữ đúng thứ tự với nhau, đồng thời cho phép nhiều Consumer xử lý song song các nhóm khác nhau?", a: "MessageGroupId." }
    ],
    quizzes: [
      {
        qEn: "An image processing application uses an Auto Scaling group of EC2 instances to poll an Amazon SQS queue. Currently, the Auto Scaling group scales based on EC2 CPU utilization, but during peak hours the SQS queue builds up a massive backlog of hundreds of thousands of messages resulting in slow processing times. How should the architect redesign the scaling strategy?",
        qVi: "Ứng dụng xử lý ảnh dùng cụm EC2 Auto Scaling lấy việc từ hàng đợi SQS. Hiện tại ASG co giãn theo CPU của EC2, nhưng giờ cao điểm hàng đợi SQS bị ứ đọng hàng trăm nghìn tin nhắn làm xử lý rất chậm. Kiến trúc sư nên thiết kế lại chiến lược co giãn thế nào?",
        options: [
          "A. Switch to Scheduled Scaling.",
          "B. Configure the Auto Scaling group to scale based on the SQS 'ApproximateNumberOfMessagesVisible' metric (calculating backlog per instance) with a Target Tracking Scaling policy.",
          "C. Reduce the SQS Visibility Timeout to 1 second.",
          "D. Replace Amazon SQS with Amazon SNS."
        ],
        correctIdx: 1,
        explanation: "Với kiến trúc Worker đọc từ SQS, co giãn dựa trên độ dài hàng đợi (ApproximateNumberOfMessagesVisible chia cho số instance đang chạy) phản ánh chính xác khối lượng việc đang chờ xử lý."
      },
      {
        qEn: "A Java application needs to send XML payloads through Amazon SQS. Most payloads are 50 KB, but occasionally some payloads reach 15 MB, causing SQS to reject the messages. What is the MOST operationally efficient way to handle these large messages?",
        qVi: "Ứng dụng Java gửi các gói tin XML qua SQS. Hầu hết nặng 50 KB, nhưng thỉnh thoảng có gói nặng tới 15 MB khiến SQS từ chối nhận. Cách hiệu quả nhất để xử lý các tin nhắn lớn này là gì?",
        options: [
          "A. Switch to an SQS FIFO queue because FIFO supports up to 50 MB payloads.",
          "B. Use the Amazon SQS Extended Client Library for Java to store large payloads in Amazon S3 and send a pointer reference message via SQS.",
          "C. Use AWS Snowball Edge.",
          "D. Store all message payloads in Amazon Route 53."
        ],
        correctIdx: 1,
        explanation: "Mọi hàng đợi SQS (cả Standard và FIFO) đều giới hạn cứng 256 KB mỗi tin nhắn. Dùng SQS Extended Client Library kết hợp S3 là cách chuẩn để xử lý tin nhắn từ 256 KB lên tới 2 GB."
      }
    ]
  },

  32: {
    jargon: [
      { term: "Pub/Sub (Publish / Subscribe)", plain: "Mô hình Tòa soạn báo (Publisher) và Người đặt báo (Subscribers): Tòa soạn chỉ xuất bản tin 1 lần vào Topic, tất cả những ai đã đăng ký theo dõi Topic đó đều nhận được tin ngay lập tức." },
      { term: "Fan-Out Pattern (1 SNS + N SQS)", plain: "Mô hình loa phóng thanh nối vào nhiều hòm thư: Sự kiện bắn vào 1 SNS Topic, SNS nhân bản sự kiện đó đẩy vào 3 hàng đợi SQS của 3 phòng ban khác nhau để mỗi phòng tự xử lý độc lập không bao giờ sợ mất tin!" },
      { term: "SNS Message Filtering", plain: "Bộ lọc thông minh gắn trên đường nối giữa SNS và SQS: Ví dụ hàng đợi SQS của phòng Bảo hiểm chỉ muốn nhận các đơn hàng có trạng thái 'CANCELED', SNS sẽ lọc và chỉ đẩy đúng các tin nhắn thỏa mãn điều kiện JSON đó vào SQS!" }
    ],
    diagram: `
Mô hình Fan-Out + Message Filtering chuẩn SAA-C03:
                                  ┌──(Nhận 100% mọi đơn hàng)──────────► [SQS Queue 1: Hệ thống Kho vận]
[Dịch vụ Đặt hàng] ──► [SNS Topic]├──(Filter: status = "VIP_ORDER")────► [SQS Queue 2: Chăm sóc Khách VIP]
                                  └──(Filter: status = "CANCELED")─────► [SQS Queue 3: Hoàn tiền Kế toán]`,
    deepSections: [
      {
        title: "1. Tại sao mô hình Fan-Out (SNS + SQS) lại xuất hiện trong hầu hết mọi đề thi?",
        content: "• Nếu bạn chỉ dùng mỗi <strong>SQS</strong>: Một tin nhắn khi đã bị 1 dịch vụ (ví dụ: Dịch vụ Kho) lấy ra và xóa đi thì Dịch vụ Kế toán sẽ <strong>không còn nhìn thấy tin nhắn đó nữa</strong>.<br>• Nếu bạn chỉ dùng mỗi <strong>SNS</strong> đẩy thẳng về HTTP server của các dịch vụ: Nếu lúc đó máy chủ Kế toán đang bị tắt để bảo trì thì tin nhắn sẽ bị rơi mất.<br>• <strong>Kết hợp 1 SNS Topic + Nhiều SQS Queues (Fan-Out)</strong>: Giải quyết trọn vẹn cả hai! SNS nhân bản tin nhắn ra nhiều bản đẩy vào từng hàng đợi SQS riêng biệt, và mỗi SQS sẽ giữ tin nhắn an toàn tối đa 14 ngày chờ dịch vụ tương ứng xử lý!"
      },
      {
        title: "2. SNS Message Filtering & Giải quyết giới hạn S3 Event Notifications",
        content: "• <strong>SNS Message Filtering</strong>: Mặc định mọi Subscriber của SNS Topic đều nhận được 100% mọi tin nhắn. Nếu đề bài nói: <em>'Có 5 hàng đợi SQS đăng ký vào 1 SNS Topic, nhưng mỗi hàng đợi chỉ muốn nhận một loại đơn hàng cụ thể mà không muốn tốn công viết code lọc ở phía Consumer'</em> → Cấu hình <strong>SNS Subscription Filter Policy (JSON)</strong>!<br>• <strong>Giải quyết giới hạn trùng sự kiện của S3</strong>: S3 không cho phép tạo 2 quy tắc Event Notification cho cùng 1 loại sự kiện (<code>s3:ObjectCreated:*</code>) trên cùng 1 Prefix (<code>/images/*</code>). Muốn 1 file ảnh vừa upload lên S3 kích hoạt đồng thời cả 2 quy trình xử lý khác nhau → Cho <strong>S3 bắn sự kiện vào 1 SNS Topic (hoặc EventBridge), rồi từ SNS Fan-out ra 2 SQS/Lambda</strong>!"
      }
    ],
    extraCards: [
      { q: "Trong mô hình Fan-out (1 SNS Topic đẩy ra 4 SQS Queues), làm thế nào để một hàng đợi SQS chỉ nhận các tin nhắn có thuộc 'order_type = international' mà không cần tạo thêm SNS Topic mới?", a: "Cấu hình SNS Subscription Filter Policy (Message Filtering) bằng JSON trên kết nối đăng ký (Subscription) của hàng đợi SQS đó." },
      { q: "Khi cần áp dụng mô hình Fan-out (SNS + SQS) cho hệ thống giao dịch chứng khoán yêu cầu vừa gửi đồng thời cho nhiều dịch vụ vừa phải giữ ĐÚNG THỨ TỰ nghiêm ngặt và không trùng lặp, ta dùng giải pháp gì?", a: "Kết hợp Amazon SNS FIFO Topic với các hàng đợi Amazon SQS FIFO Queues." }
    ],
    quizzes: [
      {
        qEn: "An e-commerce application publishes all order events (Created, Shipped, Canceled) to a single Amazon SNS topic. Three different microservices subscribe to this topic via their own Amazon SQS queues. However, the Refund microservice only needs to process 'Canceled' orders and is wasting compute resources filtering out 'Created' and 'Shipped' messages. How can the architect optimize this?",
        qVi: "Ứng dụng thương mại điện tử đẩy mọi sự kiện đơn hàng (Tạo mới, Đã giao, Đã hủy) vào 1 SNS topic. Có 3 microservices đăng ký nhận qua 3 SQS queues riêng. Tuy nhiên dịch vụ Hoàn tiền chỉ cần xử lý đơn 'Đã hủy' và đang tốn tài nguyên vô ích để lọc bỏ các đơn khác. Tối ưu bằng cách nào?",
        options: [
          "A. Create 3 separate SNS topics and modify the publisher application code.",
          "B. Configure an Amazon SNS Subscription Filter Policy (Message Filtering) on the Refund SQS queue subscription to only receive messages with the 'Canceled' attribute.",
          "C. Enable SQS Long Polling.",
          "D. Switch to Amazon Kinesis Data Firehose."
        ],
        correctIdx: 1,
        explanation: "SNS Message Filtering (Subscription Filter Policy) cho phép lọc tin nhắn ngay tại tầng SNS dựa trên thuộc tính JSON trước khi đẩy xuống từng SQS Subscriber, không cần sửa code."
      },
      {
        qEn: "A company wants an Amazon S3 bucket to send an event notification whenever a '.jpg' file is uploaded to the 'uploads/' prefix. The event must simultaneously trigger two separate processes: one SQS queue for image resizing and another SQS queue for virus scanning. However, S3 does not allow two event notifications with overlapping prefixes for the same event type. How should the architect solve this?",
        qVi: "Công ty muốn mỗi khi có file '.jpg' tải lên thư mục 'uploads/' của S3 thì kích hoạt đồng thời 2 hàng đợi SQS riêng biệt (1 cái để resize ảnh, 1 cái để quét virus). Nhưng S3 không cho phép tạo 2 Event Notifications trùng cả loại sự kiện lẫn prefix. Giải quyết thế nào?",
        options: [
          "A. Create 2 identical S3 buckets.",
          "B. Configure S3 to send a single event notification to an Amazon SNS topic, and subscribe both SQS queues to that SNS topic (Fan-out pattern).",
          "C. Enable S3 Transfer Acceleration.",
          "D. Use S3 Presigned URLs."
        ],
        correctIdx: 1,
        explanation: "Đưa sự kiện từ S3 vào 1 SNS Topic rồi thực hiện Fan-out ra 2 SQS Queues (hoặc dùng Amazon EventBridge) là cách chuẩn để vượt qua giới hạn trùng lặp Event Notification của S3."
      }
    ]
  },

  33: {
    jargon: [
      { term: "Real-time (~200ms) vs Near Real-time (>= 60s)", plain: "Cặp từ khóa định đoạt 100% điểm số phần Kinesis: Hễ đề bài viết 'Real-time' -> Chọn Kinesis Data Streams. Hễ đề bài viết 'Near real-time' -> Chọn Kinesis Data Firehose!" },
      { term: "Shard (Trong Kinesis Data Streams)", plain: "Một làn đường cao tốc trong Kinesis: Mỗi Shard nhận vào tối đa 1 MB/giây (1,000 bản ghi/s) và cho đọc ra tối đa 2 MB/giây." },
      { term: "Apache Flink (Kinesis Data Analytics)", plain: "Công cụ chạy câu lệnh SQL hoặc code Java trực tiếp trên dòng nước dữ liệu đang chảy trong Kinesis (ví dụ: Tính trung bình nhiệt độ của cảm biến trong mỗi cửa sổ 5 phút vừa qua theo thời gian thực)." }
    ],
    diagram: `
Phân biệt Bộ Ba Streaming của Amazon Kinesis:
 1. [Kinesis Data Streams]  ──► Real-time (~200ms), Lưu giữ dữ liệu 1 -> 365 ngày, Cho phép Tua lại (Replay)!
 2. [Kinesis Data Firehose] ──► Near Real-time (>= 60s), Serverless, Đổ thẳng vào 4 đích: [S3] / [Redshift] / [OpenSearch] / [Splunk]
 3. [Managed Apache Flink]  ──► Phân tích thời gian thực (Real-time Analytics / Anomaly Detection) ngay trên dòng dữ liệu đang chảy!`,
    deepSections: [
      {
        title: "1. So sánh chi tiết Kinesis Data Streams vs Kinesis Data Firehose",
        content: "• <strong>Kinesis Data Streams</strong>:<br>  - Dành cho xử lý <strong>Thời gian thực (Real-time)</strong>.<br>  - Lưu trữ dữ liệu từ <strong>1 ngày đến 365 ngày</strong> → Có khả năng <strong>Replay (Phát lại dữ liệu cũ)</strong>.<br>  - Mỗi Shard có tốc độ Ghi <strong>1 MB/s (1,000 records/s)</strong> và tốc độ Đọc chia sẻ <strong>2 MB/s</strong> (hoặc bật <em>Enhanced Fan-Out</em> để mỗi ứng dụng đọc có riêng một đường ống 2 MB/s độc lập với độ trễ 70ms). Nếu bị lỗi <code>ProvisionedThroughputExceededException</code> do 1 khóa bị gửi quá nhiều → Dùng <em>Shard Splitting</em> hoặc đổi sang chế độ <em>On-Demand Mode</em>.<br>• <strong>Kinesis Data Firehose</strong>:<br>  - Dịch vụ nạp dữ liệu (Ingestion) hoàn toàn <strong>Serverless, tự động co giãn</strong>.<br>  - Độ trễ <strong>Near Real-time (gom buffer tối thiểu 60 giây hoặc tối thiểu 1 MB)</strong>.<br>  - Có thể gọi hàm <strong>AWS Lambda</strong> để biến đổi/làm sạch dữ liệu hoặc đổi định dạng JSON sang <strong>Apache Parquet / ORC</strong> trước khi đổ thẳng vào <strong>Amazon S3, Amazon Redshift, Amazon OpenSearch, hoặc HTTP Endpoints bên thứ 3 (Splunk, Datadog, New Relic)</strong>. <strong>KHÔNG lưu trữ để Replay!</strong>"
      },
      {
        title: "2. Khi nào chọn Amazon Managed Service for Apache Flink và khi nào chọn Amazon MQ?",
        content: "• <strong>Amazon Managed Service for Apache Flink (tên cũ là Kinesis Data Analytics)</strong>: Chọn khi đề bài yêu cầu <em>'Phân tích dữ liệu streaming theo thời gian thực (Real-time streaming analytics), tính toán trên cửa sổ trượt (sliding/tumbling windows), hoặc phát hiện bất thường thời gian thực trên dòng dữ liệu Kinesis/MSK'</em>.<br>• <strong>Amazon MQ</strong>: Chọn duy nhất khi đề bài nói: <em>'Di chuyển ứng dụng doanh nghiệp từ On-premise lên AWS đang dùng sẵn RabbitMQ / ActiveMQ với các giao thức chuẩn ngành như JMS, AMQP, MQTT, STOMP và yêu cầu KHÔNG SỬA CODE'</em>. (Hỗ trợ Multi-AZ Active/Standby kết hợp với Amazon EFS bên dưới)."
      }
    ],
    extraCards: [
      { q: "Kinesis Data Firehose có thể đẩy dữ liệu trực tiếp vào những dịch vụ đích (Destinations) nào của AWS?", a: "Amazon S3, Amazon Redshift (thông qua S3), Amazon OpenSearch Service, và các HTTP Endpoints tùy chỉnh/bên thứ 3 (Splunk, Datadog, MongoDB...)." },
      { q: "Một Shard trong Kinesis Data Streams ở chế độ Provisioned hỗ trợ băng thông Ghi (Ingestion) và băng thông Đọc (Consumption) tối đa là bao nhiêu MB mỗi giây?", a: "Ghi tối đa 1 MB/giây (hoặc 1,000 bản ghi/giây) và Đọc chia sẻ tối đa 2 MB/giây trên mỗi Shard." },
      { q: "Dịch vụ nào cho phép chạy các câu lệnh phân tích thời gian thực (Real-time analytics) hoặc thuật toán phát hiện bất thường trực tiếp trên dòng dữ liệu đang chảy trong Kinesis Data Streams?", a: "Amazon Managed Service for Apache Flink (tiền thân là Amazon Kinesis Data Analytics)." }
    ],
    quizzes: [
      {
        qEn: "A company wants to collect clickstream data from its website and load it into an Amazon S3 data lake in Apache Parquet format for analytics. A delay of 1 to 2 minutes (near real-time) is acceptable, and the company wants a serverless solution with the LEAST operational overhead. Which service should be used?",
        qVi: "Công ty muốn thu thập dữ liệu click chuột từ website và nạp thẳng vào S3 Data Lake dưới định dạng Apache Parquet. Độ trễ từ 1 đến 2 phút (gần thời gian thực) là hoàn toàn chấp nhận được và công ty muốn giải pháp Serverless tốn ít công vận hành nhất. Chọn dịch vụ nào?",
        options: [
          "A. Amazon Kinesis Data Streams",
          "B. Amazon Kinesis Data Firehose (with dynamic record format conversion to Parquet enabled)",
          "C. Amazon SQS FIFO",
          "D. Amazon MQ"
        ],
        correctIdx: 1,
        explanation: "Từ khóa 'Near real-time (1-2 minutes) + Serverless + Load directly into S3 + Convert to Parquet' chỉ thẳng tới Amazon Kinesis Data Firehose."
      },
      {
        qEn: "An enterprise is migrating a legacy Java application from on-premises to AWS. The application uses the Java Message Service (JMS) API and AMQP protocol to communicate with an on-premises ActiveMQ message broker. The company wants to migrate the message broker to a managed AWS service without rewriting the application code. Which service should be used?",
        qVi: "Doanh nghiệp đưa ứng dụng Java cũ từ On-premise lên AWS. Ứng dụng đang dùng chuẩn JMS và giao thức AMQP kết nối với ActiveMQ. Công ty muốn chuyển sang dịch vụ được AWS quản lý mà KHÔNG phải viết lại code ứng dụng. Chọn dịch vụ nào?",
        options: [
          "A. Amazon SQS",
          "B. Amazon SNS",
          "C. Amazon MQ",
          "D. Amazon Kinesis Data Streams"
        ],
        correctIdx: 2,
        explanation: "Amazon SQS dùng API độc quyền của AWS nên sẽ bắt buộc phải sửa code. Amazon MQ cung cấp dịch vụ ActiveMQ/RabbitMQ quản lý sẵn hỗ trợ nguyên bản JMS, AMQP, MQTT, STOMP giúp giữ nguyên 100% code cũ."
      }
    ]
  },

  34: {
    jargon: [
      { term: "ECS EC2 Launch Type vs ECS Fargate", plain: "ECS EC2 = Bạn phải tự đi thuê máy ảo EC2, tự cài bản vá, tự cấu hình Auto Scaling cho máy EC2 rồi mới đặt Container lên. ECS Fargate = Hoàn toàn Serverless! Chỉ cần đưa Docker Image, AWS tự bật Container lên chạy không thấy bóng dáng cái máy chủ EC2 nào!" },
      { term: "ECS Task Role vs Task Execution Role", plain: "Task Execution Role = Quyền của 'Người quản gia ECS Agent' để đi tải Docker Image từ ECR và ghi log vào CloudWatch lúc mới bật container. Task Role = Quyền của chính 'Code ứng dụng Java bên trong Container' để gọi vào S3, DynamoDB, RDS!" },
      { term: "AWS App Runner", plain: "Dịch vụ chạy Web Container đơn giản nhất trên AWS: Chỉ cần trỏ vào kho code GitHub hoặc Docker Image, App Runner tự động build, tự tạo Load Balancer, tự gắn HTTPS và tự Auto Scaling mà không cần biết VPC hay ECS là gì!" }
    ],
    diagram: `
Kiến trúc Chuẩn Serverless Container trên AWS:
[Kho ảnh Docker: Amazon ECR] ──► [Amazon ECS với AWS Fargate (Không cần quản lý EC2!)]
                                        │
        ┌───────────────────────────────┼───────────────────────────────┐
        ▼                               ▼                               ▼
[Chia tải: ALB]        [Gắn quyền riêng: ECS Task Role]       [Ổ đĩa chung: Amazon EFS]`,
    deepSections: [
      {
        title: "1. Khi nào chọn ECS Fargate, ECS on EC2, Amazon EKS và AWS App Runner?",
        content: "• <strong>Amazon ECS với AWS Fargate (Đáp án đúng trong 90% câu hỏi về Container!)</strong>: Chọn ngay khi thấy từ khóa <strong><em>Docker containers + Serverless + No infrastructure/EC2 management + Least operational overhead</em></strong>.<br>• <strong>Amazon ECS với EC2 Launch Type</strong>: Chỉ chọn khi công ty muốn <em>kiểm soát sâu tầng hệ điều hành/card đồ họa GPU đặc biệt</em> hoặc muốn tận dụng các gói <em>EC2 Reserved Instances</em> đã lỡ mua từ trước.<br>• <strong>Amazon EKS (Elastic Kubernetes Service)</strong>: Chọn khi đề bài có chữ <strong><em>Kubernetes, K8s pods, kubectl, hoặc di chuyển cụm Kubernetes từ On-premise/Cloud khác lên AWS để đồng nhất môi trường đa đám mây (Cloud-agnostic)</em></strong>. (EKS cũng hỗ trợ chạy trên Fargate!).<br>• <strong>AWS App Runner</strong>: Chọn khi đề bài hỏi <em>'Đội phát triển chỉ có source code web hoặc container image và muốn triển khai lên AWS nhanh nhất, tự động có sẵn Load Balancing, SSL và Auto Scaling mà không có kinh nghiệm về hạ tầng mạng/ECS'</em>."
      },
      {
        title: "2. Lưu trữ dữ liệu bền vững cho ECS Fargate & Phân quyền ECS Task Role",
        content: "• Mặc định mỗi Task của Fargate chỉ có 20 GB bộ nhớ tạm (Ephemeral storage - tắt container là mất). Nếu đề bài hỏi: <em>'Làm sao để hàng chục Containers chạy trên ECS Fargate ở nhiều AZ khác nhau cùng đọc/ghi chung vào một kho file bền vững?'</em> → Kết hợp <strong>ECS Fargate + Amazon EFS</strong>! (Lưu ý: <strong>Fargate KHÔNG hỗ trợ gắn ổ cứng Amazon EBS thông thường cho việc chia sẻ đa AZ</strong>).<br>• <strong>Phân quyền chuẩn Least Privilege trên ECS</strong>: Nếu trên 1 máy EC2 chạy 5 containers khác nhau mà bạn gắn quyền vào <em>EC2 Instance Profile</em> thì cả 5 containers đều lấy được quyền của nhau. Để mỗi container chỉ có đúng quyền riêng của nó → Phải gắn IAM Role vào <strong>ECS Task Role</strong>!"
      }
    ],
    extraCards: [
      { q: "Phân biệt 'ECS Task Execution Role' và 'ECS Task Role'?", a: "Task Execution Role: Cấp quyền cho hạ tầng ECS kéo Docker image từ ECR và đẩy khởi tạo log lên CloudWatch. Task Role: Cấp quyền IAM riêng cho chính ứng dụng chạy bên trong Container gọi tới S3, DynamoDB, SQS." },
      { q: "Các Containers chạy trên AWS Fargate ở nhiều Availability Zones cần đọc và ghi chung vào một hệ thống file chia sẻ bền vững. Dịch vụ lưu trữ nào tương thích trực tiếp với AWS Fargate cho bài toán này?", a: "Amazon EFS (Elastic File System)." },
      { q: "Khi đề bài yêu cầu di chuyển các ứng dụng đóng gói trong Pods đang quản lý bằng công cụ Kubernetes (kubectl/Helm) từ On-premise lên AWS với ít thay đổi công cụ vận hành nhất, ta chọn dịch vụ nào?", a: "Amazon EKS (Elastic Kubernetes Service)." }
    ],
    quizzes: [
      {
        qEn: "A company wants to migrate a monolithic web application to a microservices architecture using Docker containers. The engineering team is small and wants to avoid managing, patching, or scaling underlying Amazon EC2 instances. The containers also need to share a common POSIX file system across multiple Availability Zones. Which combination of services meets these requirements?",
        qVi: "Công ty muốn chuyển ứng dụng sang kiến trúc microservices dùng Docker containers. Đội kỹ thuật ít người nên không muốn phải quản lý, vá lỗi hay co giãn các máy chủ EC2 bên dưới. Ngoài ra các containers cần dùng chung một hệ thống file POSIX qua nhiều AZ. Kết hợp dịch vụ nào đáp ứng được?",
        options: [
          "A. Amazon ECS with the EC2 launch type + Amazon EBS",
          "B. Amazon ECS with the AWS Fargate launch type + Amazon EFS",
          "C. AWS Lambda + Amazon FSx for Windows File Server",
          "D. Amazon EC2 + Amazon S3 Glacier"
        ],
        correctIdx: 1,
        explanation: "ECS với AWS Fargate giúp chạy Docker containers hoàn toàn Serverless (không cần quản lý EC2), và kết hợp hoàn hảo với Amazon EFS để chia sẻ file chuẩn POSIX qua nhiều AZ."
      },
      {
        qEn: "Five different microservices run as separate ECS tasks on a shared cluster of EC2 instances. Currently, permissions are granted via the EC2 Instance Profile, allowing all containers to access each other's S3 buckets and DynamoDB tables. How can the architect enforce least-privilege access for each individual microservice container?",
        qVi: "Có 5 microservices chạy dưới dạng các ECS tasks khác nhau trên chung một cụm máy chủ EC2. Hiện tại quyền đang được cấp qua EC2 Instance Profile khiến mọi container đều truy cập được vào S3 và DynamoDB của nhau. Làm sao áp dụng nguyên tắc tối thiểu quyền cho từng microservice riêng biệt?",
        options: [
          "A. Embed static IAM access keys inside each Docker container image.",
          "B. Remove application permissions from the EC2 Instance Profile and assign a dedicated IAM role at the 'ECS Task Role' level for each Task Definition.",
          "C. Create 5 separate VPCs.",
          "D. Configure Network ACL rules."
        ],
        correctIdx: 1,
        explanation: "Sử dụng IAM Roles for Tasks (ECS Task Role) trong Task Definition cho phép gán quyền IAM độc lập cho từng Container/Task thay vì dùng chung quyền của máy chủ EC2."
      }
    ]
  },

  35: {
    jargon: [
      { term: "Cold Start (Khởi động lạnh trên Lambda)", plain: "Khi hàm Lambda lâu không có ai gọi, AWS tắt nó đi. Lúc có khách đầu tiên bấm vào, AWS phải mất 1-3 giây tạo môi trường, tải code Java lên rồi mới chạy — độ trễ ở lần đầu tiên đó gọi là Cold Start!" },
      { term: "Reserved Concurrency vs Provisioned Concurrency", plain: "Reserved Concurrency (Miễn phí) = Đặt giới hạn trần tối đa (ví dụ khóa hàm này chỉ được chạy tối đa 100 bản cùng lúc để không làm sập DB phía sau). Provisioned Concurrency (Có phí) = Bật và làm nóng sẵn 50 hàm Lambda trực chờ 24/24 để diệt tận gốc hiện tượng Cold Start!" },
      { term: "AWS Batch", plain: "Dịch vụ chạy các tác vụ xử lý lô (Batch jobs) nặng hàng giờ đồng hồ dưới dạng Docker Containers trên EC2/Fargate — chuyên dùng để thay thế khi tác vụ vượt quá giới hạn 15 phút của AWS Lambda!" }
    ],
    diagram: `
Hàm AWS Lambda (Max 15 phút, Max 10GB RAM, Max 10GB /tmp)
 ├── Muốn gọi vào RDS trong Private Subnet? ──► Gắn Lambda vào VPC (Tự tạo ENI trong Private Subnet)
 │     └── Nhưng gắn vào Private Subnet xong lại muốn gọi thêm API ngoài Internet? ──► Bắt buộc phải đi qua [NAT Gateway] ở Public Subnet!
 └── Tác vụ chạy mất 30 phút (Vượt trần 15p của Lambda)? ──► Chuyển ngay sang dùng [AWS Batch] hoặc [ECS Fargate]!`,
    deepSections: [
      {
        title: "1. Mọi con số giới hạn và cơ chế Concurrency của AWS Lambda",
        content: "• <strong>Giới hạn sống còn</strong>: Thời gian chạy tối đa <strong>15 phút (900 giây)</strong>; RAM tối đa <strong>10 GB</strong> (muốn tăng CPU hay mạng cho Lambda thì phải <strong>tăng RAM</strong>!); bộ nhớ tạm <code>/tmp</code> tối đa <strong>10 GB</strong> (nếu cần lưu file lớn hơn 10 GB hoặc chia sẻ file giữa các lần chạy thì mount <strong>Amazon EFS</strong> vào Lambda).<br>• <strong>Reserved Concurrency</strong>: Giữ chỗ và khóa trần số lượng bản chạy song song của 1 hàm (nếu đặt bằng <code>0</code> nghĩa là tắt khẩn cấp hàm Lambda đó không cho chạy nữa - <em>Throttle switch</em>).<br>• <strong>Provisioned Concurrency</strong>: Khởi tạo và giữ nóng sẵn một số lượng môi trường chạy → Chọn khi đề bài yêu cầu <strong><em>'Eliminate Lambda cold starts / Guarantee consistent sub-second response times for latency-sensitive applications'</em></strong> (Với ngôn ngữ Java có thể bật thêm <strong>Lambda SnapStart</strong> miễn phí!)."
      },
      {
        title: "2. Bẫy kết nối mạng khi đưa AWS Lambda vào VPC & So sánh với AWS Batch",
        content: "• Mặc định hàm Lambda chạy ở ngoài VPC của bạn nên nó tự do gọi ra Internet và gọi S3/DynamoDB, nhưng không gọi được vào RDS nằm trong Private Subnet.<br>• Khi bạn cấu hình <strong>kết nối Lambda vào Private Subnet của VPC</strong> để gọi RDS, hàm Lambda đó sẽ <strong>MẤT KHẢ NĂNG ĐI RA INTERNET</strong>! Nếu hàm Lambda đó vừa cần gọi RDS nội bộ, vừa cần gọi API thanh toán bên ngoài Internet (hoặc gọi dịch vụ AWS không có VPC Endpoint) → Bạn <strong>BẮT BUỘC phải đặt một NAT Gateway ở Public Subnet</strong> và trỏ Route Table của Private Subnet về NAT Gateway đó!<br>• <strong>Khi nào chọn AWS Batch thay vì Lambda?</strong> Khi công ty cần chạy các tác vụ tính toán hàng loạt (Batch computing jobs) dưới dạng Docker images hoặc scripts kéo dài <strong>hàng giờ đồng hồ (> 15 phút)</strong>, cần tự động xếp hàng đợi công việc và tự động bật tắt dàn máy <strong>EC2 Spot Instances / Fargate</strong> để tiết kiệm chi phí."
      }
    ],
    extraCards: [
      { q: "Một hàm AWS Lambda đã được cấu hình nằm trong Private Subnet để kết nối tới cơ sở dữ liệu RDS. Nay hàm Lambda đó cần gọi thêm một REST API của bên thứ 3 ngoài Internet nhưng bị lỗi Timeout. Cách khắc phục là gì?", a: "Tạo một NAT Gateway ở Public Subnet và cập nhật Route Table của Private Subnet (nơi đặt Lambda) định tuyến 0.0.0.0/0 qua NAT Gateway đó." },
      { q: "Phân biệt 'Lambda Reserved Concurrency' và 'Lambda Provisioned Concurrency'?", a: "Reserved Concurrency: Đặt trần số lượng chạy song song tối đa cho 1 hàm (để bảo vệ DB phía sau hoặc giữ chỗ, miễn phí). Provisioned Concurrency: Khởi tạo và làm nóng sẵn môi trường chạy để loại bỏ hoàn toàn độ trễ Cold Start (có tính phí)." },
      { q: "Khi một tác vụ xử lý dữ liệu hàng đêm mất khoảng 45 phút để hoàn thành, tại sao không thể dùng AWS Lambda và nên thay bằng dịch vụ Serverless/Managed nào?", a: "Không dùng được Lambda vì Lambda có giới hạn cứng thời gian chạy tối đa là 15 phút. Nên thay bằng AWS Batch (chạy trên Fargate/Spot) hoặc ECS Fargate Task." }
    ],
    quizzes: [
      {
        qEn: "A financial application uses AWS Lambda functions behind Amazon API Gateway. Users report that the first request after a period of inactivity takes 4 seconds to respond due to function initialization (cold start), while subsequent requests take only 50 ms. How can the solutions architect ensure consistent low latency for all requests?",
        qVi: "Ứng dụng tài chính dùng AWS Lambda sau API Gateway. Người dùng báo cáo rằng request đầu tiên sau một khoảng thời gian vắng khách bị mất tới 4 giây để phản hồi do khởi tạo hàm (Cold Start), trong khi các request sau chỉ mất 50 ms. Làm sao đảm bảo độ trễ thấp đồng nhất cho mọi request?",
        options: [
          "A. Increase the Lambda function timeout to 15 minutes.",
          "B. Enable Lambda Provisioned Concurrency (or Lambda SnapStart for Java runtimes).",
          "C. Place the Lambda function inside a Private Subnet.",
          "D. Reduce the Lambda function memory allocation to 128 MB."
        ],
        correctIdx: 1,
        explanation: "Provisioned Concurrency khởi tạo và giữ nóng sẵn số lượng môi trường thực thi được chỉ định, giúp loại bỏ hoàn toàn hiện tượng Cold Start."
      },
      {
        qEn: "A developer configured an AWS Lambda function to connect to a private Amazon RDS instance inside a VPC Private Subnet. After this change, the Lambda function can successfully query RDS, but it can no longer reach an external third-party payment gateway API over the internet. How should the architect fix this?",
        qVi: "Lập trình viên cấu hình hàm Lambda kết nối vào RDS trong Private Subnet của VPC. Sau khi cấu hình xong, Lambda gọi được RDS nhưng lại mất khả năng gọi ra cổng thanh toán bên thứ 3 ngoài Internet. Sửa bằng cách nào?",
        options: [
          "A. Attach an Elastic IP address directly to the AWS Lambda function.",
          "B. Deploy a NAT Gateway in a Public Subnet and update the Private Subnet's route table to route 0.0.0.0/0 traffic to the NAT Gateway.",
          "C. Open port 443 in the Network ACL.",
          "D. Create a Gateway VPC Endpoint for Amazon S3."
        ],
        correctIdx: 1,
        explanation: "Hàm Lambda gắn vào VPC không bao giờ có Public IP trực tiếp. Để một hàm Lambda trong Private Subnet đi ra được Internet, luồng mạng của Private Subnet bắt buộc phải đi qua một NAT Gateway đặt tại Public Subnet."
      }
    ]
  },

  36: {
    jargon: [
      { term: "WebSocket API (API Gateway)", plain: "Đường ống nối thông 2 chiều liên tục giữa trình duyệt/app và server (khác với HTTP thường là hỏi 1 câu đáp 1 câu rồi ngắt) — chuyên dùng cho ứng dụng Chat thời gian thực, bảng giá chứng khoán nhảy liên tục, thông báo game!" },
      { term: "Step Functions (Serverless Orchestration)", plain: "Người nhạc trưởng chỉ huy dàn hàm Lambda: Vẽ sơ đồ Bước 1 gọi hàm Kiểm tra kho -> Nếu còn hàng thì rẽ sang Bước 2 gọi hàm Trừ tiền -> Nếu lỗi mạng thì tự động thử lại 3 lần -> Chờ sếp bấm nút Duyệt rồi mới sang Bước 3!" },
      { term: "Cognito User Pools vs Identity Pools", plain: "User Pools = Cuốn sổ quản lý tài khoản Đăng ký / Đăng nhập của khách hàng (trả về chuỗi JWT Token để gọi API Gateway). Identity Pools = Quầy đổi vé: Đổi cái JWT Token đó lấy một bộ chìa khóa IAM tạm thời để app điện thoại của khách tự upload ảnh thẳng lên S3!" }
    ],
    diagram: `
Kiến trúc Chuẩn Ứng Dụng Serverless Hiện Đại:
[Người dùng Mobile/Web] ──(1. Đăng nhập lấy JWT)──► [Cognito User Pool]
         │
         ├──(2. Gọi REST/WebSocket kèm JWT)───────► [Amazon API Gateway (Bật Caching + Throttling)] ──► [AWS Step Functions] ──► Chuỗi hàm [AWS Lambda]
         └──(3. Đổi JWT lấy quyền AWS tạm thời)───► [Cognito Identity Pool (STS)] ────────────────────► Upload ảnh thẳng lên [Amazon S3]!`,
    deepSections: [
      {
        title: "1. Amazon API Gateway: Các tính năng cốt lõi hay hỏi trong đề thi",
        content: "• <strong>Hỗ trợ WebSocket API</strong>: Khi đề bài yêu cầu <em>'Two-way real-time communication (Chat app, live dashboard, multiplayer notifications) + Serverless'</em> → Chọn ngay <strong>Amazon API Gateway (WebSocket API)</strong>.<br>• <strong>API Gateway Caching</strong>: Lưu bộ nhớ đệm kết quả trả về của API (TTL mặc định 300s, tối đa 3600s) để không phải gọi lặp lại vào hàm Lambda hay backend phía sau.<br>• <strong>Throttling (Giới hạn tốc độ gọi)</strong>: Mặc định giới hạn 10,000 requests/giây trên toàn tài khoản (Burst 5,000). Có thể kết hợp <strong>Usage Plans + API Keys</strong> để bán gói API cho đối tác (ví dụ: Gói Free chỉ được gọi 100 lần/ngày, gói VIP được gọi 50,000 lần/ngày).<br>• <strong>3 loại Endpoint</strong>: <code>Edge-Optimized</code> (mặc định, đi qua mạng lưới CloudFront cho khách hàng toàn cầu), <code>Regional</code> (cho khách hàng nằm chung 1 Region), và <code>Private</code> (chỉ truy cập được từ bên trong VPC thông qua Interface VPC Endpoint)."
      },
      {
        title: "2. AWS Step Functions & Amazon Cognito (User Pools vs Identity Pools)",
        content: "• <strong>AWS Step Functions</strong>: Tuyệt đối <strong>KHÔNG BAO GIỜ</strong> viết code trong hàm Lambda A để gọi trực tiếp hàm Lambda B rồi ngồi chờ (vì sẽ bị tính tiền gấp đôi và rất khó xử lý khi hàm B bị lỗi!). Thay vào đó, luôn dùng <strong>AWS Step Functions</strong> để điều phối quy trình nhiều bước, hỗ trợ <em>Retry, Catch error, Parallel execution, Wait state</em> và <strong>chờ con người phê duyệt (Human approval task token) lên tới tối đa 1 năm</strong>.<br>• <strong>Phân biệt Cognito User Pools vs Identity Pools (Cực kỳ hay ra thi!)</strong>:<br>  - <strong>Cognito User Pools</strong>: Cơ sở dữ liệu người dùng Serverless lo việc <strong>Authentication (Đăng ký, Đăng nhập, Quên mật khẩu, MFA, đăng nhập qua Google/Facebook/SAML)</strong>. Tích hợp sẵn làm Authorizer cho <strong>API Gateway</strong> và <strong>ALB</strong>.<br>  - <strong>Cognito Identity Pools (Federated Identities)</strong>: Lo việc <strong>Authorization (Cấp quyền truy cập trực tiếp tài nguyên AWS)</strong>. Nó đổi token đăng nhập (từ User Pool hoặc Facebook/Google) thông qua AWS STS thành <strong>Temporary AWS Credentials</strong> để ứng dụng Mobile/Web gọi thẳng vào S3 hoặc DynamoDB!"
      }
    ],
    extraCards: [
      { q: "Làm thế nào để thương mại hóa một bộ REST API trên Amazon API Gateway nhằm giới hạn số lượt gọi mỗi giây (Rate limit) và tổng số lượt gọi mỗi tháng (Quota) riêng biệt cho từng khách hàng đối tác?", a: "Tạo Usage Plans và cấp phát API Keys riêng cho từng khách hàng trên Amazon API Gateway." },
      { q: "Một ứng dụng di động cho phép người dùng đăng nhập bằng tài khoản Google/Facebook, sau đó ứng dụng cần quyền tải trực tiếp ảnh đại diện của người dùng đó lên một thư mục riêng trong S3 Bucket mà không đi qua backend server. Cần dùng tính năng nào của Amazon Cognito?", a: "Amazon Cognito Identity Pools (Federated Identities) để đổi token đăng nhập lấy Temporary IAM Credentials." },
      { q: "Tại sao trong kiến trúc Serverless không nên để hàm Lambda A gọi trực tiếp hàm Lambda B nối tiếp nhau cho một quy trình đặt hàng mà phải dùng AWS Step Functions?", a: "Vì gọi lồng nhau làm tốn tiền chờ đợi kép và khó kiểm soát lỗi. Dùng AWS Step Functions giúp tách biệt từng bước, tự động Retry khi lỗi, rẽ nhánh và hỗ trợ quy trình kéo dài tới 1 năm." }
    ],
    quizzes: [
      {
        qEn: "A company is building a serverless order fulfillment workflow that involves inventory verification, payment processing, fraud checking, and shipping label generation. If the payment step fails due to a transient error, it must automatically retry 3 times with exponential backoff, and high-value orders must pause and wait up to 7 days for manual manager approval via an email link. Which service should orchestrate this workflow?",
        qVi: "Công ty xây dựng quy trình xử lý đơn hàng Serverless gồm kiểm tra kho, thanh toán, kiểm tra gian lận và tạo mã vận đơn. Nếu bước thanh toán lỗi tạm thời phải tự động thử lại 3 lần, và các đơn giá trị lớn phải tạm dừng chờ tối đa 7 ngày để quản lý bấm nút phê duyệt qua email. Dịch vụ nào nên điều phối quy trình này?",
        options: [
          "A. Amazon SQS Standard Queue",
          "B. AWS Step Functions",
          "C. Daisy-chaining AWS Lambda functions directly inside application code",
          "D. Amazon EventBridge"
        ],
        correctIdx: 1,
        explanation: "AWS Step Functions là dịch vụ điều phối Serverless hỗ trợ sẵn Retry/Catch lỗi, rẽ nhánh điều kiện và cơ chế Callback (Task Token) chờ con người phê duyệt kéo dài tới tối đa 1 năm."
      },
      {
        qEn: "A mobile game allows players to sign in using their existing social media accounts (Google, Apple, Facebook) or a custom username/password. Once signed in, the mobile app needs temporary, limited-privilege AWS credentials to save the player's game progress directly to an Amazon DynamoDB table. Which combination of services meets these requirements?",
        qVi: "Game di động cho phép người chơi đăng nhập bằng mạng xã hội (Google, Apple, Facebook) hoặc tài khoản riêng. Sau khi đăng nhập xong, ứng dụng di động cần được cấp thông tin xác thực AWS tạm thời để lưu tiến độ chơi trực tiếp vào bảng DynamoDB. Kết hợp nào đáp ứng được?",
        options: [
          "A. Create an individual IAM user for each mobile player.",
          "B. Use Amazon Cognito User Pools (for authentication) combined with Amazon Cognito Identity Pools (to vend temporary IAM credentials for DynamoDB access).",
          "C. Use AWS IAM Identity Center (AWS SSO).",
          "D. Embed hardcoded AWS access keys inside the mobile application binary."
        ],
        correctIdx: 1,
        explanation: "Cognito User Pools xử lý việc đăng nhập người dùng (bao gồm liên kết Google/Facebook), sau đó Cognito Identity Pools đổi token đó lấy Temporary AWS Credentials (qua STS) để ứng dụng gọi trực tiếp vào DynamoDB an toàn."
      }
    ]
  },

  37: {
    jargon: [
      { term: "CIDR Block (Ví dụ: 10.0.0.0/16)", plain: "Cách viết gọn để chỉ định một dải địa chỉ IP. Số đứng sau dấu gạch chéo (ví dụ /16 hay /24) càng NHỎ thì số lượng địa chỉ IP bên trong càng NHIỀU! Công thức tính: Tổng số IP = 2 mũ (32 - số sau dấu gạch chéo)." },
      { term: "5 Reserved IPs (5 địa chỉ IP bị AWS tịch thu)", plain: "Trong bất kỳ Subnet nào bạn tạo ra, AWS luôn lấy mất 5 địa chỉ IP (4 số đầu và 1 số cuối) để làm đường ống kỹ thuật (Network, Router, DNS, Dự phòng, Broadcast) — bạn không thể gán 5 IP này cho máy EC2!" },
      { term: "Overlapping CIDR (Trùng lặp dải IP)", plain: "Cơn ác mộng khi 2 VPC cùng đặt dải mạng là 10.0.0.0/16 giống hệt nhau -> Sẽ không thể nối VPC Peering trực tiếp với nhau được!" }
    ],
    diagram: `
Bảng Nhớ Nhanh Kích Thước CIDR & Số IP Thực Tế Dùng Được Cho EC2:
 • /28 (Nhỏ nhất!) ──► 2^(32-28) = 2^4  = 16 IP     ──► Trừ 5 IP của AWS = Còn 11 IP dùng được!
 • /27             ──► 2^(32-27) = 2^5  = 32 IP     ──► Trừ 5 IP của AWS = Còn 27 IP dùng được!
 • /26             ──► 2^(32-26) = 2^6  = 64 IP     ──► Trừ 5 IP của AWS = Còn 59 IP dùng được!
 • /25             ──► 2^(32-25) = 2^7  = 128 IP    ──► Trừ 5 IP của AWS = Còn 123 IP dùng được!
 • /24 (Phổ biến!) ──► 2^(32-24) = 2^8  = 256 IP    ──► Trừ 5 IP của AWS = Còn 251 IP dùng được!
 • /16 (Lớn nhất!) ──► 2^(32-16) = 2^16 = 65,536 IP`,
    deepSections: [
      {
        title: "1. Quy tắc chia dải mạng VPC và Subnet mà mọi bài thi SAA-C03 đều kiểm tra",
        content: "• Một VPC có kích thước CIDR nhỏ nhất là <strong><code>/28</code> (16 IP)</strong> và lớn nhất là <strong><code>/16</code> (65,536 IP)</strong>. Một VPC có thể gắn tối đa 5 dải IPv4 CIDR (nếu dải đầu bị hết IP, bạn có thể <strong>thêm một Secondary CIDR block</strong> vào VPC mà không cần xóa VPC tạo lại!).<br>• <strong>Mỗi Subnet luôn nằm gọn trong 1 Availability Zone (1 Subnet = 1 AZ)</strong>. Để hệ thống đạt chuẩn High Availability trên 2 AZ và có cả tầng Public lẫn tầng Private, bạn cần tối thiểu <strong>4 Subnets</strong> (2 Public Subnets + 2 Private Subnets)."
      },
      {
        title: "2. Giải phẫu 5 địa chỉ IP bị AWS giữ lại trong mỗi Subnet (Ví dụ với Subnet 10.0.0.0/24)",
        content: "1. <code>10.0.0.0</code>: Địa chỉ mạng gốc (Network address).<br>2. <code>10.0.0.1</code>: AWS dành cho <strong>VPC Router</strong>.<br>3. <code>10.0.0.2</code>: AWS dành cho <strong>Amazon DNS Server</strong>.<br>4. <code>10.0.0.3</code>: AWS giữ dự phòng cho tương lai.<br>5. <code>10.0.0.255</code>: Địa chỉ phát quảng bá (Network Broadcast address - dù VPC không hỗ trợ broadcast nhưng vẫn khóa IP này)."
      }
    ],
    extraCards: [
      { q: "Kích thước CIDR block nhỏ nhất và lớn nhất được phép khi khởi tạo một Amazon VPC hoặc Subnet là bao nhiêu?", a: "Nhỏ nhất là /28 (16 địa chỉ IP) và lớn nhất là /16 (65,536 địa chỉ IP)." },
      { q: "Một VPC ban đầu được tạo với dải mạng 10.0.0.0/24 (256 IP) và hiện đã cạn kiệt địa chỉ IP trống để tạo thêm máy chủ mới. Làm thế nào để mở rộng số lượng IP cho VPC này mà không phải tạo VPC mới?", a: "Gắn thêm một dải địa chỉ phụ (Secondary IPv4 CIDR block) vào VPC hiện tại, sau đó tạo các Subnets mới từ dải CIDR phụ đó." },
      { q: "Công ty cần triển khai 55 máy chủ EC2 vào trong một Subnet mới và muốn chọn kích thước CIDR nhỏ nhất có thể để tiết kiệm không gian địa chỉ IP. Phải chọn CIDR nào (/26 hay /27)?", a: "Phải chọn /26 (có 64 IP - 5 IP AWS giữ = 59 IP khả dụng, đủ cho 55 máy). Không chọn được /27 vì chỉ có 32 - 5 = 27 IP." }
    ],
    quizzes: [
      {
        qEn: "A network engineer needs to create a new VPC subnet that must accommodate at least 28 Amazon EC2 instances. To conserve IPv4 address space in the company's network, the engineer must select the smallest possible CIDR block size for this subnet. Which CIDR block size should be chosen?",
        qVi: "Kỹ sư mạng cần tạo một VPC Subnet mới phải chứa được tối thiểu 28 máy chủ EC2. Để tiết kiệm không gian địa chỉ IPv4, kỹ sư phải chọn kích thước CIDR nhỏ nhất có thể. Nên chọn kích thước CIDR nào?",
        options: [
          "A. /28",
          "B. /27",
          "C. /26",
          "D. /25"
        ],
        correctIdx: 2,
        explanation: "Dải /27 có 2^5 = 32 địa chỉ IP, nhưng sau khi trừ đi 5 địa chỉ IP do AWS giữ lại thì chỉ còn 32 - 5 = 27 IP khả dụng (thiếu 1 IP so với yêu cầu 28 máy!). Do đó bắt buộc phải chọn dải /26 (64 - 5 = 59 IP khả dụng)."
      },
      {
        qEn: "A company's production VPC was originally created with a /24 CIDR block and has now run out of available IP addresses for new microservices. How can the solutions architect add more IP addresses to this VPC with minimal disruption?",
        qVi: "VPC Production của công ty ban đầu tạo với dải /24 nay đã hết sạch địa chỉ IP trống cho các microservices mới. Làm thế nào để bổ sung thêm địa chỉ IP vào VPC này ít gây gián đoạn nhất?",
        options: [
          "A. Directly modify the existing primary CIDR block from /24 to /16.",
          "B. Associate a Secondary IPv4 CIDR block with the existing VPC and create new subnets within the new CIDR range.",
          "C. Delete the entire VPC and recreate it with a larger CIDR block.",
          "D. Use a NAT Gateway to multiply internal IP addresses."
        ],
        correctIdx: 1,
        explanation: "AWS không cho phép sửa trực tiếp kích thước của Primary CIDR block đang tồn tại, nhưng cho phép gắn thêm tối đa 4 Secondary IPv4 CIDR blocks vào VPC để mở rộng không gian địa chỉ ngay lập tức."
      }
    ]
  },

  38: {
    jargon: [
      { term: "Internet Gateway (IGW)", plain: "Cánh cổng biên giới nối khu đất VPC của bạn thông ra mạng Internet toàn cầu. Cổng này do AWS quản lý hoàn toàn, tự động co giãn và chịu lỗi sẵn." },
      { term: "Route Table (Bảng chỉ đường)", plain: "Cuốn sổ hướng dẫn giao thông gắn cho từng Subnet: Ghi rõ 'Nếu gói tin muốn đi trong nội bộ công ty (10.0.0.0/16) thì đi đường Local; nếu muốn đi ra thế giới bên ngoài (0.0.0.0/0) thì đi ra cổng Internet Gateway'." },
      { term: "Bastion Host (Jump Box) vs SSM Session Manager", plain: "Bastion Host (Cách cũ) = Thuê 1 máy EC2 đặt ở ngoài cổng Public Subnet để lập trình viên SSH bắc cầu nhảy vào máy bên trong (tốn tiền, nguy cơ lộ cổng 22). SSM Session Manager (Cách mới chuẩn thi) = Bấm nút mở màn hình dòng lệnh vào thẳng máy trong Private Subnet qua trình duyệt mà không cần mở cổng 22 hay quản lý khóa SSH!" }
    ],
    diagram: `
So sánh Cách Truy Cập Quản Trị Vào Máy EC2 Trong Private Subnet:
 ❌ Cách cũ (Bastion Host): [Admin] ──(SSH Port 22)──► [Bastion EC2 ở Public Subnet] ──(SSH Port 22)──► [EC2 ở Private Subnet] (Tốn tiền + Rủi ro lộ SSH key!)
 ✅ Cách chuẩn SAA-C03    : [Admin] ──(IAM Auth)────► [AWS Systems Manager (SSM) Session Manager] ───► [EC2 ở Private Subnet] (Không mở cổng 22, Không cần SSH key, Lưu log lệnh vào S3/CloudWatch!)`,
    deepSections: [
      {
        title: "1. Ba điều kiện đủ để một máy chủ EC2 kết nối trực tiếp hai chiều với Internet",
        content: "Trong đề thi rất hay có câu hỏi bắt lỗi: <em>'Tại sao máy EC2 vừa tạo không vào được Internet và từ ngoài không gọi vào được?'</em>. Hãy kiểm tra đủ 3 điều kiện sau:<br>1. VPC phải được gắn một <strong>Internet Gateway (IGW)</strong>.<br>2. <strong>Route Table</strong> của Subnet chứa máy EC2 đó phải có dòng định tuyến <strong><code>0.0.0.0/0</code> trỏ tới <code>igw-xxxx</code></strong> (đây chính là định nghĩa của <em>Public Subnet</em>).<br>3. Bản thân máy EC2 đó phải được cấp một <strong>Public IPv4 (hoặc Elastic IP)</strong>, và <strong>Security Group + NACL</strong> phải cho phép cổng tương ứng."
      },
      {
        title: "2. Tại sao AWS Systems Manager (SSM) Session Manager luôn thắng Bastion Host trong đề thi?",
        content: "Khi đề bài hỏi: <em>'Làm thế nào để quản trị viên truy cập dòng lệnh (Shell/SSH/RDP) vào các máy chủ EC2 nằm trong Private Subnet một cách bảo mật nhất, chi phí thấp nhất và ghi lại nhật ký toàn bộ các câu lệnh đã gõ để phục vụ kiểm toán?'</em><br>👉 <strong>Chọn ngay: AWS Systems Manager (SSM) Session Manager!</strong><br>Để SSM Session Manager hoạt động được trên máy EC2 trong Private Subnet, chỉ cần 3 thứ:<br>1. Cài <strong>SSM Agent</strong> (đã được cài sẵn mặc định trên Amazon Linux 2 / 2023 và Ubuntu/Windows AMI của AWS).<br>2. Gắn <strong>IAM Role</strong> có quyền <code>AmazonSSMManagedInstanceCore</code> vào máy EC2.<br>3. Máy EC2 có đường kết nối HTTPS (cổng 443) tới dịch vụ SSM (thông qua NAT Gateway hoặc <strong>Interface VPC Endpoints cho SSM</strong> nếu Subnet bị cô lập hoàn toàn với Internet!)."
      }
    ],
    extraCards: [
      { q: "Để sử dụng AWS Systems Manager (SSM) Session Manager truy cập vào một máy EC2 nằm trong một Private Subnet bị cô lập hoàn toàn (không có cả Internet Gateway lẫn NAT Gateway), ta cần cấu hình gì?", a: "Gắn IAM Role 'AmazonSSMManagedInstanceCore' cho EC2 và tạo các Interface VPC Endpoints (AWS PrivateLink) cho dịch vụ Systems Manager (ssm, ec2messages, ssmmessages) trong VPC." },
      { q: "Một VPC có thể gắn đồng thời tối đa bao nhiêu Internet Gateways (IGW)?", a: "Chỉ tối đa 1 Internet Gateway trên mỗi VPC." }
    ],
    quizzes: [
      {
        qEn: "A company's security policy prohibits opening inbound SSH (port 22) or RDP (port 3389) ports on any EC2 instances and forbids the use of SSH key pairs or Bastion hosts. However, system administrators still need interactive shell access to troubleshoot EC2 instances in private subnets, and all commands executed during sessions must be logged to Amazon S3 for auditing. Which solution meets these requirements?",
        qVi: "Chính sách bảo mật của công ty cấm mở cổng Inbound SSH (22) hay RDP (3389) trên mọi máy EC2, đồng thời cấm dùng SSH key hay Bastion host. Tuy nhiên quản trị viên vẫn cần truy cập dòng lệnh vào các máy EC2 trong Private Subnet và mọi câu lệnh gõ vào phải được lưu log lên S3. Giải pháp nào đáp ứng được?",
        options: [
          "A. Use EC2 Instance Connect over port 22.",
          "B. Use AWS Systems Manager (SSM) Session Manager with an appropriate IAM role and enable session logging to Amazon S3.",
          "C. Deploy a Network Load Balancer in a public subnet forwarding port 22.",
          "D. Use AWS Direct Connect."
        ],
        correctIdx: 1,
        explanation: "SSM Session Manager cho phép truy cập shell vào EC2 mà không cần mở bất kỳ cổng Inbound nào, không cần quản lý SSH keys hay Bastion host, phân quyền bằng IAM và hỗ trợ ghi log mọi câu lệnh lên S3/CloudWatch."
      },
      {
        qEn: "An engineer launched an EC2 instance with a public IP address in a new subnet and allowed inbound HTTP traffic in the security group. An Internet Gateway is attached to the VPC, but users on the internet still cannot reach the web server. What is the MOST likely missing configuration?",
        qVi: "Kỹ sư đã bật máy EC2 có Public IP trong một Subnet mới, đã mở cổng HTTP trong Security Group, và VPC đã gắn Internet Gateway, nhưng người dùng ngoài Internet vẫn không truy cập được. Cấu hình nào có khả năng bị thiếu cao nhất?",
        options: [
          "A. Sticky Sessions are not enabled.",
          "B. The Route Table associated with the subnet does not have a 0.0.0.0/0 route pointing to the Internet Gateway.",
          "C. A NAT Gateway has not been created.",
          "D. VPC Flow Logs are disabled."
        ],
        correctIdx: 1,
        explanation: "Việc gắn Internet Gateway vào VPC là chưa đủ; Route Table của Subnet chứa máy EC2 đó bắt buộc phải có route 0.0.0.0/0 trỏ về Internet Gateway thì Subnet đó mới thực sự thông ra Internet."
      }
    ]
  },

  39: {
    jargon: [
      { term: "SNAT (Source Network Address Translation)", plain: "Đổi địa chỉ người gửi: Khi máy EC2 trong phòng kín (IP nội bộ 10.0.1.5) gửi thư ra Internet, NAT Gateway đứng ở cửa trước sẽ xóa địa chỉ 10.0.1.5 đi và thay bằng địa chỉ Elastic IP công cộng của NAT Gateway để người ngoài biết đường gửi thư trả lại!" },
      { term: "Public NAT Gateway vs Private NAT Gateway", plain: "Public NAT Gateway (Có gắn Elastic IP) = Giúp máy trong Private Subnet đi ra ngoài Internet. Private NAT Gateway (Không có Elastic IP) = Giúp dịch địa chỉ IP nội bộ khi nối sang mạng công ty khác hoặc VPC khác mà không cần Internet Gateway!" },
      { term: "Source / Destination Check (Trên NAT Instance)", plain: "Mặc định mọi máy EC2 chỉ nhận gói tin gửi cho chính mình. Nếu tự dựng máy EC2 làm NAT Instance (kiểu cũ) thì phải TẮT tính năng Source/Destination Check này đi để nó nhận chuyển tiếp gói tin hộ máy khác." }
    ],
    diagram: `
Sơ đồ Chuẩn Multi-AZ NAT Gateway (Tuyệt đối không đặt nhầm vị trí!):
 ┌─────────────────────── Availability Zone A ───────────────────────┐
 │ [Private Subnet A: Máy chủ Java / RDS]                            │
 │    └── Route Table Private A: 0.0.0.0/0 ──► Trỏ sang [NAT-GW-A]   │
 │                                                         │         │
 │ [Public Subnet A : Đặt NAT-GW-A (Gắn Elastic IP)] ◄─────┘         │
 │    └── Route Table Public A : 0.0.0.0/0 ──► Trỏ ra [Internet GW]  │
 └───────────────────────────────────────────────────────────────────┘`,
    deepSections: [
      {
        title: "1. Quy tắc đặt NAT Gateway và Thiết kế High Availability (Multi-AZ)",
        content: "• <strong>Vị trí đặt bắt buộc</strong>: Public NAT Gateway <strong>LUÔN LUÔN phải được tạo ở trong PUBLIC SUBNET</strong> (vì bản thân NAT Gateway cần có đường đi qua Internet Gateway để ra ngoài thế giới!). Sau đó, bảng Route Table của <strong>PRIVATE SUBNET</strong> sẽ trỏ <code>0.0.0.0/0</code> về mã của NAT Gateway đó.<br>• <strong>High Availability (Chịu lỗi cấp độ AZ)</strong>: Một NAT Gateway chỉ sống trong 1 AZ. Nếu bạn có 3 Private Subnets ở 3 AZ mà chỉ tạo 1 NAT Gateway duy nhất ở AZ-a để dùng chung: Khi AZ-a bị sập, các máy ở AZ-b và AZ-c cũng mất đường ra Internet theo! Do đó, để đạt chuẩn HA, phải tạo <strong>1 NAT Gateway riêng tại Public Subnet của từng AZ</strong> và trỏ Route Table của Private Subnet thuộc AZ nào về đúng NAT Gateway của AZ đó."
      },
      {
        title: "2. Tại sao luôn chọn NAT Gateway thay vì NAT Instance?",
        content: "• <strong>NAT Gateway</strong>: Được AWS quản lý hoàn toàn (Managed service), tự động co giãn băng thông từ <strong>5 Gbps lên tới 100 Gbps</strong>, không cần vá lỗi hệ điều hành, không cần tắt Source/Destination check, không cần gắn Security Group.<br>• <strong>NAT Instance</strong>: Là một máy chủ EC2 tự cài đặt đã lỗi thời (tốn công quản trị, băng thông bị giới hạn theo loại máy EC2, phải tự viết script failover)."
      }
    ],
    extraCards: [
      { q: "Một hệ thống triển khai trên 2 Availability Zones (AZ-a và AZ-b) nhưng chỉ đặt duy nhất 1 NAT Gateway ở Public Subnet của AZ-a. Điều gì xảy ra với kết nối ra Internet của các máy chủ trong Private Subnet ở AZ-b nếu AZ-a gặp sự cố mất điện?", a: "Các máy chủ trong Private Subnet ở AZ-b cũng sẽ mất hoàn toàn kết nối ra Internet. Để đạt chuẩn High Availability, phải đặt mỗi AZ một NAT Gateway riêng." },
      { q: "Nếu trong một hệ thống cũ bắt buộc phải sử dụng một máy chủ EC2 làm NAT Instance thay vì NAT Gateway, thiết lập mạng bắt buộc nào trên máy EC2 NAT Instance đó phải được TẮT (Disable)?", a: "Phải tắt kiểm tra Nguồn/Đích (Disable Source/Destination Check) trên card mạng của NAT Instance." }
    ],
    quizzes: [
      {
        qEn: "A solutions architect deployed an application on EC2 instances inside a Private Subnet (`10.0.2.0/24`). The instances need to download software patches from the internet, so the architect created a NAT Gateway inside the same Private Subnet (`10.0.2.0/24`) and updated the route table. However, the instances still cannot reach the internet. Why?",
        qVi: "Kiến trúc sư triển khai ứng dụng trên EC2 trong Private Subnet (`10.0.2.0/24`). Để các máy tải bản vá từ Internet, kiến trúc sư tạo một NAT Gateway nằm ngay bên trong Private Subnet (`10.0.2.0/24`) đó và cập nhật Route Table, nhưng các máy vẫn không ra được Internet. Tại sao?",
        options: [
          "A. Port 22 is not open on the NAT Gateway.",
          "B. A Public NAT Gateway must be deployed inside a Public Subnet (which has a route to an Internet Gateway) and cannot function when placed inside a Private Subnet.",
          "C. NAT Gateways only support IPv6 traffic.",
          "D. Source/Destination Check was not disabled on the NAT Gateway."
        ],
        correctIdx: 1,
        explanation: "Đây là bẫy kinh điển nhất phần VPC: NAT Gateway phục vụ cho Private Subnet, nhưng bản thân cái NAT Gateway đó BẮT BUỘC phải được đặt bên trong một Public Subnet có đường đi ra Internet Gateway."
      },
      {
        qEn: "A company currently uses a single t3.micro EC2 NAT Instance in AZ-a to provide outbound internet access for private subnets across three Availability Zones. During peak hours, outbound traffic is throttled due to network bandwidth limits on the NAT Instance, and it represents a single point of failure. How should the architect redesign this for high availability and high bandwidth with minimal operational overhead?",
        qVi: "Công ty đang dùng 1 máy EC2 t3.micro làm NAT Instance ở AZ-a cho các Private Subnets ở 3 AZ. Giờ cao điểm mạng bị nghẽn băng thông và có nguy cơ sập đơn điểm. Thiết kế lại như thế nào để vừa chịu lỗi cao, băng thông lớn và tốn ít công vận hành nhất?",
        options: [
          "A. Upgrade the NAT Instance to a c5.4xlarge instance.",
          "B. Replace the NAT Instance by deploying an AWS Managed NAT Gateway in the Public Subnet of each Availability Zone and updating each Private Subnet's route table accordingly.",
          "C. Attach a second Internet Gateway to the VPC.",
          "D. Use an Egress-Only Internet Gateway for IPv4 traffic."
        ],
        correctIdx: 1,
        explanation: "Sử dụng AWS Managed NAT Gateway đặt tại mỗi AZ giúp đạt băng thông lên tới 100 Gbps, tự động chịu lỗi ở từng AZ và loại bỏ hoàn toàn công sức quản trị máy chủ NAT Instance."
      }
    ]
  },

  40: {
    jargon: [
      { term: "Stateless Firewall (Tường lửa không trạng thái - NACL)", plain: "Người bảo vệ mất trí nhớ ngắn hạn ở cổng khu phố (Subnet): Lúc khách đi VÀO kiểm tra giấy tờ 1 lần; lúc khách đi RA lại kiểm tra giấy tờ từ đầu! Nếu quên mở chiều đi ra là khách bị nhốt bên trong không về được!" },
      { term: "Ephemeral Ports (Cổng tạm thời: 1024 - 65535)", plain: "Khi trình duyệt của bạn gọi vào cổng 443 của Web Server, bản thân máy tính của bạn sẽ mở ngẫu nhiên 1 cổng tạm (ví dụ cổng 54321) để hứng câu trả lời. Vì vậy trong NACL, chiều Outbound bắt buộc phải mở dải cổng tạm 1024-65535!" },
      { term: "VPC Reachability Analyzer vs Traffic Mirroring", plain: "Reachability Analyzer = Công cụ chẩn đoán cấu hình (không gửi gói tin thật) để tìm xem tại sao máy A không gọi được máy B (do NACL hay SG hay Route Table chặn?). Traffic Mirroring = Sao chép toàn bộ gói tin mạng thật gửi sang máy chủ bảo mật để phân tích sâu." }
    ],
    diagram: `
Luồng đi của Gói tin qua 2 lớp Tường lửa (NACL vs Security Group):
[Khách hàng (IP: 1.2.3.4, Port tạm: 52000)]
        │
        ▼ (1. Kiểm tra NACL Inbound: Cho phép cổng 443 + Kiểm tra có bị dính lệnh DENY IP 1.2.3.4 không?)
┌────────────────────────────────────────────────────────┐
│ SUBNET (Bảo vệ bởi Network ACL - Stateless)            │
│       │                                                │
│       ▼ (2. Kiểm tra SG Inbound: Cho phép cổng 443)    │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Máy EC2 (Bảo vệ bởi Security Group - Stateful)   │  │
│  └────────────────────────┬─────────────────────────┘  │
│                           │ (3. SG Outbound: Tự động cho qua vì Stateful!)
└───────────────────────────┼────────────────────────────┘
                            ▼ (4. Kiểm tra NACL Outbound: Phải mở cổng Ephemeral 1024-65535 để trả kết quả về!)`,
    deepSections: [
      {
        title: "1. Quy tắc Đánh số Thứ tự (Rule Number) trong Network ACL (NACL)",
        content: "• Trong NACL, các quy tắc được chấm điểm từ <strong>số thứ tự nhỏ nhất đến lớn nhất</strong> (tối đa 32766, và kết thúc bằng quy tắc <code>*</code> Deny All). <strong>Hễ khớp với quy tắc nào đầu tiên là áp dụng ngay lập tức và ngừng đọc các dòng bên dưới!</strong><br>• <strong>Ví dụ bẫy đề thi</strong>: Nếu bạn có <code>Rule #100: ALLOW 0.0.0.0/0</code> (Cho phép tất cả), rồi bạn thêm <code>Rule #200: DENY 198.51.100.5/32</code> (Chặn IP hacker) → Hacker <strong>VẪN VÀO ĐƯỢC BÌNH THƯỜNG</strong> vì nó đã khớp với Rule #100 ở trên rồi! Muốn chặn được IP đó, bạn <strong>phải đặt số thứ tự của lệnh DENY nhỏ hơn 100</strong> (ví dụ: <code>Rule #50: DENY 198.51.100.5/32</code>)!"
      },
      {
        title: "2. Ba công cụ Chẩn đoán & Giám sát Mạng VPC: Flow Logs, Reachability Analyzer & Traffic Mirroring",
        content: "• <strong>VPC Flow Logs</strong>: Ghi lại metadata của các kết nối mạng (IP nguồn, IP đích, Cổng, Giao thức, và trạng thái <strong><code>ACCEPT</code> hay <code>REJECT</code></strong>) ở cấp độ VPC, Subnet hoặc ENI. Có thể đẩy thẳng vào <strong>S3 (phân tích bằng Athena)</strong>, <strong>CloudWatch Logs</strong>, hoặc <strong>Kinesis Data Firehose</strong>.<br>• <strong>VPC Reachability Analyzer</strong>: Khi đề bài nói <em>'Hai máy EC2 không kết nối được với nhau, kỹ sư muốn kiểm tra tự động toàn bộ cấu hình Route Tables, Security Groups và NACLs dọc đường đi để chỉ ra chính xác chỗ nào bị cấu hình sai mà không cần gửi gói tin thực tế'</em> → Chọn <strong>VPC Reachability Analyzer</strong>!<br>• <strong>VPC Traffic Mirroring</strong>: Sao chép nguyên vẹn nội dung gói tin mạng (Full packet capture) từ card mạng ENI của máy EC2 đẩy sang một thiết bị phân tích bảo mật hoặc <em>Gateway Load Balancer</em> để dò tìm mã độc."
      }
    ],
    extraCards: [
      { q: "Trong bảng Inbound Rules của một Network ACL (NACL) đang có Rule #100 là 'ALLOW 0.0.0.0/0'. Nếu quản trị viên thêm Rule #150 là 'DENY 203.0.113.8/32' để chặn một IP tấn công thì IP đó có bị chặn không? Tại sao?", a: "KHÔNG bị chặn. Vì NACL đánh giá theo số thứ tự từ nhỏ đến lớn; gói tin đã khớp với Rule #100 (ALLOW) trước nên Rule #150 không bao giờ được xét tới. Phải đặt số Rule của lệnh DENY nhỏ hơn 100 (ví dụ Rule #90)." },
      { q: "Công cụ nào của VPC giúp tự động phân tích cấu hình tĩnh (Route Tables, Security Groups, NACLs) để tìm nguyên nhân tại sao máy EC2 A không thể kết nối tới máy EC2 B?", a: "VPC Reachability Analyzer." },
      { q: "Khi cần sao chép toàn bộ nội dung gói tin mạng thực tế (Network packet capture) đi qua card mạng ENI của các máy EC2 để gửi tới một hệ thống phát hiện xâm nhập (IDS) phân tích sâu, ta dùng tính năng gì?", a: "VPC Traffic Mirroring." }
    ],
    quizzes: [
      {
        qEn: "A security engineer notices in VPC Flow Logs that a specific external IP address (`198.51.100.44`) is attempting a brute-force attack against EC2 instances in a public subnet. The subnet's Network ACL currently has Rule 100 allowing inbound HTTP/HTTPS traffic from `0.0.0.0/0`. How should the engineer block this malicious IP address at the subnet level?",
        qVi: "Kỹ sư bảo mật phát hiện trong VPC Flow Logs có một địa chỉ IP cụ thể (`198.51.100.44`) đang tấn công dò mật khẩu vào các máy EC2 trong Public Subnet. Hiện tại NACL của Subnet đang có Rule #100 cho phép Inbound từ `0.0.0.0/0`. Làm sao chặn địa chỉ IP độc hại này ở tầng Subnet?",
        options: [
          "A. Add a Deny rule for IP `198.51.100.44/32` to the EC2 Security Group.",
          "B. Add an Inbound Rule to the Network ACL with a DENY action for source `198.51.100.44/32` and a rule number lower than 100 (e.g., Rule #50).",
          "C. Add an Inbound DENY rule to the Network ACL with Rule #200.",
          "D. Detach the Internet Gateway from the VPC."
        ],
        correctIdx: 1,
        explanation: "Security Group không hỗ trợ lệnh Deny. Trên Network ACL (NACL), các quy tắc được đọc theo thứ tự từ nhỏ đến lớn, nên lệnh DENY cho IP cụ thể bắt buộc phải có Rule Number nhỏ hơn 100."
      },
      {
        qEn: "After modifying several route tables, security groups, and network ACLs across peered VPCs, an application server on EC2 can no longer connect to a database server. Which AWS tool can perform automated static configuration analysis to pinpoint the exact network component blocking the path without sending live traffic?",
        qVi: "Sau khi sửa đổi nhiều bảng định tuyến, Security Groups và NACLs giữa các VPC, máy chủ ứng dụng không còn kết nối được tới Database. Công cụ nào của AWS có thể tự động phân tích cấu hình để chỉ ra chính xác thành phần mạng nào đang chặn đường đi mà không cần gửi gói tin thật?",
        options: [
          "A. VPC Flow Logs",
          "B. AWS VPC Reachability Analyzer",
          "C. VPC Traffic Mirroring",
          "D. Amazon Inspector"
        ],
        correctIdx: 1,
        explanation: "VPC Reachability Analyzer kiểm tra toán học toàn bộ chuỗi cấu hình mạng (SG, NACL, Route Table, Peering, TGW) giữa nguồn và đích để chỉ ra chính xác quy tắc nào đang làm đứt kết nối."
      }
    ]
  },

  41: {
    jargon: [
      { term: "Non-Transitive Routing (Không có tính bắc cầu)", plain: "Tính chất của VPC Peering: VPC A nối dây mạng sang VPC B, và VPC B nối dây mạng sang VPC C, nhưng máy ở VPC A KHÔNG THỂ mượn bụng VPC B để nhảy sang nói chuyện với VPC C được (Muốn A nói chuyện với C phải kéo thêm 1 sợi dây trực tiếp giữa A và C, hoặc dùng Transit Gateway!)." },
      { term: "Gateway VPC Endpoint (Miễn phí 100%!)", plain: "Cánh cửa thần kỳ mở thẳng từ Route Table của Private Subnet sang kho S3 và DynamoDB — không cần đi vòng qua NAT Gateway, không tốn 1 xu tiền phí dữ liệu!" },
      { term: "AWS PrivateLink (VPC Endpoint Services)", plain: "Cách an toàn nhất để Công ty A cung cấp một dịch vụ nội bộ ở VPC A cho hàng trăm khách hàng ở VPC B, C, D kết nối vào dùng qua mạng riêng AWS: Không cần nối VPC Peering, chỉ cho phép đi 1 chiều vào đúng dịch vụ đó, và KHÔNG SỢ bị trùng dải IP (Overlapping CIDRs OK)!" }
    ],
    diagram: `
So sánh 2 Loại VPC Endpoints & AWS PrivateLink:
 1. [Gateway VPC Endpoint]   ──► CHỈ DÙNG CHO [Amazon S3] & [DynamoDB]! Cấu hình qua Route Table ──► MIỄN PHÍ 100%!
 2. [Interface VPC Endpoint] ──► Dùng cho mọi dịch vụ còn lại (SQS, SNS, KMS, SSM...) qua card mạng ENI (Có tính phí).
 3. [AWS PrivateLink Custom] ──► [Consumer VPC: Interface Endpoint] ──(1 chiều, chấp nhận trùng IP CIDR!)──► [Provider VPC: NLB + Dịch vụ nội bộ]`,
    deepSections: [
      {
        title: "1. Gateway VPC Endpoint vs Interface VPC Endpoint (Câu hỏi tiết kiệm chi phí số 1 đề thi!)",
        content: "• Khi các máy EC2 hoặc hàm Lambda trong Private Subnet tải dữ liệu từ S3/DynamoDB thông qua <strong>NAT Gateway</strong>, công ty bạn sẽ bị tính phí <code>$0.045 / GB</code> xử lý dữ liệu trên NAT Gateway.<br>• <strong>Giải pháp tối ưu chi phí tuyệt đối</strong>: Tạo một <strong>Gateway VPC Endpoint</strong> cho <strong>Amazon S3</strong> hoặc <strong>Amazon DynamoDB</strong> và gắn vào Route Table của Private Subnet! Gateway Endpoint hoàn toàn <strong>MIỄN PHÍ</strong>.<br>• Còn nếu máy trong Private Subnet muốn gọi riêng tư vào <strong>SQS, SNS, KMS, CloudWatch, Secrets Manager, Kinesis...</strong> mà không đi ra Internet → Phải dùng <strong>Interface VPC Endpoint (powered by AWS PrivateLink)</strong>."
      },
      {
        title: "2. Khi nào dùng AWS PrivateLink (VPC Endpoint Service) thay vì VPC Peering?",
        content: "Đề thi SAA-C03 có một dạng bài rất hay: <em>'Công ty muốn mở một microservice đang chạy trong VPC của mình cho 50 VPC của các đối tác khách hàng khác gọi vào qua mạng nội bộ AWS. Tuy nhiên: (1) Không muốn lộ toàn bộ VPC như khi dùng VPC Peering, và (2) Nhiều VPC của khách hàng đang bị TRÙNG DẢI ĐỊA CHỈ IP (Overlapping CIDR blocks 10.0.0.0/16) với VPC của công ty!'</em><br>👉 <strong>Giải pháp duy nhất đúng</strong>: Đặt dịch vụ của bạn phía sau một <strong>Network Load Balancer (NLB)</strong> (hoặc GWLB), tạo một <strong>VPC Endpoint Service (AWS PrivateLink)</strong>, và cho phép các VPC của khách hàng tạo một <em>Interface VPC Endpoint</em> nối vào! PrivateLink chỉ mở đúng 1 chiều vào dịch vụ đó và <strong>hoạt động bình thường ngay cả khi 2 VPC bị trùng dải IP CIDR</strong>!"
      }
    ],
    extraCards: [
      { q: "Hai VPC của công ty và đối tác đều đang sử dụng trùng dải địa chỉ IP CIDR là 10.0.0.0/16. Công ty muốn cho phép máy chủ ở VPC đối tác gọi riêng tư vào một API nội bộ trong VPC của công ty mà không đi qua Internet và không đổi lại IP. Giải pháp là gì?", a: "Đặt API nội bộ phía sau một Network Load Balancer (NLB), tạo VPC Endpoint Service (AWS PrivateLink) và tạo Interface VPC Endpoint bên phía VPC đối tác (vì PrivateLink không bị ảnh hưởng bởi trùng lặp CIDR)." },
      { q: "Làm thế nào để khóa một S3 Bucket sao cho CHỈ các máy chủ đi qua một VPC Endpoint cụ thể của công ty mới được phép truy cập vào Bucket đó?", a: "Trong S3 Bucket Policy, thêm lệnh Deny mọi truy cập nếu điều kiện 'aws:SourceVpce' (hoặc 'aws:SourceVpc') khác với ID của VPC Endpoint công ty." }
    ],
    quizzes: [
      {
        qEn: "A company runs a data processing application on EC2 instances in private subnets. The instances download and upload 100 TB of data daily to Amazon S3 and Amazon DynamoDB through a NAT Gateway, resulting in very high NAT Gateway data processing charges on the monthly AWS bill. How can the solutions architect reduce these data transfer costs to zero?",
        qVi: "Công ty chạy ứng dụng xử lý dữ liệu trên EC2 trong Private Subnets. Các máy tải lên và tải xuống 100 TB dữ liệu mỗi ngày với S3 và DynamoDB đi xuyên qua NAT Gateway khiến hóa đơn phí xử lý dữ liệu của NAT Gateway cực kỳ đắt đỏ. Làm sao giảm chi phí này về 0?",
        options: [
          "A. Replace the NAT Gateway with a NAT Instance.",
          "B. Create Gateway VPC Endpoints for both Amazon S3 and Amazon DynamoDB, and update the Private Subnets' route tables.",
          "C. Create Interface VPC Endpoints (AWS PrivateLink) for S3 and DynamoDB.",
          "D. Enable S3 Transfer Acceleration."
        ],
        correctIdx: 1,
        explanation: "Gateway VPC Endpoints hỗ trợ đúng 2 dịch vụ là Amazon S3 và DynamoDB, hoạt động qua Route Table và HOÀN TOÀN MIỄN PHÍ (không tốn phí giờ và không tốn phí xử lý mỗi GB dữ liệu)."
      },
      {
        qEn: "A SaaS provider hosts a financial verification service inside its VPC (`10.0.0.0/16`) and needs to expose this single service privately to dozens of customer VPCs across different AWS accounts. Several customer VPCs also use the exact same `10.0.0.0/16` CIDR block, and security policies prohibit exposing the entire provider network via VPC Peering. Which architecture meets these requirements?",
        qVi: "Nhà cung cấp SaaS chạy dịch vụ xác thực tài chính trong VPC (`10.0.0.0/16`) và cần cung cấp dịch vụ này qua mạng riêng cho hàng chục VPC của khách hàng. Nhiều VPC của khách hàng cũng dùng trùng dải IP `10.0.0.0/16` và bảo mật cấm nối thông toàn bộ mạng bằng VPC Peering. Kiến trúc nào đáp ứng được?",
        options: [
          "A. Establish VPC Peering connections between the VPCs.",
          "B. Place the service behind a Network Load Balancer (NLB), publish it as an AWS PrivateLink VPC Endpoint Service, and have customers connect via Interface VPC Endpoints.",
          "C. Connect all VPCs to a single AWS Transit Gateway.",
          "D. Expose the service publicly through an Internet Gateway."
        ],
        correctIdx: 1,
        explanation: "AWS PrivateLink (NLB + VPC Endpoint Service) cho phép chia sẻ 1 dịch vụ cụ thể theo chiều đơn hướng từ Consumer sang Provider mà không cần VPC Peering và hoàn toàn không bị lỗi khi các VPC trùng dải IP CIDR."
      }
    ]
  },

  42: {
    jargon: [
      { term: "Dedicated Connection vs Hosted Connection (Direct Connect)", plain: "Dedicated = Kéo riêng 1 sợi cáp quang vật lý 1 Gbps, 10 Gbps hoặc 100 Gbps dành độc quyền cho công ty bạn (mất vài tuần lắp đặt). Hosted = Thuê lại một phần băng thông nhỏ (50 Mbps -> 10 Gbps) từ nhà mạng đối tác AWS đã kéo sẵn cáp (kích hoạt nhanh)." },
      { term: "Direct Connect Gateway (DX Gateway)", plain: "Trạm chia cáp toàn cầu: Giúp 1 sợi cáp Direct Connect duy nhất ở Singapore có thể nối thông tới 10 VPC nằm rải rác ở nhiều Region khác nhau trên toàn thế giới (Mỹ, Âu, Nhật)!" },
      { term: "Accelerated Site-to-Site VPN", plain: "Tăng tốc cho đường hầm VPN qua Internet bằng cách cho gói tin VPN chui vào trạm AWS Global Accelerator gần công ty nhất rồi đi cáp quang riêng của AWS." }
    ],
    diagram: `
Kiến trúc Kết nối Hybrid Đỉnh Cao (Direct Connect + Transit Gateway + VPN Backup):
[Data Center Công ty (On-premise)]
   ├── Đường chính (Cáp quang riêng 10Gbps, Không mã hóa sẵn) ──► [AWS Direct Connect] ──► [Direct Connect Gateway] ──► [Transit Gateway] ──► Hàng chục VPCs!
   └── Đường dự phòng (Hoặc chạy đè lên DX để mã hóa IPsec!)   ──► [AWS Site-to-Site VPN (Mã hóa IPsec)] ────────────────────────▲`,
    deepSections: [
      {
        title: "1. Ba câu hỏi bẫy kinh điển về AWS Direct Connect (DX) trong đề thi",
        content: "• <strong>Bẫy 1 - Thời gian triển khai</strong>: Nếu đề bài nói <em>'Công ty cần chuyển 50 TB dữ liệu lên AWS ngay trong tuần này (hoặc cần kết nối Hybrid hoạt động ngay ngày mai)'</em> → <strong>LOẠI NGAY Direct Connect</strong> (vì kéo cáp vật lý mất tối thiểu vài tuần!). Hãy chọn <strong>AWS Site-to-Site VPN</strong> (hoặc <em>Snowball Edge</em>).<br>• <strong>Bẫy 2 - Mã hóa dữ liệu (Encryption in transit)</strong>: Direct Connect là đường cáp riêng tư nhưng <strong>mặc định KHÔNG ĐƯỢC MÃ HÓA</strong>. Để mã hóa dữ liệu đi trên Direct Connect → Thiết lập một đường hầm <strong>AWS Site-to-Site VPN (IPsec) chạy bên trên kết nối Direct Connect ( عبر Transit VIF hoặc Public VIF)</strong> (hoặc dùng <em>MACsec</em> ở Layer 2 cho kết nối Dedicated 10G/100G).<br>• <strong>Bẫy 3 - Tính sẵn sàng cao (Resiliency) của Direct Connect</strong>:<br>  - Muốn đạt độ tin cậy <strong>99.9% (High Resiliency)</strong>: Cần <strong>2 kết nối Direct Connect ở 2 địa điểm (Locations) khác nhau</strong>.<br>  - Muốn đạt độ tin cậy tối đa <strong>99.99% (Maximum Resiliency)</strong>: Cần <strong>4 kết nối Direct Connect đặt tại 2 địa điểm khác nhau (mỗi địa điểm 2 sợi cáp độc lập)</strong>.<br>  - Còn nếu đề bài hỏi phương án <strong>Dự phòng (Backup failover) tiết kiệm chi phí nhất (Most cost-effective)</strong> cho 1 đường Direct Connect → Luôn chọn <strong>AWS Site-to-Site VPN làm đường dự phòng</strong>!"
      },
      {
        title: "2. AWS Transit Gateway (TGW) & Tăng gấp đôi băng thông VPN bằng ECMP",
        content: "• Một đường hầm <strong>Site-to-Site VPN</strong> vào <em>Virtual Private Gateway (VGW)</em> bị giới hạn băng thông tối đa chỉ <strong>1.25 Gbps</strong>.<br>• Nếu đề bài hỏi: <em>'Làm thế nào để tăng tổng băng thông của kết nối Site-to-Site VPN lên 5 Gbps?'</em> → Kết nối nhiều đường hầm Site-to-Site VPN vào một <strong>AWS Transit Gateway</strong> và bật tính năng <strong>ECMP (Equal-Cost Multi-Path routing)</strong> để cộng gồn băng thông của nhiều đường VPN lại với nhau!"
      }
    ],
    extraCards: [
      { q: "Một đường hầm AWS Site-to-Site VPN tiêu chuẩn có băng thông tối đa là 1.25 Gbps. Làm thế nào để gộp nhiều đường hầm VPN lại nhằm đạt tổng băng thông 5 Gbps?", a: "Kết nối nhiều đường hầm Site-to-Site VPN vào AWS Transit Gateway và bật tính năng định tuyến ECMP (Equal-Cost Multi-Path)." },
      { q: "Để kết nối một đường truyền AWS Direct Connect duy nhất tới nhiều VPC nằm ở nhiều AWS Regions khác nhau (Multi-Region VPCs), ta phải sử dụng thành phần trung gian nào?", a: "AWS Direct Connect Gateway." },
      { q: "Theo khuyến nghị kiến trúc của AWS, để đạt độ sẵn sàng tối đa 99.99% (Maximum Resiliency) cho kết nối vật lý AWS Direct Connect, doanh nghiệp cần thiết lập bao nhiêu kết nối ở bao nhiêu địa điểm?", a: "Cần 4 kết nối Direct Connect riêng biệt đặt tại 2 Direct Connect Locations khác nhau (2 kết nối trên mỗi địa điểm)." }
    ],
    quizzes: [
      {
        qEn: "A healthcare company uses an AWS Direct Connect connection between its on-premises data center and AWS to transfer large medical files requiring consistent 10 Gbps throughput. A new compliance regulation requires that all data in transit over the Direct Connect connection must be encrypted using IPsec. Additionally, the company needs a cost-effective backup connection in case the Direct Connect fiber fails. What should the architect implement?",
        qVi: "Công ty y tế đang dùng đường cáp riêng Direct Connect 10 Gbps nối lên AWS. Quy định mới bắt buộc toàn bộ dữ liệu đi qua Direct Connect phải được mã hóa bằng giao thức IPsec, đồng thời cần một đường truyền dự phòng tiết kiệm chi phí nhất phòng khi đứt cáp quang. Kiến trúc sư nên làm gì?",
        options: [
          "A. Enable SSE-KMS directly on the Direct Connect connection.",
          "B. Establish an AWS Site-to-Site VPN connection over the Direct Connect connection (for IPsec encryption) and configure a second Site-to-Site VPN over the public internet as a cost-effective backup.",
          "C. Replace Direct Connect with VPC Peering.",
          "D. Use a Gateway VPC Endpoint."
        ],
        correctIdx: 1,
        explanation: "Direct Connect không có sẵn mã hóa IPsec. Chạy AWS Site-to-Site VPN bên trên Direct Connect cung cấp mã hóa IPsec đầu cuối, và một kết nối VPN qua Internet là phương án backup rẻ nhất."
      },
      {
        qEn: "A global enterprise has 25 VPCs distributed across 4 different AWS Regions and wants to connect its on-premises data center to all 25 VPCs using a single AWS Direct Connect connection with the simplest network topology. Which combination of services should be used?",
        qVi: "Tập đoàn toàn cầu có 25 VPC nằm rải rác trên 4 AWS Regions khác nhau và muốn nối Data Center dưới đất tới cả 25 VPC này thông qua duy nhất 1 đường cáp Direct Connect với kiến trúc mạng gọn gàng nhất. Kết hợp dịch vụ nào nên được chọn?",
        options: [
          "A. Create 25 individual VPC Peering connections.",
          "B. Connect the Direct Connect connection to a Direct Connect Gateway, and associate the Direct Connect Gateway with AWS Transit Gateways in each Region.",
          "C. Use AWS Global Accelerator.",
          "D. Use 25 Internet Gateways."
        ],
        correctIdx: 1,
        explanation: "Direct Connect Gateway cho phép bắc cầu từ 1 đường cáp Direct Connect sang nhiều AWS Regions, và kết hợp với Transit Gateway ở mỗi Region sẽ gom toàn bộ 25 VPC theo mô hình Hub-and-Spoke gọn nhất."
      }
    ]
  },

  43: {
    jargon: [
      { term: "Dual-Stack VPC (IPv4 + IPv6)", plain: "Mạng chạy song song cả địa chỉ IPv4 cũ (10.0.1.5) lẫn địa chỉ IPv6 mới dài ngoằng (2600:1f18:...). Lưu ý: Mọi địa chỉ IPv6 trên AWS đều là địa chỉ Public toàn cầu!" },
      { term: "Egress-Only Internet Gateway", plain: "Phiên bản NAT Gateway dành riêng cho IPv6 (và hoàn toàn miễn phí!): Cho phép máy chủ dùng IPv6 trong Private Subnet đi ra ngoài Internet nhưng chặn đứng chiều từ ngoài Internet gọi vào." },
      { term: "AWS Network Firewall", plain: "Trạm tường lửa thông minh bảo vệ toàn bộ khu đất VPC (từ Layer 3 đến Layer 7): Có khả năng đọc tên miền để chặn máy chủ EC2 không được phép gọi ra các trang web lạ (ví dụ: Cấm EC2 gọi ra mọi trang web trừ *.microsoft.com để tải bản vá!)." }
    ],
    diagram: `
So sánh Cổng Đi Ra Internet Cho Private Subnet (IPv4 vs IPv6):
 • Địa chỉ IPv4 (Private IP) ──► Đi qua [NAT Gateway (Đặt ở Public Subnet)]          ──► Ra [Internet Gateway]
 • Địa chỉ IPv6 (Public IP)  ──► Đi qua [Egress-Only Internet Gateway (Gắn vào VPC)] ──► Ra Internet (Chặn chiều vào!)`,
    deepSections: [
      {
        title: "1. Mọi điều cần biết về IPv6 trong VPC và Egress-Only Internet Gateway",
        content: "• Trong VPC, bạn không thể tắt IPv4 hoàn toàn mà chỉ có thể bật chế độ chạy song song <strong>Dual-Stack (IPv4 + IPv6)</strong>. Dải IPv6 cấp cho VPC luôn cố định ở mức <code>/56</code> và mỗi Subnet là <code>/64</code>.<br>• <strong>Tại sao nếu bật IPv6 mà không tạo được máy EC2 mới trong Subnet?</strong> → Nếu đề bài hỏi lỗi không bật được máy EC2 mặc dù dải IPv6 còn trống mênh mông, nguyên nhân luôn là: <strong>Subnet đó đã bị cạn kiệt địa chỉ IPv4 trống</strong>! (Vì mỗi máy EC2 trong Dual-stack subnet vẫn cần 1 IPv4 nội bộ).<br>• <strong>Egress-Only Internet Gateway</strong>: Vì mọi IPv6 đều là địa chỉ Public, nếu bạn trỏ IPv6 (`::/0`) ra Internet Gateway thường thì máy chủ của bạn sẽ bị lộ ra ngoài Internet. Để máy chủ IPv6 trong Private Subnet chỉ được phép đi RA ngoài mà cấm người ngoài đi VÀO → Phải tạo một <strong>Egress-Only Internet Gateway</strong> và trỏ route `::/0` về đó!"
      },
      {
        title: "2. Khi nào chọn AWS Network Firewall trong đề thi SAA-C03?",
        content: "• Security Group và NACL chỉ kiểm tra được địa chỉ IP và số Cổng (Port), hoàn toàn <strong>không biết gói tin đang đi tới tên miền (Domain name) nào</strong>.<br>• Khi đề bài yêu cầu: <strong><em>'Inspect and filter outbound traffic from the VPC based on fully qualified domain names (FQDN / URL filtering, e.g., only allow outbound HTTPS access to *.example.com) or apply Suricata IPS signature rules across the entire VPC'</em></strong> → Chọn ngay <strong>AWS Network Firewall</strong>! (Và nếu muốn áp dụng chính sách Network Firewall đồng bộ cho hàng chục VPC trong nhiều tài khoản thì kết hợp với <strong>AWS Firewall Manager</strong>)."
      }
    ],
    extraCards: [
      { q: "Security Group và Network ACL không hỗ trợ lọc lưu lượng đi ra (Outbound) theo tên miền (Domain name / FQDN). Nếu công ty yêu cầu các máy chủ EC2 trong VPC chỉ được phép kết nối HTTPS đi ra đúng tên miền '*.pypi.org' và chặn mọi tên miền khác thì dùng dịch vụ nào?", a: "AWS Network Firewall (cấu hình Stateful Domain List rule group)." },
      { q: "Trong một Subnet đã bật Dual-Stack (IPv4 và IPv6), mặc dù không gian địa chỉ IPv6 (/64) còn hàng tỷ địa chỉ trống nhưng Auto Scaling Group lại báo lỗi không thể tạo thêm máy EC2 mới do thiếu IP. Nguyên nhân là gì?", a: "Do dải địa chỉ IPv4 của Subnet đó đã bị dùng hết (cạn kiệt IPv4). Cần thêm Secondary IPv4 CIDR block." }
    ],
    quizzes: [
      {
        qEn: "A company has migrated its VPC to a dual-stack configuration supporting both IPv4 and IPv6. The EC2 instances in the private subnets use IPv6 addresses and need outbound internet access to download OS updates, but security rules strictly prohibit any inbound IPv6 connections initiated from the internet. Which VPC component should the architect configure?",
        qVi: "Công ty đã nâng cấp VPC lên cấu hình Dual-stack chạy cả IPv4 và IPv6. Các máy EC2 trong Private Subnets sử dụng địa chỉ IPv6 cần đi ra ngoài Internet để tải bản vá hệ điều hành, nhưng quy định bảo mật cấm tuyệt đối mọi kết nối IPv6 từ ngoài Internet chủ động gọi vào. Cần cấu hình thành phần nào?",
        options: [
          "A. NAT Gateway",
          "B. Egress-Only Internet Gateway (with a ::/0 route in the private subnet route table)",
          "C. Bastion Host",
          "D. Gateway VPC Endpoint"
        ],
        correctIdx: 1,
        explanation: "NAT Gateway chỉ hoạt động với IPv4. Đối với IPv6, Egress-Only Internet Gateway là thành phần chuyên dụng cho phép kết nối IPv6 đi ra Internet một chiều và chặn hoàn toàn kết nối khởi tạo từ Internet vào."
      },
      {
        qEn: "A financial institution requires deep packet inspection (IPS) and strict outbound domain filtering for all EC2 instances in its VPC so that instances can only initiate outbound HTTPS connections to approved partner domains (such as '*.trustedpartner.com') while blocking all other domains. Which AWS managed service meets this requirement?",
        qVi: "Tổ chức tài chính yêu cầu kiểm tra gói tin sâu (IPS) và lọc tên miền chiều đi ra (Outbound domain filtering) cho toàn bộ máy EC2 trong VPC sao cho các máy chỉ được phép gọi HTTPS ra các tên miền đối tác đã duyệt ('*.trustedpartner.com') và chặn mọi tên miền khác. Dịch vụ nào của AWS đáp ứng được?",
        options: [
          "A. Security Groups",
          "B. Network ACLs (NACLs)",
          "C. AWS Network Firewall",
          "D. AWS Shield Standard"
        ],
        correctIdx: 2,
        explanation: "Security Groups và NACLs chỉ lọc được theo IP/Port chứ không lọc được theo tên miền (Domain name/FQDN). AWS Network Firewall hỗ trợ lọc tên miền chiều ra (Outbound domain filtering) và bộ quy tắc chống xâm nhập IPS cho toàn bộ VPC."
      }
    ]
  }
};
