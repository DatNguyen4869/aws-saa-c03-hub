// checkpoints.js — Định nghĩa 6 bài thi Checkpoint cuối mỗi chặng (Spec P5).
// Dùng chung cho trình duyệt (window.CHECKPOINTS) và Node test (module.exports).

(function (root) {
  "use strict";

  /**
   * @typedef {{
   *   id: "cp1"|"cp2"|"cp3"|"cp4"|"cp5"|"cp6",
   *   phaseId: 1|2|3|4|5|6,
   *   afterSessionId: number,
   *   title: string,
   *   count: number,
   *   minutes: number,
   *   currentShare: number,
   *   passPct: number,
   *   focus: string[]
   * }} Checkpoint
   */
  const CHECKPOINTS = [
    {
      id: "cp1",
      phaseId: 1,
      afterSessionId: 10,
      title: "Checkpoint Chặng 1 – IAM, EC2 & Storage gắn kèm",
      count: 20,
      minutes: 40,
      currentShare: 1.0,
      passPct: 0.7,
      focus: ["IAM", "Security Group", "EC2 Purchasing", "Placement Group", "EBS & Instance Store", "EFS"]
    },
    {
      id: "cp2",
      phaseId: 2,
      afterSessionId: 19,
      title: "Checkpoint Chặng 2 – ELB, Auto Scaling & Amazon S3",
      count: 25,
      minutes: 50,
      currentShare: 0.7,
      passPct: 0.7,
      focus: ["ALB/NLB/GWLB", "ASG Policies", "S3 Storage Classes & Lifecycle", "S3 Encryption", "S3 Replication", "S3 Object Lock"]
    },
    {
      id: "cp3",
      phaseId: 3,
      afterSessionId: 28,
      title: "Checkpoint Chặng 3 – Cơ sở dữ liệu, DNS & CDN Toàn cầu",
      count: 25,
      minutes: 50,
      currentShare: 0.6,
      passPct: 0.7,
      focus: ["RDS Multi-AZ & Read Replica", "Aurora & RDS Proxy", "ElastiCache", "DynamoDB & DAX", "Route 53 Policies", "CloudFront & Global Accelerator"]
    },
    {
      id: "cp4",
      phaseId: 4,
      afterSessionId: 36,
      title: "Checkpoint Chặng 4 – Hybrid Storage, Decoupling, Containers & Serverless",
      count: 30,
      minutes: 60,
      currentShare: 0.6,
      passPct: 0.7,
      focus: ["FSx & Hybrid Storage", "SQS/SNS Fan-out", "Kinesis & MSK", "ECS/Fargate & EKS", "Lambda Limits & Destinations", "API Gateway & Step Functions"]
    },
    {
      id: "cp5",
      phaseId: 5,
      afterSessionId: 43,
      title: "Checkpoint Chặng 5 – Kiến trúc Mạng VPC & Hybrid Networking",
      count: 30,
      minutes: 60,
      currentShare: 0.6,
      passPct: 0.7,
      focus: ["VPC & Subnets", "IGW, NAT Gateway & SSM", "NACL vs Security Group", "VPC Endpoints & Peering", "Transit Gateway, VPN & Direct Connect", "Egress-Only IGW & Network Firewall"]
    },
    {
      id: "cp6",
      phaseId: 6,
      afterSessionId: 51,
      title: "Checkpoint Chặng 6 – Analytics, AI/ML, Giám sát, Bảo mật & DR",
      count: 40,
      minutes: 80,
      currentShare: 0.5,
      passPct: 0.7,
      focus: ["Athena, Glue & Lake Formation", "Bedrock & SageMaker", "CloudWatch, CloudTrail, Config & X-Ray", "Organizations, SCP & RCP", "KMS, CloudHSM & Secrets Manager", "WAF, Shield, GuardDuty & DR Strategies"]
    }
  ];

  if (root) {
    root.CHECKPOINTS = CHECKPOINTS;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = CHECKPOINTS;
  }
})(typeof window !== "undefined" ? window : globalThis);
