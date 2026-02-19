import { useState, useEffect, useRef } from "react";

/* ─── GLOBAL STYLES ────────────────────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Playfair+Display:wght@400;500;600&family=Inter+Tight:wght@400;500;600&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }

    :root {
      --cream: #f0ebe0;
      --warm: #e6e0d4;
      --sand: #d4cdc1;
      --sage: #b8bfad;
      --forest: #2d5a3d;
      --forest-mid: #3d7a52;
      --forest-light: #5a9a72;
      --forest-pale: #eaf2ed;
      --green-accent: #4caf50;
      --green-accent-bg: #edf7ee;
      --action-bg: #edf7ee;
      --action-border: #4caf50;
      --watch-bg: #f5f2ec;
      --watch-border: #d4cdc1;
      --shadow-sm: 0 1px 3px rgba(45,90,61,0.08);
      --shadow-md: 0 4px 12px rgba(45,90,61,0.1);
      --radius: 12px;
    }

    body {
      font-family: 'Inter Tight', sans-serif;
      background: var(--cream);
      color: var(--forest);
      min-height: 100vh;
      -webkit-font-smoothing: antialiased;
    }

    .app-shell {
      max-width: 860px;
      margin: 0 auto;
      padding: 0 16px 80px;
    }

    /* ─── HEADER ─── */
    .header {
      padding: 40px 0 32px;
    }
    .header-badge {
      display: inline-block;
      background: var(--forest);
      color: var(--cream);
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 2.2px;
      text-transform: uppercase;
      padding: 4px 14px;
      border-radius: 20px;
      margin-bottom: 12px;
    }
    .header h1 {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 2rem;
      font-weight: 800;
      color: var(--forest);
      line-height: 1.05;
      text-transform: uppercase;
      letter-spacing: 0.02em;
      margin-bottom: 6px;
    }
    .header p {
      font-family: 'Inter Tight', sans-serif;
      color: var(--forest-mid);
      font-size: 0.95rem;
      line-height: 1.55;
    }

    /* ─── INTRO SECTION ─── */
    .intro-section {
      margin-bottom: 28px;
    }
    .intro-section > p {
      font-size: 15px;
      color: var(--forest);
      line-height: 1.6;
      margin-bottom: 16px;
    }
    .survey-prompt {
      display: flex;
      align-items: center;
      gap: 14px;
      background: var(--warm);
      border: 1.5px solid var(--sand);
      border-radius: 10px;
      padding: 16px 18px;
    }
    .survey-prompt-icon {
      font-size: 24px;
      flex-shrink: 0;
    }
    .survey-prompt-text {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .survey-prompt-text strong {
      font-size: 14px;
      color: var(--forest);
    }
    .survey-prompt-text span {
      font-size: 13px;
      color: var(--forest-mid);
      line-height: 1.4;
    }

    /* ─── PROGRESS BAR ─── */
    .progress-track {
      width: 100%;
      height: 4px;
      background: var(--sand);
      border-radius: 2px;
      margin-bottom: 36px;
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      background: var(--green-accent);
      border-radius: 2px;
      transition: width 0.5s cubic-bezier(.4,0,.2,1);
    }

    /* ─── ACCORDION SECTIONS ─── */
    .accordion-section {
      background: #fff;
      border-radius: var(--radius);
      box-shadow: var(--shadow-sm);
      border: 1px solid rgba(45,90,61,0.08);
      margin-bottom: 16px;
      overflow: hidden;
      transition: all 0.3s ease;
    }
    .accordion-section.active {
      border-color: var(--green-accent);
      box-shadow: var(--shadow-md);
    }
    .accordion-section.completed {
      border-color: var(--sage);
    }
    .accordion-header {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 20px 24px;
      cursor: pointer;
      user-select: none;
      transition: background 0.2s;
    }
    .accordion-header:hover {
      background: var(--forest-pale);
    }
    .accordion-step-badge {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--sand);
      color: var(--forest-mid);
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 14px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: all 0.2s;
    }
    .accordion-section.active .accordion-step-badge {
      background: var(--forest);
      color: #fff;
    }
    .accordion-section.completed .accordion-step-badge {
      background: var(--green-accent);
      color: #fff;
    }
    .accordion-header-text {
      flex: 1;
    }
    .accordion-header-text h3 {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 20px;
      font-weight: 700;
      color: var(--forest);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 2px;
    }
    .accordion-header-text p {
      font-size: 13px;
      color: var(--forest-mid);
    }
    .accordion-chevron {
      color: var(--forest-mid);
      transition: transform 0.3s ease;
      flex-shrink: 0;
    }
    .accordion-section.open .accordion-chevron {
      transform: rotate(180deg);
    }
    .accordion-body {
      padding: 0 24px 24px;
      animation: slideDown 0.3s ease;
    }
    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* ─── CARDS ─── */
    .card {
      background: #fff;
      border-radius: var(--radius);
      box-shadow: var(--shadow-sm);
      border: 1px solid rgba(45,90,61,0.08);
      padding: 28px;
      margin-bottom: 20px;
      animation: slideUp 0.35s cubic-bezier(.4,0,.2,1);
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(12px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .card-title {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 24px;
      font-weight: 700;
      color: var(--forest);
      margin-bottom: 6px;
      line-height: 1.2;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .card-sub {
      font-size: 13.5px;
      color: var(--forest-mid);
      margin-bottom: 18px;
      line-height: 1.5;
    }

    /* ─── HOMEWORK LIST (Found/Not Found) ─── */
    .homework-list { display: flex; flex-direction: column; gap: 14px; }
    .homework-item {
      border-radius: 10px;
      border: 1.5px solid var(--sand);
      background: var(--warm);
      padding: 16px;
      transition: all 0.2s;
    }
    .homework-item.found {
      border-color: var(--green-accent);
      background: var(--green-accent-bg);
    }
    .homework-item.not-found {
      border-color: var(--sage);
      background: var(--forest-pale);
    }
    .hw-item-label {
      font-size: 14px;
      font-weight: 600;
      color: var(--forest);
      margin-bottom: 10px;
    }
    .hw-button-row {
      display: flex;
      gap: 8px;
    }
    .hw-btn {
      flex: 1;
      font-family: 'Inter Tight', sans-serif;
      font-size: 13px;
      font-weight: 600;
      padding: 10px 14px;
      border-radius: 6px;
      border: 1.5px solid var(--sand);
      background: #fff;
      color: var(--forest);
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }
    .hw-btn:hover { border-color: var(--forest-light); }
    .hw-btn.found-btn.selected {
      background: var(--green-accent);
      border-color: var(--green-accent);
      color: #fff;
    }
    .hw-btn.not-found-btn.selected {
      background: var(--forest-mid);
      border-color: var(--forest-mid);
      color: #fff;
    }
    .hw-status-note {
      margin-top: 10px;
      font-size: 12px;
      color: var(--forest-mid);
      font-style: italic;
    }

    /* ─── YES / NO BUTTONS ─── */
    .yn-row { display: flex; gap: 10px; margin-top: 18px; }
    .yn-btn {
      flex: 1;
      font-family: 'Inter Tight', sans-serif;
      font-size: 15px;
      font-weight: 600;
      padding: 13px;
      border-radius: 8px;
      border: 2px solid var(--sand);
      background: #fff;
      color: var(--forest);
      cursor: pointer;
      transition: all 0.2s;
      text-align: center;
    }
    .yn-btn:hover { border-color: var(--forest-light); background: var(--warm); }
    .yn-btn.yes { border-color: var(--green-accent); background: var(--green-accent-bg); color: var(--forest); }
    .yn-btn.no  { border-color: var(--sage); background: var(--forest-pale); color: var(--forest-mid); }
    .yn-btn.idk { border-color: #e0a840; background: #fef9ec; color: var(--forest); }

    /* ─── BUTTONS ─── */
    .btn-row { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 20px; }
    .btn {
      font-family: 'Inter Tight', sans-serif;
      font-size: 14px;
      font-weight: 600;
      padding: 11px 22px;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      transition: all 0.2s;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      text-decoration: none;
    }
    .btn-leaf { background: var(--forest); color: #fff; }
    .btn-leaf:hover { background: var(--forest-mid); }
    .btn-secondary {
      background: var(--warm);
      color: var(--forest);
      border: 1.5px solid var(--sand);
    }
    .btn-secondary:hover { border-color: var(--forest-light); }
    .btn-sm {
      font-size: 12px;
      padding: 8px 14px;
    }
    .btn-ghost {
      background: transparent;
      color: var(--forest-mid);
      border: none;
      padding: 8px 12px;
    }
    .btn-ghost:hover { color: var(--forest); background: var(--warm); }

    /* ─── ACTION BLOCK ─── */
    .action-block {
      background: var(--action-bg);
      border: 2px solid var(--action-border);
      border-radius: 10px;
      padding: 18px 20px;
      margin-top: 16px;
      animation: fadeIn 0.3s ease;
    }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    .action-block-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 10px;
    }
    .action-tag {
      background: var(--forest);
      color: #fff;
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      padding: 3px 10px;
      border-radius: 4px;
    }
    .action-block p {
      font-size: 14px;
      color: var(--forest);
      line-height: 1.55;
    }
    .action-block ul {
      list-style: none;
      margin-top: 8px;
    }
    .action-block ul li {
      font-size: 14px;
      color: var(--forest);
      padding: 5px 0;
      padding-left: 20px;
      position: relative;
      line-height: 1.45;
    }
    .action-block ul li::before {
      content: '→';
      position: absolute;
      left: 0;
      color: var(--green-accent);
      font-weight: 700;
    }

    /* ─── IDK ACTION BLOCK ─── */
    .idk-action-block {
      background: #fef9ec;
      border: 2px solid #e0a840;
      border-radius: 10px;
      padding: 18px 20px;
      margin-top: 16px;
      animation: fadeIn 0.3s ease;
    }
    .idk-tag {
      background: #e0a840;
      color: #fff;
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      padding: 3px 10px;
      border-radius: 4px;
    }
    .idk-action-block p {
      font-size: 14px;
      color: var(--forest);
      line-height: 1.55;
    }

    /* ─── INFO BLOCK ─── */
    .info-block {
      background: var(--forest-pale);
      border: 1.5px solid #c5dece;
      border-radius: 10px;
      padding: 16px 20px;
      margin-top: 14px;
    }
    .info-block p {
      font-size: 13.5px;
      color: var(--forest-mid);
      line-height: 1.55;
    }
    .info-block strong { color: var(--forest); }

    /* ─── WATCH BLOCK (No answers) ─── */
    .watch-block {
      background: var(--watch-bg);
      border: 1.5px solid var(--watch-border);
      border-radius: 10px;
      padding: 14px 18px;
      margin-top: 16px;
      animation: fadeIn 0.3s ease;
    }
    .watch-block-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 6px;
    }
    .watch-tag {
      background: var(--forest-mid);
      color: #fff;
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      padding: 3px 10px;
      border-radius: 4px;
    }
    .watch-block p {
      font-size: 13.5px;
      color: var(--forest-mid);
      line-height: 1.5;
    }

    /* ─── QUESTION CARD IN ACCORDION ─── */
    .question-row {
      background: var(--warm);
      border-radius: 10px;
      padding: 16px 18px;
      margin-bottom: 12px;
      border: 1.5px solid var(--sand);
      transition: all 0.2s;
    }
    .question-row.answered-yes {
      border-color: var(--green-accent);
      background: var(--green-accent-bg);
    }
    .question-row.answered-no {
      border-color: var(--sage);
      background: var(--forest-pale);
    }
    .question-row.answered-idk {
      border-color: #e0a840;
      background: #fef9ec;
    }
    .question-row-header {
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }
    .question-num {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: var(--sand);
      color: var(--forest-mid);
      font-size: 12px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .question-row.answered-yes .question-num {
      background: var(--green-accent);
      color: #fff;
    }
    .question-row.answered-no .question-num {
      background: var(--sage);
      color: #fff;
    }
    .question-row.answered-idk .question-num {
      background: #e0a840;
      color: #fff;
    }
    .question-text {
      flex: 1;
      font-size: 14px;
      font-weight: 500;
      color: var(--forest);
      line-height: 1.4;
    }
    .question-answer-badge {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      padding: 3px 8px;
      border-radius: 4px;
      flex-shrink: 0;
    }
    .question-answer-badge.yes {
      background: var(--green-accent);
      color: #fff;
    }
    .question-answer-badge.no {
      background: var(--sage);
      color: var(--forest);
    }
    .question-answer-badge.idk {
      background: #e0a840;
      color: #fff;
    }
    .question-details {
      margin-top: 12px;
      margin-left: 36px;
    }

    /* ─── SUMMARY ACTIONS ─── */
    .summary-section { margin-top: 28px; text-align: left; }
    .summary-label {
      font-family: 'Barlow Condensed', sans-serif;
      font-weight: 700;
      font-size: 13px;
      color: var(--forest-mid);
      letter-spacing: 1.5px;
      text-transform: uppercase;
      margin-bottom: 10px;
    }
    .summary-list { display: flex; flex-direction: column; gap: 8px; }
    .summary-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 10px 14px;
      background: var(--green-accent-bg);
      border-radius: 8px;
      border-left: 3px solid var(--green-accent);
    }
    .summary-item .arrow { color: var(--green-accent); font-weight: 700; flex-shrink: 0; }
    .summary-item span { font-size: 13.5px; color: var(--forest); line-height: 1.45; }

    /* ─── RESOURCE CARDS ─── */
    .resource-grid { display: flex; flex-direction: column; gap: 12px; margin-top: 10px; }
    .resource-card {
      display: flex;
      flex-direction: column;
      background: #fff;
      border: 1.5px solid var(--sand);
      border-radius: 10px;
      padding: 16px 18px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .resource-card:hover { border-color: var(--green-accent); box-shadow: var(--shadow-sm); }
    .resource-card-top { display: flex; gap: 16px; align-items: flex-start; width: 100%; }
    .resource-card-chevron {
      margin-left: auto;
      color: var(--forest-mid);
      transition: transform 0.2s;
      flex-shrink: 0;
    }
    .resource-card.open .resource-card-chevron { transform: rotate(180deg); }
    .resource-icon { font-size: 24px; flex-shrink: 0; margin-top: 2px; }
    .resource-card h4 { font-size: 15px; font-weight: 600; color: var(--forest); margin-bottom: 3px; }
    .resource-card p { font-size: 13px; color: var(--forest-mid); line-height: 1.4; }
    .resource-card-body {
      padding-top: 12px;
      margin-top: 4px;
      border-top: 1px solid var(--sand);
      font-size: 13px;
      color: var(--forest-mid);
      line-height: 1.55;
      animation: fadeIn 0.25s ease;
    }
    .resource-card-body ul {
      list-style: none;
      margin-top: 8px;
    }
    .resource-card-body ul li {
      font-size: 13px;
      color: var(--forest-mid);
      padding: 4px 0;
      padding-left: 18px;
      position: relative;
      line-height: 1.45;
    }
    .resource-card-body ul li::before {
      content: '•';
      position: absolute;
      left: 4px;
      color: var(--green-accent);
      font-weight: 700;
    }
    .resource-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-top: 12px;
      padding: 8px 14px;
      background: var(--forest);
      color: #fff;
      font-size: 13px;
      font-weight: 600;
      border-radius: 6px;
      text-decoration: none;
      transition: background 0.2s;
    }
    .resource-link:hover {
      background: var(--forest-mid);
    }

    /* ─── HOMEWORK HINT ─── */
    .hw-hint-toggle {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      margin-top: 8px;
      background: none;
      border: none;
      font-family: 'Inter Tight', sans-serif;
      font-size: 12px;
      font-weight: 500;
      color: var(--forest-mid);
      cursor: pointer;
      padding: 0;
      transition: color 0.2s;
    }
    .hw-hint-toggle:hover { color: var(--forest); }
    .hw-hint-toggle svg { transition: transform 0.2s; }
    .hw-hint-toggle.open svg { transform: rotate(90deg); }
    .hw-hint-body {
      margin-top: 8px;
      font-size: 12.5px;
      color: var(--forest-mid);
      line-height: 1.5;
      padding: 10px 12px;
      background: rgba(255,255,255,0.7);
      border-radius: 6px;
      border-left: 2px solid var(--sage);
    }

    /* ─── PROGRESS SAVED TOAST ─── */
    .save-indicator {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: var(--forest);
      color: #fff;
      padding: 10px 16px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 8px;
      box-shadow: var(--shadow-md);
      animation: slideInUp 0.3s ease;
      z-index: 100;
    }
    @keyframes slideInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* ─── CLEAR PROGRESS BUTTON ─── */
    .clear-progress-row {
      display: flex;
      justify-content: center;
      margin-top: 24px;
      padding-top: 20px;
      border-top: 1px solid var(--sand);
    }

    /* ─── EXPORT SECTION ─── */
    .export-section {
      margin-top: 32px;
      padding-top: 24px;
      border-top: 2px solid var(--sage);
    }
    .export-card {
      background: linear-gradient(135deg, var(--forest) 0%, var(--forest-mid) 100%);
      border-radius: var(--radius);
      padding: 28px;
      color: #fff;
      text-align: center;
    }
    .export-card h3 {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 24px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 8px;
    }
    .export-card p {
      font-size: 14px;
      opacity: 0.9;
      margin-bottom: 20px;
      line-height: 1.5;
    }
    .export-btn-row {
      display: flex;
      gap: 12px;
      justify-content: center;
      flex-wrap: wrap;
    }
    .export-btn {
      background: #fff;
      color: var(--forest);
      font-family: 'Inter Tight', sans-serif;
      font-size: 14px;
      font-weight: 600;
      padding: 12px 24px;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s;
    }
    .export-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    .export-btn-secondary {
      background: transparent;
      color: #fff;
      border: 2px solid rgba(255,255,255,0.5);
    }
    .export-btn-secondary:hover {
      background: rgba(255,255,255,0.1);
      border-color: #fff;
    }

    /* ─── FOOTER ─── */
    .footer {
      text-align: center;
      padding: 40px 0 20px;
      font-size: 0.85rem;
      color: var(--forest-mid);
      border-top: 1px solid var(--warm);
      margin-top: 40px;
    }
    .footer a {
      color: var(--forest-mid);
      text-decoration: none;
    }
    .footer a:hover {
      text-decoration: underline;
    }

    /* ─── PRINT-SPECIFIC STYLES ─── */
    @media print {
      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      body {
        background: #fff !important;
        margin: 0;
        padding: 0;
      }
      /* Hide ALL web UI elements */
      .app-shell,
      .header,
      .intro-section,
      .survey-prompt,
      .progress-track,
      .accordion-section,
      .card,
      .clear-progress-row,
      .save-indicator,
      .export-section,
      .modal-overlay {
        display: none !important;
      }
      /* Show only the print view */
      .print-view {
        display: block !important;
        max-width: 100%;
        margin: 0;
        padding: 40px 50px;
        font-family: 'Inter Tight', Georgia, serif;
        font-size: 11pt;
        line-height: 1.5;
        color: #2d5a3d;
      }
      .print-header {
        text-align: center;
        margin-bottom: 28px;
        padding-bottom: 20px;
        border-bottom: 2px solid #2d5a3d;
      }
      .print-header-logo {
        max-width: 180px;
        height: auto;
        margin-bottom: 12px;
      }
      .print-header h1 {
        font-family: 'Barlow Condensed', sans-serif;
        font-size: 28pt;
        font-weight: 800;
        color: #2d5a3d;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin: 0 0 8px 0;
      }
      .print-header .print-date {
        font-size: 10pt;
        color: #5a7a62;
        margin: 0;
      }
      .print-preamble {
        background: #f5f7f4;
        border-left: 4px solid #2d5a3d;
        padding: 16px 20px;
        margin-bottom: 24px;
        font-size: 10.5pt;
        line-height: 1.6;
      }
      .print-preamble p {
        margin: 0;
      }
      .print-section {
        margin-bottom: 20px;
        page-break-inside: avoid;
      }
      .print-section-title {
        font-family: 'Barlow Condensed', sans-serif;
        font-size: 14pt;
        font-weight: 700;
        color: #2d5a3d;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 12px;
        padding-bottom: 6px;
        border-bottom: 1px solid #d4cdc1;
      }
      .print-action-item {
        display: flex;
        gap: 12px;
        margin-bottom: 12px;
        padding: 10px 14px;
        background: #edf7ee;
        border-left: 3px solid #4caf50;
        page-break-inside: avoid;
      }
      .print-action-num {
        font-family: 'Barlow Condensed', sans-serif;
        font-weight: 700;
        font-size: 12pt;
        color: #4caf50;
        flex-shrink: 0;
      }
      .print-action-content strong {
        display: block;
        font-size: 11pt;
        margin-bottom: 2px;
      }
      .print-action-content span {
        font-size: 10pt;
        color: #3d7a52;
      }
      .print-watch-item {
        margin-bottom: 10px;
        padding: 10px 14px;
        background: #f9f7f4;
        border-left: 3px solid #b8bfad;
        font-size: 10pt;
        page-break-inside: avoid;
      }
      .print-watch-item strong {
        display: block;
        margin-bottom: 2px;
        color: #2d5a3d;
      }
      .print-watch-item span {
        color: #5a7a62;
      }
      .print-resources {
        page-break-before: auto;
      }
      .print-resource-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
      }
      .print-resource-item {
        padding: 10px 12px;
        background: #f5f7f4;
        border-radius: 6px;
        font-size: 9.5pt;
        page-break-inside: avoid;
      }
      .print-resource-item strong {
        display: block;
        font-size: 10pt;
        color: #2d5a3d;
        margin-bottom: 2px;
      }
      .print-resource-item span {
        color: #5a7a62;
        font-size: 9pt;
      }
      .print-footer {
        margin-top: 30px;
        padding-top: 16px;
        border-top: 1px solid #d4cdc1;
        text-align: center;
        font-size: 10pt;
        color: #5a7a62;
      }
      .print-footer strong {
        color: #2d5a3d;
      }
    }

    /* ─── PRINT VIEW (hidden by default, shown in print) ─── */
    .print-view {
      display: none;
    }

    /* ─── EMAIL GATE MODAL ─── */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: flex-start;
      justify-content: center;
      z-index: 1000;
      padding: 60px 20px 20px;
      overflow-y: auto;
      animation: fadeIn 0.2s ease;
    }
    .modal {
      background: #fff;
      border-radius: var(--radius);
      max-width: 440px;
      width: 100%;
      padding: 32px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.2);
      animation: slideUp 0.3s ease;
      position: relative;
    }
    .modal-close-btn {
      position: absolute;
      top: 12px;
      right: 12px;
      background: none;
      border: none;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--forest-mid);
      transition: all 0.2s;
    }
    .modal-close-btn:hover {
      background: var(--warm);
      color: var(--forest);
    }
    .modal-header {
      text-align: center;
      margin-bottom: 24px;
    }
    .modal-header h3 {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 28px;
      font-weight: 700;
      color: var(--forest);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
    }
    .modal-header p {
      font-size: 14px;
      color: var(--forest-mid);
      line-height: 1.5;
    }
    .modal-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .form-row {
      display: flex;
      gap: 12px;
    }
    .form-row > .form-group {
      flex: 1;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .form-group label {
      font-size: 13px;
      font-weight: 600;
      color: var(--forest);
    }
    .form-group input {
      padding: 12px 14px;
      border: 1.5px solid var(--sand);
      border-radius: 8px;
      font-family: 'Inter Tight', sans-serif;
      font-size: 15px;
      color: var(--forest);
      transition: border-color 0.2s;
    }
    .form-group input:focus {
      outline: none;
      border-color: var(--forest);
    }
    .form-group input::placeholder {
      color: var(--sage);
    }
    .modal-submit {
      background: var(--forest);
      color: #fff;
      font-family: 'Inter Tight', sans-serif;
      font-size: 15px;
      font-weight: 600;
      padding: 14px 24px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.2s;
      margin-top: 8px;
    }
    .modal-submit:hover {
      background: var(--forest-mid);
    }
    .modal-submit:disabled {
      background: var(--sage);
      cursor: not-allowed;
    }
    .modal-close {
      position: absolute;
      top: 16px;
      right: 16px;
      background: none;
      border: none;
      font-size: 24px;
      color: var(--forest-mid);
      cursor: pointer;
      padding: 4px;
      line-height: 1;
    }
    .modal-close:hover {
      color: var(--forest);
    }
    .modal-footer {
      margin-top: 16px;
      text-align: center;
    }
    .modal-footer button {
      background: none;
      border: none;
      font-size: 13px;
      color: var(--forest-mid);
      cursor: pointer;
      text-decoration: underline;
    }
    .modal-footer button:hover {
      color: var(--forest);
    }
    .form-error {
      color: #c0392b;
      font-size: 12px;
      margin-top: 4px;
    }
    .form-success {
      text-align: center;
      padding: 20px 0;
    }
    .form-success .checkmark {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: var(--green-accent-bg);
      border: 3px solid var(--green-accent);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
      font-size: 28px;
    }
    .form-success p {
      font-size: 14px;
      color: var(--forest-mid);
      margin-bottom: 20px;
    }
    /* ─── EMAIL DRAFT SECTION ─── */
    .email-draft-section {
      margin-top: 32px;
      padding-top: 24px;
      border-top: 2px solid var(--sage);
      text-align: left;
    }
    .email-draft-section h3 {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 24px;
      font-weight: 700;
      color: var(--forest);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 6px;
    }
    .email-draft-section > p {
      font-size: 14px;
      color: var(--forest-mid);
      line-height: 1.5;
      margin-bottom: 20px;
    }
    .email-step-label {
      font-family: 'Barlow Condensed', sans-serif;
      font-weight: 700;
      font-size: 13px;
      color: var(--forest-mid);
      letter-spacing: 1.5px;
      text-transform: uppercase;
      margin-bottom: 10px;
      margin-top: 20px;
    }
    .email-option-row {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
    .email-option-btn {
      flex: 1;
      min-width: 140px;
      font-family: 'Inter Tight', sans-serif;
      font-size: 14px;
      font-weight: 600;
      padding: 13px 16px;
      border-radius: 8px;
      border: 2px solid var(--sand);
      background: #fff;
      color: var(--forest);
      cursor: pointer;
      transition: all 0.2s;
      text-align: center;
    }
    .email-option-btn:hover {
      border-color: var(--forest-light);
      background: var(--warm);
    }
    .email-option-btn.selected {
      border-color: var(--green-accent);
      background: var(--green-accent-bg);
      color: var(--forest);
    }
    .email-draft-card {
      background: #fff;
      border: 1.5px solid var(--sand);
      border-radius: var(--radius);
      padding: 24px;
      margin-top: 20px;
      animation: slideUp 0.35s cubic-bezier(.4,0,.2,1);
    }
    .email-draft-subject {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 16px;
      background: var(--forest-pale);
      border-radius: 8px;
      margin-bottom: 16px;
    }
    .email-draft-subject strong {
      font-size: 13px;
      color: var(--forest-mid);
      flex-shrink: 0;
    }
    .email-draft-subject span {
      font-size: 14px;
      color: var(--forest);
      font-weight: 500;
    }
    .email-draft-body {
      font-family: 'Inter Tight', Georgia, serif;
      font-size: 14px;
      line-height: 1.7;
      color: var(--forest);
      padding: 20px;
      background: #fafaf8;
      border: 1px solid var(--sand);
      border-radius: 8px;
      white-space: pre-wrap;
    }
    .email-draft-actions {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-top: 16px;
    }
    .email-share-card {
      margin-top: 20px;
      padding: 20px;
      background: var(--forest-pale);
      border: 1.5px solid #c5dece;
      border-radius: var(--radius);
    }
    .email-share-card h4 {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 18px;
      font-weight: 700;
      color: var(--forest);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 6px;
    }
    .email-share-card > p {
      font-size: 13px;
      color: var(--forest-mid);
      margin-bottom: 12px;
      line-height: 1.5;
    }
    .email-share-body {
      font-family: 'Inter Tight', Georgia, serif;
      font-size: 13.5px;
      line-height: 1.65;
      color: var(--forest);
      padding: 16px;
      background: #fff;
      border: 1px solid var(--sand);
      border-radius: 8px;
      white-space: pre-wrap;
    }

    /* Print: hide email draft section */
    @media print {
      .email-draft-section {
        display: none !important;
      }
    }

    /* Print: show email in print view */
    .print-email-section {
      display: none;
    }
    @media print {
      .print-email-section {
        display: block;
      }
      .print-email-subject {
        font-size: 11pt;
        font-weight: 600;
        margin-bottom: 8px;
        color: #2d5a3d;
      }
      .print-email-body {
        font-size: 10pt;
        line-height: 1.6;
        color: #2d5a3d;
        padding: 12px 16px;
        background: #f9f9f7;
        border: 1px solid #d4cdc1;
        border-radius: 6px;
        white-space: pre-wrap;
      }
    }
  `}</style>
);

/* ─── ACTION MAP (collected on Yes answers) ─────────────────────────────── */
const ACTION_MAP = {
  1: { id: "q1", title: "Keep devices at school", detail: "Push for devices to stay at school through at least 5th grade — ideally through middle school." },
  2: { id: "q2", title: "No devices during non-instructional time", detail: "Advocate for a clear policy: no device use during arrival, dismissal, recess, or downtime." },
  3: { id: "q3", title: "Remove screentime as reward", detail: "Advocate for eliminating screentime and screen-based activities as a reward or choice time option. Offer to help supply non-screen alternatives." },
  "4-both": { id: "q4-both", title: "Restrict YouTube, chatbots & browser", detail: "Remove YouTube and generative AI chatbot access. Restrict the browser — push for whitelisting so only approved sites are accessible." },
  "4-youtube": { id: "q4-youtube", title: "Remove YouTube access", detail: "Push to remove YouTube from student devices. Even 'educational' videos lead to endless autoplay rabbit holes." },
  "4-ai": { id: "q4-ai", title: "Remove generative AI chatbot access", detail: "Push to remove access to ChatGPT, Gemini, and other generative AI chatbots that can do students' work for them." },
  5: { id: "q5", title: "Request app transparency", detail: "Request a full list of all apps/platforms used, the criteria for evaluating them, and how apps get integrated into curriculum." },
  6: { id: "q6", title: "Track and limit screentime", detail: "Ask the district to track and limit daily screentime, and to communicate those limits to parents." },
  7: { id: "q7", title: "Understand device vs. analog use", detail: "Talk to your child's teacher to understand how devices are used — are kids reading physical books or screens? Writing by hand or typing? Researching in books or just using search engines?" },
};

/* ─── IDK ACTION MAP (collected on "I don't know" answers) ─── */
const IDK_ACTION_MAP = {
  1: { id: "q1-idk", title: "Find out if devices go home", detail: "Ask your child's teacher or the front office whether students bring devices home — and if so, starting in which grade.", nextStep: "If they do, push for devices to stay at school — especially through elementary and ideally middle school. If they don't yet, find out when that changes and consider pushing to delay it." },
  2: { id: "q2-idk", title: "Find out about device use during downtime", detail: "Ask your child's teacher whether devices are allowed during arrival, dismissal, recess, or other non-instructional times.", nextStep: "If they are, advocate for a clear policy: no device use during non-instructional times. Kids need those unstructured moments for socializing and real breaks. If they aren't, great — but keep an eye on it, since unstructured device time is one of the easiest things to creep back in." },
  3: { id: "q3-idk", title: "Find out if screens are used as rewards", detail: "Ask your child or their teacher whether games, apps, or screen time are ever used as a reward or choice-time activity.", nextStep: "If so, advocate for eliminating screen-based rewards and offer to help supply non-screen alternatives like books, games, or art supplies. If not, that's good — ask your child occasionally to make sure it stays that way." },
  4: { id: "q4-idk", title: "Find out about YouTube & generative AI chatbot access", detail: "Ask the school whether students can access YouTube, generative AI chatbots (like ChatGPT or Gemini), or an open web browser on their devices.", nextStep: "If they can, push for YouTube and chatbot access to be removed and for the browser to be restricted — ideally whitelisted so only approved sites are accessible. If they can't, good — but new tools get added quickly, so check in periodically." },
  5: { id: "q5-idk", title: "Request the approved app list", detail: "Ask the district for a full list of approved apps and platforms, including how they're evaluated and who approves them.", nextStep: "If they can't provide one, that's a transparency gap worth raising. Every app collects data, and parents deserve to know what tools their kids are using. If they can, review it and make sure you understand how new apps get added." },
  6: { id: "q6-idk", title: "Find out how much daily screentime your child has", detail: "Ask the teacher or district how much time students spend on devices each day — and whether anyone is tracking it.", nextStep: "If they're not tracking it, push for daily limits and transparent reporting. You can't manage what you don't measure. If they are, find out what the limits are and whether they're being enforced." },
  7: { id: "q7-idk", title: "Find out how devices vs. analog tools are balanced", detail: "Ask your child's teacher how much work is done on devices versus with paper, pencil, and physical books.", nextStep: "If analog activities like handwriting, reading physical books, or hands-on research are being replaced by screens, that's where you can push for change. If there's a healthy balance, great — stay engaged so it stays that way." },
};

/* ─── QUESTION DEFINITIONS ──────────────────────────────────────────────── */
const QUESTIONS = {
  1: {
    text: "Do students bring devices home in elementary school?",
    sub: null,
    actionText: "Push for devices to stay at school through at least 5th grade — ideally through middle school. Ask the school to limit or eliminate home device use.",
    action: (
      <div className="action-block">
        <div className="action-block-header"><span className="action-tag">Action</span></div>
        <p><strong>Push for devices to stay at school through at least 5th grade — ideally through middle school.</strong></p>
        <p style={{ marginTop: 10 }}><strong>Why this matters:</strong> When devices come home, they add unsupervised screen time, compete with family time and physical play, and put parents in the position of policing yet another screen. Homework in elementary school should be paper and pencil — there's no reason it needs to involve a screen. Keeping school devices at school creates a clearer boundary and one less thing to manage at home.</p>
        <p style={{ marginTop: 10 }}>If your school already sends devices home, ask what the rationale is and request that devices be kept at school through elementary school and only sent home on a limited, as-needed basis in middle school.</p>
      </div>
    ),
    watchFor: "Good — devices staying at school is a strong baseline. Find out when that changes — what grade do devices start going home? If it's middle school, consider pushing to delay it or limit the number of days per week they come home.",
  },
  2: {
    text: "Does the school allow device use during arrival, dismissal, recess, or downtime?",
    sub: null,
    actionText: "Advocate for a clear policy: no device use during non-instructional times.",
    action: (
      <div className="action-block">
        <div className="action-block-header"><span className="action-tag">Action</span></div>
        <p>Advocate for a clear policy: <strong>no device use during non-instructional times.</strong></p>
        <p style={{ marginTop: 10 }}><strong>Why this matters:</strong> Allowing device use during transitional or downtime moments prevents kids from socializing, moving their bodies, and getting a true mental break. These unstructured moments are where friendships form and social skills develop. When devices fill that space, kids lose those opportunities and screens become the default way to pass time.</p>
      </div>
    ),
    watchFor: "Good — unstructured device time is one of the easiest things to creep back in. If you ever notice kids on devices during recess or waiting periods, that's a sign the policy needs reinforcing.",
  },
  3: {
    text: "Does the school use screentime or games as a reward?",
    sub: "This includes letting students play games or use apps as a treat for good behavior or finishing work early.",
    actionText: "Advocate for eliminating screentime and screen-based activities as a reward or choice time option. Offer to help supply non-screen alternatives.",
    action: (
      <div className="action-block">
        <div className="action-block-header"><span className="action-tag">Action</span></div>
        <p><strong>Advocate for eliminating screentime and screen-based activities as a reward or option for choice time.</strong></p>
        <p style={{ marginTop: 10 }}><strong>Why this matters:</strong> Using screens as a reward teaches kids that devices are the ultimate prize — something to earn and crave. It elevates screens above other activities and undermines efforts to set healthy boundaries. Free time at school is a chance for kids to read, draw, build, or talk with friends — not default to a screen.</p>
        <p style={{ marginTop: 10 }}>If non-screen alternatives aren't available in the classroom, offer to help. Donate books, games, or art supplies — or work with your PTO/HSA to fund them. Removing the excuse makes it easier to change the policy.</p>
      </div>
    ),
    watchFor: "Good — using screens as a reward is a hard habit for teachers to break once it starts. Ask your child occasionally whether games or apps ever come up as a treat in class.",
  },
  4: {
    text: "Does the school allow access to YouTube or generative AI chatbots (e.g. ChatGPT, Gemini)?",
    sub: null,
    multiOption: true,
    options: [
      { value: "both", label: "Yes, both" },
      { value: "youtube", label: "YouTube only" },
      { value: "ai", label: "Generative AI only" },
      { value: "neither", label: "Neither" },
      { value: "idk", label: "I don't know" },
    ],
    actionText: "Remove YouTube and generative AI chatbot access from student devices. Restrict the internet browser. Consider pushing for whitelisting — only approved sites should be accessible.",
    actions: {
      both: (
        <div className="action-block">
          <div className="action-block-header"><span className="action-tag">Action</span></div>
          <ul>
            <li>Remove YouTube access from student devices</li>
            <li>Remove generative AI chatbot access (ChatGPT, Gemini, etc.)</li>
            <li>Restrict the internet browser — push for <strong>whitelisting</strong> so only approved sites are accessible</li>
          </ul>
          <p style={{ marginTop: 10 }}><strong>Why this matters:</strong> YouTube is a rabbit hole — even "educational" videos lead to endless recommendations via autoplay, often irrelevant and sometimes inappropriate. Generative AI chatbots can do students' work for them, bypassing the learning process entirely. An open browser is an open door. Whitelisting ensures kids can only access what's been intentionally approved.</p>
        </div>
      ),
      youtube: (
        <div className="action-block">
          <div className="action-block-header"><span className="action-tag">Action</span></div>
          <p><strong>Push to remove YouTube access from student devices.</strong></p>
          <p style={{ marginTop: 10 }}><strong>Why this matters:</strong> YouTube is a rabbit hole — even "educational" videos lead to endless recommendations via autoplay, often irrelevant and sometimes inappropriate. It's a major distraction and should be blocked entirely. If teachers need to show a video, they can use a shared screen.</p>
          <p style={{ marginTop: 10 }}>Good that generative AI chatbots are already restricted — make sure that stays in place as new AI tools emerge.</p>
        </div>
      ),
      ai: (
        <div className="action-block">
          <div className="action-block-header"><span className="action-tag">Action</span></div>
          <p><strong>Push to remove generative AI chatbot access (ChatGPT, Gemini, etc.) from student devices.</strong></p>
          <p style={{ marginTop: 10 }}><strong>Why this matters:</strong> Generative AI chatbots can do students' work for them — writing essays, solving math problems, answering questions — completely bypassing the learning process. Students need to develop these skills themselves, not outsource them to a chatbot.</p>
          <p style={{ marginTop: 10 }}>Good that YouTube is already blocked — make sure it stays that way.</p>
        </div>
      ),
      neither: null,
    },
    watchFor: "Good — but new apps and AI tools get added quickly. Ask your child what sites or tools they use in class. If something new shows up, it's worth checking whether it was formally approved.",
  },
  5: {
    text: "Are you aware of which apps and platforms are approved and used at your school?",
    sub: "This includes the full list of apps and platforms, which grade levels use them, and how the approval process works.",
    reverseLogic: true, // Yes = good, No = action needed
    actionText: "Request a full list of all apps and platforms the district uses, what criteria they use to evaluate them, and how apps get integrated into curriculum.",
    action: (
      <div className="action-block">
        <div className="action-block-header"><span className="action-tag">Action</span></div>
        <p><strong>Request a full list of all apps and platforms the district uses, what criteria they use to evaluate them, and how apps get integrated into curriculum.</strong></p>
        <p style={{ marginTop: 10 }}><strong>Why this matters:</strong> Every app collects data, and not all apps are created equal. Without a clear approval process, random tools creep into classrooms based on a single teacher's preference or a vendor's sales pitch. Transparency creates accountability and helps parents understand exactly what tools their kids are using — and whether those tools belong in the classroom.</p>
      </div>
    ),
    watchFor: "Great — you're ahead of the game! Make sure this information is publicly accessible for all parents and that you understand how new apps and platforms get added.",
  },
  6: {
    text: "Do you know how much time your child spends on a device per day?",
    sub: null,
    reverseLogic: true, // Yes = good, No = action needed
    actionText: "Ask the district to track and limit daily screentime, and to communicate those limits to parents.",
    action: (
      <div className="action-block">
        <div className="action-block-header"><span className="action-tag">Action</span></div>
        <p><strong>Ask the district to track and limit daily screentime.</strong> Request that screentime data be reported to parents and that clear limits are set by grade level.</p>
        <p style={{ marginTop: 10 }}><strong>Why this matters:</strong> You can't manage what you don't measure. If the school doesn't track screentime, no one really knows how much time kids are spending on devices — and it's easy for that number to creep up. Clear limits and transparent reporting help parents make informed decisions and hold the school accountable.</p>
      </div>
    ),
    watchFor: "Good — screentime awareness is the foundation. If your school doesn't already have daily limits in place, push for them. And if they do, make sure they're actually being enforced.",
  },
  7: {
    text: "Do you know how much of your child's schoolwork is done on a device vs. with paper and pencil — things like reading, writing, and research?",
    sub: null,
    reverseLogic: true, // Yes = good, No = action needed
    actionText: "Talk to your child's teacher to understand how devices are used — are kids reading physical books or screens? Writing by hand or typing? Researching in books or just using search engines?",
    action: (
      <div className="action-block">
        <div className="action-block-header"><span className="action-tag">Action</span></div>
        <p><strong>Talk to your child's teacher and ask to understand how devices are used in class.</strong></p>
        <p style={{ marginTop: 10 }}>Ask them specifically: Are kids reading physical books or just on a screen? Are they writing with paper and pencil or just typing? Are they learning to research in books or just using search engines?</p>
        <p style={{ marginTop: 10 }}><strong>Why this matters:</strong> Their answers will help inform your next steps. If valuable analog activities are being replaced by screens — like handwriting, reading physical books, or learning to use reference materials — that's where you can push for change.</p>
      </div>
    ),
    watchFor: "Great — transparency is the first step. If you see activities being done on a device that would be better done by hand — like reading, writing, or note-taking — push for change.",
  },
};

/* ─── HOMEWORK ITEMS ─── */
const HW_ITEMS = [
  { id: "policy", label: "School board policy / handbook rules", desc: "The official rules governing how devices are used, stored, and managed at school.", hint: "Check the district website under Policies, School Board, or Board of Education.", notFound: "That's actually useful to know — it means there may not be a clear, accessible policy (which is worth raising)." },
  { id: "philosophy", label: "Technology philosophy or position statement", desc: "The district's stated beliefs about the role of technology in education.", hint: "Could be found on your district's website under Curriculum, Academics, or About. Try searching the site for \"screen time\" or \"technology vision\" or \"technology position statement.\" If nothing comes up, that itself is useful information.", notFound: "Most districts don't publish one. If they can't articulate their philosophy, that's a conversation worth starting." },
  { id: "curriculum", label: "Digital literacy curriculum", desc: "What students are taught about using technology responsibly and safely.", hint: "Look under Curriculum or Instruction on the district site. If you can't find it, try emailing the curriculum director — they'll know whether one exists or if it's something the district hasn't adopted yet.", notFound: "Not unusual — many districts haven't formalized this yet." },
  { id: "ai", label: "AI guidelines & policy", desc: "Rules about whether and how AI tools like ChatGPT can be used by students.", hint: "This is newer territory for most districts. Many schools are still figuring this out, so you may hear \"we don't have one yet.\" Hopefully — they're working on one! More on that later.", notFound: "No surprise here — most districts are still figuring this out. If they're not, they should be." },
];

/* ─── RESOURCES ─── */
const RESOURCES = [
  {
    id: "digital-delusion",
    icon: "📖",
    title: "The Digital Delusion — Dr. Jared Cooney Horvath",
    desc: "Must read. The most important book for understanding why ed tech isn't working the way we've been told.",
    link: "https://www.amazon.com/Digital-Delusion-Classroom-Technology-Learning/dp/B0G5622DQQ",
    body: (
      <>
        <p>Neuroscientist Dr. Jared Cooney Horvath dismantles the myths driving ed tech adoption — from "digital natives" to "personalized learning" — using peer-reviewed research and clear, accessible language.</p>
        <p style={{ marginTop: 8 }}>This is the single best resource for any parent or educator who wants to understand <strong>why</strong> so much classroom technology fails to improve learning, and what the science actually says about how kids learn best.</p>
        <p style={{ marginTop: 8 }}><em>If you read one thing, make it this.</em></p>
      </>
    ),
  },
  {
    id: "edtech-triangle",
    icon: "🔺",
    title: "The EdTech Triangle",
    desc: "A framework for evaluating classroom technology — from Transformative to Disruptive.",
    link: "https://drive.google.com/file/d/1gwpP4IqQfpqLRJUxFL7ZJyMS3zNXj-gd/view?usp=sharing",
    body: (
      <>
        <p>This research-based framework classifies educational technology into four tiers: Transformative, Supportive, Restrictive, and Disruptive.</p>
        <ul>
          <li><strong>Transformative:</strong> coding, robotics, animation, specialized tools for students with disabilities</li>
          <li><strong>Disruptive:</strong> unrestricted cell phones, screen-based rewards, unmanaged free screen time</li>
        </ul>
        <p style={{ marginTop: 8 }}>Use this to evaluate where your school's tech use falls — and where to push for change.</p>
      </>
    ),
  },
  {
    id: "7-core-values",
    icon: "📐",
    title: "7 Core Values for Classroom Technology",
    desc: "Foundational principles for responsible tech integration in schools.",
    link: "https://drive.google.com/file/d/10R-v-Z57monlEwumzznH_9rOIo402eS1/view?usp=sharing",
    body: (
      <>
        <p>A framework from ScreenStrong establishing seven principles for responsible technology use in schools:</p>
        <ul>
          <li>Focus on human connection first — teacher interaction primary, peer interaction secondary, digital tertiary</li>
          <li>Use technology only when clear learning goals are established</li>
          <li>Prefer common screens (smartboards) over personal devices</li>
          <li>Preserve handwriting, kinesthetic learning, and time in nature</li>
        </ul>
      </>
    ),
  },
  {
    id: "edtech-toolkit",
    icon: "🧰",
    title: "EdTech Toolkit for Parents",
    desc: "Practical guide with templates for communicating with schools about technology.",
    link: "https://drive.google.com/file/d/1XJ2aYT5VoSwWHiaPb2El5MJgdjLDiYCM/view?usp=sharing",
    body: (
      <>
        <p>A hands-on toolkit with sections on opting out of EdTech, understanding related harms, and templates for communicating with schools.</p>
        <ul>
          <li>Email templates for parent engagement</li>
          <li>FAQs about student data privacy</li>
          <li>Guidance on navigating school technology policies</li>
        </ul>
      </>
    ),
  },
  {
    id: "screenstrong-courses",
    icon: "🎓",
    title: "ScreenStrong Courses & Guides",
    desc: "The best independent, evidence-based resource for schools to teach students and parents about healthy technology use.",
    link: "https://screenstrong.org/products/",
    body: (
      <>
        <p>ScreenStrong offers ready-to-use educational resources for schools, including:</p>
        <ul>
          <li><strong>Student Education Course:</strong> Evidence-based curriculum teaching kids about the effects of screens on their brains, bodies, and relationships</li>
          <li><strong>Parent Education Course:</strong> Helps parents understand the research and set healthy boundaries at home</li>
          <li><strong>Family & Educator Guides:</strong> Practical tools for implementing screen-healthy practices in classrooms and households</li>
        </ul>
        <p style={{ marginTop: 8 }}>If your school is looking for a digital citizenship or screen awareness curriculum, this is the gold standard. It's independent, research-backed, and designed for real classroom use.</p>
      </>
    ),
  },
  {
    id: "scope-sequence",
    icon: "📋",
    title: "Technology Scope & Sequence (Skills by Grade)",
    desc: "Kids who can swipe through an iPad can't necessarily create a folder, format a document, or evaluate a website. This maps the real skills they should be learning.",
    link: "https://drive.google.com/file/d/1_DAPQDxVhlg6nDjVB-vaobDTpccjKFcn/view?usp=drive_link",
    body: (
      <>
        <p>There's a common assumption that today's kids are "digital natives" who intuitively understand technology. The reality is more complicated. While children are comfortable swiping through tablets, many lack foundational computer skills that previous generations learned through necessity: typing, organizing files, navigating operating systems, and troubleshooting problems.</p>
        <ul>
          <li>Maps specific transferable skills (typing, file management, online safety, digital citizenship) from K through 12</li>
          <li>Distinguishes between Beginning, Developing, and Secure at each grade level</li>
          <li>Aligned with ISTE standards, adopted or adapted by several state departments of education</li>
        </ul>
        <p style={{ marginTop: 8 }}>When schools default to simplified tablet interfaces or single-purpose apps, students miss opportunities to develop skills that directly affect academic independence and college/career readiness. This framework shows what intentional tech education actually looks like.</p>
      </>
    ),
  },
  {
    id: "edtech-report",
    icon: "📊",
    title: "The EdTech Report",
    desc: "Comprehensive research synthesis on technology in K-12 education.",
    link: "https://drive.google.com/file/d/1Gv1D84wXla5oWNYbic6VJ1YKgiydQAG3/view?usp=sharing",
    body: (
      <>
        <p>Evidence-based research from Everyschool.org on best practices for technology use in K-12 education.</p>
        <ul>
          <li>Teacher-directed instruction produces more growth than typical tech use</li>
          <li>1:1 laptop/tablet programs are among the least effective integration methods</li>
          <li>Includes detailed tables on appropriate tech use levels by grade</li>
        </ul>
      </>
    ),
  },
  {
    id: "jama-study",
    icon: "🔬",
    title: "JAMA Study: Screentime & Academics (2025)",
    desc: "Peer-reviewed research linking early screen time to lower academic achievement.",
    link: "https://drive.google.com/file/d/1q9KyrBNW8zaXC9pzC_8IpmXF4jm39RS0/view?usp=sharing",
    body: (
      <>
        <p>A longitudinal study published in JAMA Network Open examining the relationship between early childhood screen time and academic performance.</p>
        <ul>
          <li>Each additional hour of screen time associated with 9-10% lower odds of higher academic achievement</li>
          <li>Study of 3,322 grade 3 children over a 15-year period</li>
          <li>Recommends early interventions to reduce screen time</li>
        </ul>
      </>
    ),
  },
  {
    id: "nepc-white-paper",
    icon: "🏛️",
    title: "NEPC White Paper: EdTech & Data Privacy",
    desc: "Critical analysis of how commercial platforms collect and sell student data.",
    link: "https://drive.google.com/file/d/1dCq_rqgVBv1io6kV_W7xA4S3rW-pqXPQ/view?usp=sharing",
    body: (
      <>
        <p>A 2025 report on how commercial digital platforms operate as data-harvesting ecosystems.</p>
        <ul>
          <li>96% of EdTech applications used in schools sell children's data to third parties</li>
          <li>Average school district uses 2,739 different EdTech tools per year</li>
          <li>Recommends independent government review of platforms before implementation</li>
        </ul>
      </>
    ),
  },
  {
    id: "k5-research",
    icon: "🧒",
    title: "K-5 EdTech Research Studies",
    desc: "Neuroscience research on how technology affects children's developing brains.",
    link: "https://docs.google.com/document/d/1KI5PzsDNYV4UXjUQ0Rtnbp4HYkte4nwZ/edit?usp=sharing&ouid=110835801071972979371&rtpof=true&sd=true",
    body: (
      <>
        <p>Compiled research examining how different types of technology use affect children's developing brains.</p>
        <ul>
          <li>Book reading sparks more socially rich brain activity than screen-based storytelling</li>
          <li>Digital reading leads to more superficial engagement and weaker comprehension</li>
          <li>Using screens for emotional regulation may hinder healthy self-soothing development</li>
        </ul>
      </>
    ),
  },
  {
    id: "ipads-research",
    icon: "📱",
    title: "Research on iPads in the Classroom",
    desc: "Critical examination of 1:1 iPad initiatives and their educational outcomes.",
    link: "https://drive.google.com/file/d/1p_qMM6vY065i0Z4UGe9ZSiC1ywfHFC7d/view?usp=sharing",
    body: (
      <>
        <p>Analysis of 1:1 iPad programs examining educational outcomes and health concerns.</p>
        <ul>
          <li>OECD study: No appreciable improvements in reading, math, or science in countries heavily investing in classroom technology</li>
          <li>Students taking handwritten notes remember more than laptop note-takers</li>
          <li>College students spend 40% of class time using laptops for off-task activities</li>
        </ul>
      </>
    ),
  },
];

/* ─── EMAIL TEMPLATE ENGINE ─── */
function generateEmail({ recipient, actionItems }) {
  const topItems = actionItems.slice(0, 3);
  const hasMore = actionItems.length > 3;

  const greetings = {
    teacher: "Dear [Teacher's Name],",
    principal: "Dear [Principal's Name],",
    board: "Dear Members of the [District Name] School Board,",
  };

  const subjects = {
    teacher: "Questions about classroom technology use",
    principal: "Questions about school technology policies",
    board: "Parent inquiry regarding district technology policies",
  };

  const openings = {
    teacher: `I hope this finds you well. I'm the parent of [child's name] in your class, and I've been spending some time learning about how technology is being used in schools — not because I have concerns about your teaching, but because I want to be a more informed and helpful parent when it comes to the tech side of things.`,
    principal: `I'm the parent of a student at [Your School], and I've recently been looking into how educational technology is being used at the school level. I've been impressed by some of what I've learned, and I have a few questions I'd love to explore with you.`,
    board: `My name is [Your Name], and I'm a parent in the [District Name] district. I've been researching how educational technology is being used in our schools, and I'd like to respectfully raise a few questions for the board's consideration.`,
  };

  const buildAsks = () => {
    const asks = topItems.map((item) => {
      const askMap = {
        q1: "how the school handles devices going home — specifically whether there's flexibility to keep them at school, especially in the younger grades",
        "q1-idk": "whether students bring devices home, and if so, starting in which grade — and whether there's flexibility to keep them at school",
        q2: "whether there are guidelines around device use during non-instructional times like recess, arrival, and dismissal",
        "q2-idk": "whether devices are allowed during non-instructional times like arrival, dismissal, recess, or lunch — and if so, whether there are guidelines around that",
        q3: "how screen-based rewards or choice-time activities factor into the classroom — and whether non-screen alternatives could be prioritized",
        "q3-idk": "whether games, apps, or screen time are ever used as a reward or choice-time activity — and whether non-screen alternatives could be prioritized",
        "q4-both": "what access controls are in place for things like YouTube, generative AI chatbots, and open web browsing on student devices",
        "q4-youtube": "whether YouTube access on student devices could be restricted, since even 'educational' videos lead to autoplay rabbit holes",
        "q4-ai": "whether access to generative AI chatbots like ChatGPT and Gemini could be restricted on student devices",
        "q4-idk": "what access controls are in place for things like YouTube, generative AI chatbots, and open web browsing on student devices",
        q5: "whether there's a published list of approved apps and platforms, along with the criteria used to evaluate them",
        "q5-idk": "whether there's a full list of approved apps and platforms I could review, along with the criteria used to evaluate them",
        q6: "whether daily screen time is being tracked and whether there are guidelines for how much time students spend on devices each day",
        "q6-idk": "how much time students spend on devices each day, whether anyone is tracking it, and whether there are any daily limits in place",
        q7: "how the balance between device-based and hands-on learning works in practice — things like physical books vs. screens, handwriting vs. typing, and research skills",
        "q7-idk": "how much work is done on devices versus with paper, pencil, and physical books — and how the balance between digital and hands-on learning is managed",
      };
      return askMap[item.id] || item.detail.toLowerCase();
    });

    if (asks.length === 1) {
      return `Specifically, I'd love to understand ${asks[0]}.`;
    } else {
      return `Specifically, I'd love to understand:\n\n${asks.map(a => `- ${a}`).join('\n')}`;
    }
  };

  const moreNote = hasMore
    ? `\n\nI have a few other areas I've been thinking about as well, and would welcome the chance to discuss them.`
    : "";

  const closes = {
    teacher: `I'm not looking to add to your plate — I know teachers are pulled in a hundred directions. I'd just appreciate a few minutes to chat about this, whether by email, phone, or at pickup. I want to be a partner in making sure the tech our kids use is really working for them.\n\nThank you for everything you do.`,
    principal: `I'd welcome the chance to discuss these questions with you — even briefly. I'm approaching this as a partner, not a critic, and I believe small adjustments can make a big difference for our students.\n\nWould you be open to a brief meeting or phone call? I'm happy to work around your schedule.`,
    board: `I would appreciate the opportunity to discuss these questions further, whether through a meeting or at an upcoming public comment session. I believe that parent input on technology decisions helps ensure the best outcomes for students.\n\nThank you for your service to our community and your attention to this matter.`,
  };

  const body = `${greetings[recipient]}

${openings[recipient]}

${buildAsks()}${moreNote}

${closes[recipient]}

Sincerely,
[Your Name]
Parent at [Your School]`;

  return { subject: subjects[recipient], body };
}

// Generate the "rally other parents" message
function generateParentRallyMessage(actionItems) {
  const topItems = actionItems.slice(0, 3);

  const issueMap = {
    q1: "devices are going home with kids in elementary school — adding unsupervised screen time and making parents the tech police",
    q2: "kids are allowed to use devices during recess, lunch, and downtime — taking away the unstructured time they need for socializing and real breaks",
    q3: "screen time is being used as a reward in the classroom — which teaches kids that devices are the ultimate prize and undermines healthy boundaries",
    "q4-both": "students have access to YouTube and AI chatbots like ChatGPT on their school devices — with no meaningful restrictions",
    "q4-youtube": "students can access YouTube on school devices — even 'educational' videos lead to autoplay rabbit holes",
    "q4-ai": "students can access AI chatbots like ChatGPT on school devices — tools that can do their work for them",
    "q4-idk": "it's unclear what students can actually access on their devices — and the school isn't being transparent about it",
    q5: "there's no clear, public list of what apps and platforms are being used — or how they're evaluated before being put in front of our kids",
    "q5-idk": "there's no clear, public list of what apps and platforms are being used — or how they're evaluated before being put in front of our kids",
    q6: "nobody is tracking how much time kids actually spend on screens during the school day — and there are no limits in place",
    "q6-idk": "nobody is tracking how much time kids actually spend on screens during the school day — and there are no limits in place",
    q7: "screens are replacing hands-on learning — less handwriting, fewer physical books, less real research — and nobody's questioning whether that's actually better",
    "q7-idk": "screens are replacing hands-on learning — less handwriting, fewer physical books, less real research — and nobody's questioning whether that's actually better",
  };

  const issues = topItems
    .map((item) => issueMap[item.id] || item.detail.toLowerCase())
    .filter(Boolean);

  const issueText = issues.length === 1
    ? `Here's what I found: ${issues[0]}.`
    : `Here's what I found:\n\n${issues.map(i => `• ${i}`).join('\n')}`;

  return {
    subject: "Ed Tech / Screen Time at School",
    body: `Hey — I've been looking into how the devices are being used at school and I have a few concerns. Wanted to share and see what you thought.

${issueText}

Do you have thoughts on this? If you want to take a look yourself, this guide walks you through it — takes about 10 minutes and gives you a personalized action plan:

https://www.paunplugged.org/ed-tech-advocacy`,
  };
}

/* ─── STORAGE KEY ─── */
const STORAGE_KEY = "pa-unplugged-progress";

/* ─── SURVEY URL ─── */
const SURVEY_URL = "https://survey.paunplugged.org";

/* ─── MAIN COMPONENT ────────────────────────────────────────────────────── */
export default function ActionGuide() {
  // State
  const [hwStatus, setHwStatus] = useState({ philosophy: null, policy: null, curriculum: null, ai: null });
  const [hwHints, setHwHints] = useState({ philosophy: false, policy: false, curriculum: false, ai: false });
  const [is11, setIs11] = useState(null);
  const [answers, setAnswers] = useState({});
  const [openSections, setOpenSections] = useState({ prep: true, school: false, questions: false });
  const [openResource, setOpenResource] = useState(null);
  const [showSaveToast, setShowSaveToast] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailRecipient, setEmailRecipient] = useState(null); // 'teacher' | 'principal' | 'board' | 'parents'
  const [emailCopied, setEmailCopied] = useState(false);
  const printRef = useRef(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.hwStatus) setHwStatus(data.hwStatus);
        if (data.is11 !== undefined) setIs11(data.is11);
        if (data.answers) setAnswers(data.answers);
        if (data.openSections) setOpenSections(data.openSections);
      }
      // Restore email submitted state
      if (localStorage.getItem('pa-unplugged-email-submitted') === 'true') {
        setEmailSubmitted(true);
      }
    } catch (e) {
      console.log("Could not load saved progress");
    }
    setHasLoaded(true);
  }, []);

  // Save to localStorage on state change
  useEffect(() => {
    if (!hasLoaded) return;
    try {
      const data = { hwStatus, is11, answers, openSections };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

      // Show save toast briefly
      setShowSaveToast(true);
      const timer = setTimeout(() => setShowSaveToast(false), 1500);
      return () => clearTimeout(timer);
    } catch (e) {
      console.log("Could not save progress");
    }
  }, [hwStatus, is11, answers, openSections, hasLoaded]);

  // Helpers
  const toggleSection = (id) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const setHwItemStatus = (id, status) => {
    setHwStatus(prev => ({ ...prev, [id]: status }));
  };

  const toggleHint = (id, e) => {
    e.stopPropagation();
    setHwHints(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const answerQuestion = (qNum, val) => {
    setAnswers(prev => ({ ...prev, [qNum]: val }));
  };

  const clearProgress = () => {
    setHwStatus({ philosophy: null, policy: null, curriculum: null, ai: null });
    setIs11(null);
    setAnswers({});
    setOpenSections({ prep: true, school: false, questions: false });
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('pa-unplugged-email-submitted');
    setEmailSubmitted(false);
  };

  // Check if user has already submitted email (stored in localStorage)
  const hasSubmittedEmail = () => {
    try {
      return localStorage.getItem('pa-unplugged-email-submitted') === 'true';
    } catch (e) {
      return false;
    }
  };

  // Export to PDF via print
  const handlePrint = () => {
    window.print();
  };

  // Copy action items to clipboard
  const handleCopyActions = () => {
    performCopy();
  };

  // Actual copy function
  const performCopy = () => {
    const actionText = collectedActions.map((a, i) => `${i + 1}. ${a.title}\n   ${a.detail}${a.nextStep ? `\n   Then: ${a.nextStep}` : ''}`).join('\n\n');
    const watchText = Object.entries(answers)
      .filter(([qNum, val]) => {
        if (val === "idk") return false;
        const q = QUESTIONS[parseInt(qNum)];
        if (q.multiOption) return val === "neither";
        return q.reverseLogic ? val === true : val === false;
      })
      .map(([qNum]) => {
        const q = QUESTIONS[parseInt(qNum)];
        return `• ${q.text}\n  Watch for: ${q.watchFor}`;
      }).join('\n\n');

    const fullText = `PA UNPLUGGED - YOUR PERSONALIZED ACTION GUIDE
Generated on ${new Date().toLocaleDateString()}

${collectedActions.length > 0 ? `ACTION ITEMS (${collectedActions.length}):\n${actionText}` : 'No action items needed — your school is in good shape!'}

${watchText ? `\nTHINGS TO KEEP WATCHING:\n${watchText}` : ''}

---
Learn more at paunplugged.org`;

    navigator.clipboard.writeText(fullText).then(() => {
      alert('Action guide copied to clipboard!');
    });
  };

  // Send personalized guide email via API
  const sendGuideEmail = async (email, firstName) => {
    try {
      const resourceData = RESOURCES.map(r => ({
        icon: r.icon,
        title: r.title,
        desc: r.desc,
        link: r.link,
      }));

      const watchData = Object.entries(answers)
        .filter(([qNum, val]) => {
          if (val === "idk") return false;
          const num = parseInt(qNum);
          const q = QUESTIONS[num];
          if (q.multiOption) return val === "neither";
          return q.reverseLogic ? val === true : val === false;
        })
        .map(([qNum]) => QUESTIONS[parseInt(qNum)].watchFor);

      await fetch('/api/send-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          firstName: firstName || '',
          actionItems: collectedActions.map(a => ({
            title: a.title,
            detail: a.detail,
            nextStep: a.nextStep || null,
          })),
          watchItems: watchData,
          resources: resourceData,
        }),
      });
    } catch (err) {
      console.error('Failed to send guide email:', err);
    }
  };

  // Open Tally popup for email collection
  const handleEmailGate = () => {
    if (typeof window.Tally === 'undefined') {
      // Fallback: if Tally script hasn't loaded, just unlock results
      console.warn('Tally embed script not loaded');
      localStorage.setItem('pa-unplugged-email-submitted', 'true');
      setEmailSubmitted(true);
      return;
    }

    window.Tally.openPopup('QKV4a7', {
      layout: 'modal',
      hideTitle: false,
      overlay: true,
      autoClose: 2000,
      onSubmit: (payload) => {
        localStorage.setItem('pa-unplugged-email-submitted', 'true');
        setEmailSubmitted(true);

        // Extract email and name from Tally submission fields
        // Tally payload: { fields: [{ type, title, answer: { value } }] }
        console.log('Tally onSubmit payload:', JSON.stringify(payload, null, 2));
        const fields = payload?.fields || [];
        const emailField = fields.find(f => f.type === 'INPUT_EMAIL');
        const nameField = fields.find(f => f.type === 'INPUT_TEXT' && f.title?.toLowerCase().includes('first'));
        const email = emailField?.answer?.value;
        const firstName = nameField?.answer?.value || '';

        if (email) {
          sendGuideEmail(email, firstName);
        }
      },
    });
  };



  // Computed values
  const allHwAnswered = Object.values(hwStatus).every(v => v !== null);
  const prepComplete = allHwAnswered;
  const schoolComplete = is11 !== null;
  const questionsAnswered = Object.keys(answers).length;
  const questionsComplete = questionsAnswered === 7;

  const collectedActions = Object.entries(answers)
    .filter(([qNum, val]) => {
      const num = parseInt(qNum);
      const q = QUESTIONS[num];
      if (val === "idk") return true;
      // Q4 multi-option: action needed for "both", "youtube", "ai"
      if (q.multiOption) return val === "both" || val === "youtube" || val === "ai";
      return q.reverseLogic ? val === false : val === true;
    })
    .map(([qNum, val]) => {
      const num = parseInt(qNum);
      const q = QUESTIONS[num];
      if (val === "idk") return IDK_ACTION_MAP[num];
      if (q.multiOption) return ACTION_MAP[`${num}-${val}`];
      return ACTION_MAP[num];
    })
    .filter(Boolean);

  const watchItems = Object.entries(answers)
    .filter(([qNum, val]) => {
      if (val === "idk") return false;
      const num = parseInt(qNum);
      const q = QUESTIONS[num];
      // Q4 multi-option: "neither" = watch item
      if (q.multiOption) return val === "neither";
      return q.reverseLogic ? val === true : val === false;
    })
    .map(([qNum]) => ({
      qNum: parseInt(qNum),
      ...QUESTIONS[parseInt(qNum)]
    }));

  const getProgress = () => {
    let progress = 0;
    // Prep: 30%
    const hwAnswered = Object.values(hwStatus).filter(v => v !== null).length;
    progress += (hwAnswered / 4) * 30;
    // School: 10%
    if (is11 !== null) progress += 10;
    // Questions: 60%
    progress += (questionsAnswered / 7) * 60;
    return Math.round(progress);
  };

  const getSectionStatus = (section) => {
    if (section === "prep") return prepComplete ? "completed" : "active";
    if (section === "school") return schoolComplete ? "completed" : (prepComplete ? "active" : "");
    if (section === "questions") return questionsComplete ? "completed" : (schoolComplete ? "active" : "");
    return "";
  };

  const getSectionSummary = (section) => {
    if (section === "prep") {
      const found = Object.values(hwStatus).filter(v => v === "found").length;
      const notFound = Object.values(hwStatus).filter(v => v === "not_found").length;
      if (!allHwAnswered) return `${Object.values(hwStatus).filter(v => v !== null).length} of 4 reviewed`;
      return `${found} found, ${notFound} not found`;
    }
    if (section === "school") {
      if (is11 === null) return "Not started";
      return is11 ? "1:1 school" : "Shared devices";
    }
    if (section === "questions") {
      if (questionsAnswered === 0) return "Not started";
      return `${questionsAnswered} of 7 answered`;
    }
    return "";
  };

  return (
    <>
      <GlobalStyles />
      <div className="app-shell">
        <div className="header">
          <h1>PA Unplugged Ed Tech Advocacy Guide</h1>
          <p>Chart your own path.</p>
        </div>

        <div className="intro-section">
          <p>This guide will walk you through building a personalized action plan based on the technology landscape at your school. You'll identify what policies exist (or don't), answer key questions about how devices are used, and leave with clear next steps you can take.</p>
          <div className="survey-prompt">
            <span className="survey-prompt-icon">📊</span>
            <div className="survey-prompt-text">
              <strong>Before you start, take 5 minutes to complete our Ed Tech Survey.</strong>
              <span>We're building a public dashboard to show how parents across Pennsylvania feel about school technology. Your response helps us understand the full picture — and strengthens the case for change.</span>
            </div>
            <a
              href={SURVEY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-leaf btn-sm"
            >
              Take the survey →
            </a>
          </div>
        </div>

        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${getProgress()}%` }} />
        </div>

        {/* ─── STEP 1: PREP ─── */}
        <div className={`accordion-section ${getSectionStatus("prep")} ${openSections.prep ? "open" : ""}`}>
          <div className="accordion-header" onClick={() => toggleSection("prep")}>
            <div className="accordion-step-badge">
              {prepComplete ? "✓" : "1"}
            </div>
            <div className="accordion-header-text">
              <h3>Prep — Gather Documents</h3>
              <p>{getSectionSummary("prep")}</p>
            </div>
            <svg className="accordion-chevron" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 8L10 13L15 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {openSections.prep && (
            <div className="accordion-body">
              <p style={{ fontSize: 14, color: "var(--forest-mid)", marginBottom: 18, lineHeight: 1.5 }}>
                Before engaging your school, try to find these documents. It's okay if you can't find them — that's useful information too.
              </p>

              <div className="homework-list">
                {HW_ITEMS.map(item => (
                  <div
                    key={item.id}
                    className={`homework-item ${hwStatus[item.id] === "found" ? "found" : ""} ${hwStatus[item.id] === "not_found" ? "not-found" : ""}`}
                  >
                    <div className="hw-item-label">{item.label}</div>
                    <div style={{ fontSize: 13, color: "var(--forest-mid)", marginBottom: 12, lineHeight: 1.4 }}>{item.desc}</div>
                    <div className="hw-button-row">
                      <button
                        className={`hw-btn found-btn ${hwStatus[item.id] === "found" ? "selected" : ""}`}
                        onClick={() => setHwItemStatus(item.id, "found")}
                      >
                        ✓ Found it
                      </button>
                      <button
                        className={`hw-btn not-found-btn ${hwStatus[item.id] === "not_found" ? "selected" : ""}`}
                        onClick={() => setHwItemStatus(item.id, "not_found")}
                      >
                        ✗ Didn't find it
                      </button>
                    </div>
                    <button
                      className={`hw-hint-toggle ${hwHints[item.id] ? "open" : ""}`}
                      onClick={(e) => toggleHint(item.id, e)}
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M3 2L7 5L3 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Where to look
                    </button>
                    {hwHints[item.id] && <div className="hw-hint-body">{item.hint}</div>}
                    {hwStatus[item.id] === "not_found" && (
                      <div className="hw-status-note">
                        {item.notFound}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {allHwAnswered && (
                <div className="info-block" style={{ marginTop: 20 }}>
                  <p>
                    {Object.values(hwStatus).some(v => v === "found")
                      ? <><strong>Great.</strong> Read through what you found — you can reference these documents directly in conversations with the district.</>
                      : <><strong>That's okay.</strong> Not having these documents is itself important information. It means the district may lack clear policies — something worth raising.</>
                    }
                  </p>
                </div>
              )}

              {allHwAnswered && !openSections.school && (
                <div className="btn-row">
                  <button className="btn btn-leaf" onClick={() => setOpenSections(prev => ({ ...prev, school: true }))}>
                    Continue to Step 2 →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ─── STEP 2: YOUR SCHOOL ─── */}
        <div className={`accordion-section ${getSectionStatus("school")} ${openSections.school ? "open" : ""}`}>
          <div className="accordion-header" onClick={() => toggleSection("school")}>
            <div className="accordion-step-badge">
              {schoolComplete ? "✓" : "2"}
            </div>
            <div className="accordion-header-text">
              <h3>Your School</h3>
              <p>{getSectionSummary("school")}</p>
            </div>
            <svg className="accordion-chevron" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 8L10 13L15 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {openSections.school && (
            <div className="accordion-body">
              <div style={{ fontWeight: 600, fontSize: 15, color: "var(--forest)", marginBottom: 8 }}>
                Is your school 1:1?
              </div>
              <p style={{ fontSize: 13.5, color: "var(--forest-mid)", marginBottom: 16, lineHeight: 1.5 }}>
                A 1:1 school means every student has their own assigned device — usually a Chromebook or iPad.
              </p>

              <div className="yn-row" style={{ marginTop: 0 }}>
                <button className={`yn-btn ${is11 === true ? "yes" : ""}`} onClick={() => setIs11(true)}>
                  Yes, 1:1
                </button>
                <button className={`yn-btn ${is11 === false ? "no" : ""}`} onClick={() => setIs11(false)}>
                  No, shared devices
                </button>
              </div>

              {is11 === false && (
                <div className="info-block" style={{ marginTop: 18 }}>
                  <p>Your school likely uses a <strong>computer lab or device cart</strong>. The questions still apply, but some issues (like devices going home) may not be relevant to your situation.</p>
                </div>
              )}

              {is11 !== null && !openSections.questions && (
                <div className="btn-row">
                  <button className="btn btn-leaf" onClick={() => setOpenSections(prev => ({ ...prev, questions: true }))}>
                    Move On to Assessing Device Use →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ─── STEP 3: QUESTIONS ─── */}
        <div className={`accordion-section ${getSectionStatus("questions")} ${openSections.questions ? "open" : ""}`}>
          <div className="accordion-header" onClick={() => toggleSection("questions")}>
            <div className="accordion-step-badge">
              {questionsComplete ? "✓" : "3"}
            </div>
            <div className="accordion-header-text">
              <h3>Assess Device Use</h3>
              <p>{getSectionSummary("questions")}</p>
            </div>
            <svg className="accordion-chevron" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 8L10 13L15 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {openSections.questions && (
            <div className="accordion-body">
              <p style={{ fontSize: 14, color: "var(--forest-mid)", marginBottom: 18, lineHeight: 1.5 }}>
                Answer each question about your school. Your answers will generate personalized action items.
              </p>

              {[1, 2, 3, 4, 5, 6, 7].map((qNum, idx) => {
                const q = QUESTIONS[qNum];
                const answered = answers[qNum];
                const displayNum = idx + 1;
                const getBadgeClass = () => {
                  if (q.multiOption) {
                    if (answered === "idk") return "idk";
                    if (answered === "neither") return "no";
                    if (answered) return "yes";
                    return "";
                  }
                  return answered === true ? "yes" : answered === false ? "no" : answered === "idk" ? "idk" : "";
                };
                const getBadgeText = () => {
                  if (q.multiOption) {
                    const opt = q.options.find(o => o.value === answered);
                    return opt ? opt.label : "";
                  }
                  return answered === true ? "Yes" : answered === false ? "No" : "Not sure";
                };
                const getRowClass = () => {
                  if (q.multiOption) {
                    if (answered === "idk") return "answered-idk";
                    if (answered === "neither") return "answered-no";
                    if (answered) return "answered-yes";
                    return "";
                  }
                  return answered === true ? "answered-yes" : answered === false ? "answered-no" : answered === "idk" ? "answered-idk" : "";
                };
                return (
                  <div
                    key={qNum}
                    className={`question-row ${getRowClass()}`}
                  >
                    <div className="question-row-header">
                      <div className="question-num">{displayNum}</div>
                      <div className="question-text">
                        {q.text}
                        {q.sub && <div style={{ fontSize: 12, color: "var(--forest-mid)", marginTop: 4, fontWeight: 400 }}>{q.sub}</div>}
                      </div>
                      {answered !== undefined && (
                        <span className={`question-answer-badge ${getBadgeClass()}`}>
                          {getBadgeText()}
                        </span>
                      )}
                    </div>

                    {/* Standard yes/no/idk buttons */}
                    {answered === undefined && !q.multiOption && (
                      <div className="yn-row" style={{ marginTop: 12, marginLeft: 36 }}>
                        <button className="yn-btn" onClick={() => answerQuestion(qNum, true)}>Yes</button>
                        <button className="yn-btn" onClick={() => answerQuestion(qNum, false)}>No</button>
                        {qNum !== 1 && qNum !== 5 && qNum !== 6 && qNum !== 7 && <button className="yn-btn" onClick={() => answerQuestion(qNum, "idk")}>I don't know</button>}
                      </div>
                    )}

                    {/* Multi-option buttons (Q4) */}
                    {answered === undefined && q.multiOption && (
                      <div className="yn-row" style={{ marginTop: 12, marginLeft: 36, flexWrap: "wrap" }}>
                        {q.options.map(opt => (
                          <button key={opt.value} className="yn-btn" onClick={() => answerQuestion(qNum, opt.value)}>
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* IDK action */}
                    {answered === "idk" && (
                      <div className="question-details">
                        <div className="idk-action-block">
                          <div className="action-block-header"><span className="idk-tag">Find out</span></div>
                          <p><strong>{IDK_ACTION_MAP[qNum].detail}</strong></p>
                          <p style={{ marginTop: 10 }}><strong>Then:</strong> {IDK_ACTION_MAP[qNum].nextStep}</p>
                        </div>
                      </div>
                    )}

                    {/* Multi-option action (Q4: both/youtube/ai) */}
                    {q.multiOption && answered && answered !== "idk" && answered !== "neither" && q.actions[answered] && (
                      <div className="question-details">{q.actions[answered]}</div>
                    )}

                    {/* Multi-option watch (Q4: neither) */}
                    {q.multiOption && answered === "neither" && (
                      <div className="question-details">
                        <div className="watch-block" style={{ marginTop: 0 }}>
                          <div className="watch-block-header"><span className="watch-tag">Keep watching</span></div>
                          <p>{q.watchFor}</p>
                        </div>
                      </div>
                    )}

                    {/* Standard action (yes + normal logic) */}
                    {!q.multiOption && answered === true && !q.reverseLogic && (
                      <div className="question-details">{q.action}</div>
                    )}
                    {!q.multiOption && answered === true && q.reverseLogic && (
                      <div className="question-details">
                        <div className="watch-block" style={{ marginTop: 0 }}>
                          <div className="watch-block-header"><span className="watch-tag">Keep watching</span></div>
                          <p>{q.watchFor}</p>
                        </div>
                      </div>
                    )}
                    {!q.multiOption && answered === false && !q.reverseLogic && (
                      <div className="question-details">
                        <div className="watch-block" style={{ marginTop: 0 }}>
                          <div className="watch-block-header"><span className="watch-tag">Keep watching</span></div>
                          <p>{q.watchFor}</p>
                        </div>
                      </div>
                    )}
                    {!q.multiOption && answered === false && q.reverseLogic && (
                      <div className="question-details">{q.action}</div>
                    )}

                    {answered !== undefined && (
                      <button
                        className="btn btn-ghost btn-sm"
                        style={{ marginTop: 10, marginLeft: 36 }}
                        onClick={() => setAnswers(prev => {
                          const newAnswers = { ...prev };
                          delete newAnswers[qNum];
                          return newAnswers;
                        })}
                      >
                        Change answer
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ─── INCOMPLETE NOTICE ─── */}
        {openSections.questions && questionsAnswered > 0 && !questionsComplete && (
          <div style={{
            marginTop: 16, padding: "14px 18px", background: "#fff8e6",
            border: "1.5px solid #e6c84a", borderRadius: 10,
            display: "flex", alignItems: "center", gap: 12
          }}>
            <span style={{ fontSize: 20 }}>⚠️</span>
            <span style={{ fontSize: 14, color: "var(--forest)" }}>
              You've answered {questionsAnswered} of 7 questions. Answer all 7 to see your personalized action plan.
              {(() => {
                const unanswered = [1,2,3,4,5,6,7].filter(n => answers[n] === undefined);
                return unanswered.length <= 3
                  ? ` Missing: ${unanswered.map(n => `Q${n}`).join(', ')}.`
                  : '';
              })()}
            </span>
          </div>
        )}

        {/* ─── SUMMARY (when complete) ─── */}
        {questionsComplete && (
          <div className="card" style={{ marginTop: 24, textAlign: "center" }}>
            <div style={{
              width: 72, height: 72, borderRadius: "50%",
              background: "var(--green-accent-bg)", border: "3px solid var(--green-accent)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px", fontSize: 32, color: "var(--forest)"
            }}>✓</div>
            <h2 style={{
              fontFamily: "'Barlow Condensed', sans-serif", fontSize: 32, fontWeight: 700,
              textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8, color: "var(--forest)"
            }}>You're all set</h2>
            {(hasSubmittedEmail() || emailSubmitted) ? (
              <>
                <p style={{ fontSize: 14, color: "var(--forest-mid)", marginBottom: 24, lineHeight: 1.5 }}>
                  You've worked through every question. Here's a summary of your action items.
                </p>

                {collectedActions.length > 0 && (
                  <div className="summary-section">
                    <div className="summary-label">Your action items</div>
                    <div className="summary-list">
                      {collectedActions.map(a => (
                        <div key={a.id} className="summary-item" style={a.id.includes('-idk') ? { borderLeftColor: '#e0a840', background: '#fef9ec' } : {}}>
                          <span className="arrow" style={a.id.includes('-idk') ? { color: '#e0a840' } : {}}>→</span>
                          <span><strong>{a.title}:</strong> {a.detail}{a.nextStep && <><br/><strong>Then:</strong> {a.nextStep}</>}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {collectedActions.length === 0 && (
                  <div className="info-block" style={{ textAlign: "left" }}>
                    <p><strong>Nice work.</strong> It looks like your school is already in pretty good shape on the basics. Keep an eye on things, and use the resources below if anything changes.</p>
                  </div>
                )}

                {watchItems.length > 0 && (
                  <div className="summary-section">
                    <div className="summary-label">Things to keep watching</div>
                    <div className="summary-list">
                      {watchItems.map(item => (
                        <div key={item.qNum} className="summary-item" style={{ borderLeftColor: "var(--sage)", background: "var(--forest-pale)" }}>
                          <span className="arrow" style={{ color: "var(--sage)" }}>•</span>
                          <span><strong>{item.text}</strong> — {item.watchFor}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ─── EXPORT SECTION ─── */}
                <div className="export-section">
                  <div className="export-card">
                    <h3>Download Your Action Guide</h3>
                    <p>Save a copy of your personalized action plan to reference later, share with other parents, or bring to school board meetings.</p>
                    <div className="export-btn-row">
                      <button className="export-btn" onClick={handlePrint}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                          <polyline points="7,10 12,15 17,10"/>
                          <line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                        Save as PDF
                      </button>
                      <button className="export-btn export-btn-secondary" onClick={handleCopyActions}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                        </svg>
                        Copy to clipboard
                      </button>
                    </div>
                  </div>
                </div>

                {/* ─── DRAFT YOUR EMAIL ─── */}
                {collectedActions.length > 0 && (
                  <div className="email-draft-section">
                    <h3>Draft Your Email</h3>
                    <p>
                      You've got your action items — now let's turn them into a conversation.
                      Pick who you want to reach out to and we'll draft a message for you.
                    </p>

                    <div className="email-step-label">Who do you want to message?</div>
                        <div className="email-option-row">
                          {[
                            { key: 'teacher', label: "Your child's teacher" },
                            { key: 'principal', label: 'The principal' },
                            { key: 'board', label: 'School board' },
                            { key: 'parents', label: 'Other parents' },
                          ].map(opt => (
                            <button
                              key={opt.key}
                              className={`email-option-btn ${emailRecipient === opt.key ? 'selected' : ''}`}
                              onClick={() => { setEmailRecipient(opt.key); setEmailCopied(false); }}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>

                        {emailRecipient && (() => {
                          const isParents = emailRecipient === 'parents';
                          const { subject, body } = isParents
                            ? generateParentRallyMessage(collectedActions)
                            : generateEmail({ recipient: emailRecipient, actionItems: collectedActions });
                          const mailtoBody = encodeURIComponent(body);
                          const mailtoSubject = encodeURIComponent(subject);

                          return (
                            <div className="email-draft-card">
                              {isParents && (
                                <div style={{ marginBottom: 14, fontSize: 13.5, color: 'var(--forest-mid)', lineHeight: 1.5 }}>
                                  Share this message with other parents to rally support. Send it via text, email, or your school's parent group.
                                </div>
                              )}
                              <div className="email-draft-subject">
                                <strong>Subject:</strong>
                                <span>{subject}</span>
                              </div>
                              <div className="email-draft-body">{body}</div>
                              <div className="email-draft-actions">
                                <button
                                  className="btn btn-leaf"
                                  onClick={() => {
                                    navigator.clipboard.writeText(`Subject: ${subject}\n\n${body}`).then(() => {
                                      setEmailCopied(true);
                                      setTimeout(() => setEmailCopied(false), 2000);
                                    });
                                  }}
                                >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                                  </svg>
                                  {emailCopied ? 'Copied!' : 'Copy message'}
                                </button>
                                <a
                                  className="btn btn-secondary"
                                  href={`mailto:?subject=${mailtoSubject}&body=${mailtoBody}`}
                                >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                    <polyline points="22,6 12,13 2,6"/>
                                  </svg>
                                  Open in email app
                                </a>
                                <button
                                  className="btn btn-ghost"
                                  onClick={() => { setEmailRecipient(null); setEmailCopied(false); }}
                                >
                                  Try a different version
                                </button>
                              </div>
                            </div>
                          );
                        })()}
                  </div>
                )}

                <div style={{ marginTop: 28, textAlign: "left" }}>
                  <div className="summary-label">Resources</div>
                  <div className="resource-grid">
                    {RESOURCES.map(r => (
                      <div
                        key={r.id}
                        className={`resource-card ${openResource === r.id ? "open" : ""}`}
                        onClick={() => setOpenResource(openResource === r.id ? null : r.id)}
                      >
                        <div className="resource-card-top">
                          <div className="resource-icon">{r.icon}</div>
                          <div>
                            <h4>{r.title}</h4>
                            <p>{r.desc}</p>
                          </div>
                          <svg className="resource-card-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        {openResource === r.id && (
                          <div className="resource-card-body">
                            {r.body}
                            {r.link && (
                              <a href={r.link} target="_blank" rel="noopener noreferrer" className="resource-link" onClick={(e) => e.stopPropagation()}>
                                View Resource →
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <p style={{ fontSize: 14, color: "var(--forest-mid)", marginBottom: 8, lineHeight: 1.5 }}>
                  You've worked through every question — nice work. Enter your info below to see your personalized action items, draft emails, and downloadable guide. We'll also send a copy of your personalized guide to your email.
                </p>
                <button className="modal-submit" onClick={handleEmailGate} style={{ width: "100%", marginTop: 16 }}>
                  Enter Your Info to See Results
                </button>
                <p style={{ fontSize: 12, color: "var(--forest-mid)", marginTop: 10, textAlign: "center", lineHeight: 1.4 }}>
                  You'll also receive occasional updates from PA Unplugged. We respect your privacy.
                </p>
              </>
            )}
          </div>
        )}

        {/* ─── CLEAR PROGRESS ─── */}
        <div className="clear-progress-row">
          <button className="btn btn-ghost" onClick={clearProgress}>
            Start over
          </button>
        </div>

        <footer className="footer">
          <p>A <a href="https://paunplugged.org" target="_blank" rel="noopener noreferrer">PA Unplugged</a> project</p>
        </footer>
      </div>

      {/* ─── PRINT VIEW (hidden on screen, shown in print) ─── */}
      <div className="print-view" ref={printRef}>
        <div className="print-header">
          <img src="/logo.png" alt="PA Unplugged" className="print-header-logo" />
          <h1>Your Ed Tech Action Guide</h1>
          <p className="print-date">Generated {new Date().toLocaleDateString()}</p>
        </div>

        {/* Preamble */}
        <div className="print-preamble">
          <p>
            This personalized guide was created based on your answers about technology use at your school.
            Use it to start conversations with teachers, administrators, and school board members.
            Small changes add up — every question you ask and every policy you push for helps create a healthier tech environment for all students.
          </p>
        </div>

        {/* Action Items */}
        <div className="print-section">
          <div className="print-section-title">Your Action Items</div>
          {collectedActions.length > 0 ? (
            collectedActions.map((action, i) => (
              <div key={action.id} className="print-action-item">
                <span className="print-action-num">{i + 1}.</span>
                <div className="print-action-content">
                  <strong>{action.title}</strong>
                  <span>{action.detail}{action.nextStep && <><br/><strong>Then:</strong> {action.nextStep}</>}</span>
                </div>
              </div>
            ))
          ) : (
            <p style={{ fontStyle: 'italic', color: '#5a7a62' }}>
              Great news! Based on your answers, your school is already doing well on the basics. Keep monitoring the items below.
            </p>
          )}
        </div>

        {/* Watch Items */}
        {watchItems.length > 0 && (
          <div className="print-section">
            <div className="print-section-title">Things to Keep Watching</div>
            {watchItems.map((item) => (
              <div key={item.qNum} className="print-watch-item">
                <strong>{item.text}</strong>
                <span>{item.watchFor}</span>
              </div>
            ))}
          </div>
        )}

        {/* Resources */}
        {/* Email Draft (if generated) */}
        {emailRecipient && (() => {
          const isParents = emailRecipient === 'parents';
          const { subject, body } = isParents
            ? generateParentRallyMessage(collectedActions)
            : generateEmail({ recipient: emailRecipient, actionItems: collectedActions });
          return (
            <div className="print-section print-email-section" style={{ display: 'block' }}>
              <div className="print-section-title">{isParents ? 'Your Message to Other Parents' : 'Your Draft Email'}</div>
              <div className="print-email-subject">Subject: {subject}</div>
              <div className="print-email-body">{body}</div>
            </div>
          );
        })()}

        <div className="print-section print-resources">
          <div className="print-section-title">Key Resources</div>
          <div className="print-resource-grid">
            {RESOURCES.slice(0, 6).map((r) => (
              <div key={r.id} className="print-resource-item">
                <strong>{r.title}</strong>
                <span>{r.desc}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '9pt', marginTop: '10px', color: '#5a7a62' }}>
            Access all resources with clickable links at paunplugged.org
          </p>
        </div>

        {/* Footer */}
        <div className="print-footer">
          <p><strong>PA Unplugged</strong> — Collective action starts here.</p>
          <p>paunplugged.org • Take our Ed Tech Survey: survey.paunplugged.org</p>
        </div>
      </div>

      {/* ─── SAVE TOAST ─── */}
      {showSaveToast && (
        <div className="save-indicator">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8L6.5 11.5L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Progress saved
        </div>
      )}
    </>
  );
}
