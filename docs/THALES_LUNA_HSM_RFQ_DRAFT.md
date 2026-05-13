# RFQ DRAFT: THALES LUNA HSM CLUSTER PROCUREMENT
## SOVEREIGN UNIFIED ARCHITECTURE — SECURE KEY MANAGEMENT

**DATE:** 2026-05-13
**RFQ ID:** SUA-RFQ-HSM-2026-001
**ESTIMATED QUANTITY:** 3 Nodes (HA Cluster)

---

### 1. SCOPE OF WORK
Procurement of a High-Availability (HA) cluster of Hardware Security Modules (HSMs) to manage cryptographic keys for the SUA NeuralFlow and Faction tensor encryption.

### 2. MANDATORY TECHNICAL SPECIFICATIONS
*   **Model:** Thales Luna Network HSM (or equivalent FIPS 140-3 Level 3 certified).
*   **Standard:** FIPS 140-3 Level 3 (Validated).
*   **Algorithm Support:** 
    *   HMAC-SHA384
    *   AES-256-GCM
    *   Post-Quantum Cryptography (PQC) algorithm support required.
*   **Connectivity:** Dual 10Gbps SFP+ mTLS-ready interfaces.
*   **Integration:** Must support PKCS#11 and custom HSM key injection via SUA Kernel.

### 3. SOVEREIGN REQUIREMENTS
*   **Log Isolation:** Audit logs must be storage-immutable and only accessible via air-gapped console.
*   **Chain of Custody:** Signed firmware updates; physical tamper-evident packaging.
*   **Support:** 5-year onsite support with air-gapped patch delivery.

### 4. SUBMISSION DEADLINE
Quotes must be submitted by 2026-05-20 UTC.

---
**AUTHORIZED BY:** SUA PROCUREMENT DIVISION
