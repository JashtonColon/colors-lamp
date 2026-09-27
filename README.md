# COLORS Web Application

A full-stack web application hosted on a DigitalOcean LAMP stack that provides user authentication and color palette management.

## Overview

The COLORS web application allows registered users to log in securely, create and add custom color entries associated with their account, and dynamically search through their stored color list.

## Technologies Used

* **Frontend:** HTML5, CSS3, JavaScript (ES6+), MD5 Hashing (`md5.js`)
* **Backend:** PHP
* **Database:** MySQL
* **Hosting & Infrastructure:**
  * **Server:** DigitalOcean Droplet (Ubuntu LAMP Stack)
  * **Domain Registrar:** GoDaddy (`jashtonlabcop4331.xyz`) linked via A record DNS routing
* **Version Control:** Git & GitHub

## Repository Structure

```text
colors-lamp/
│── api/
│   ├── AddColor.php
│   ├── Login.php
│   └── SearchColors.php
│── public/
│   ├── css/
│   │   └── styles.css
│   ├── images/
│   │   └── background.png
│   ├── js/
│   │   ├── code.js
│   │   └── md5.js
│   ├── color.html
│   └── index.html
│── .gitignore
│── LICENSE.md
└── README.md
```

## High-Level Setup Instructions

### 1. Droplet & Domain Configuration
1. Provision a LAMP stack Droplet on DigitalOcean running Ubuntu.
2. Purchase a domain via GoDaddy (`jashtonlabcop4331.xyz`).
3. In GoDaddy DNS Management, create an `A` record pointing `@` to the public IP address of the DigitalOcean Droplet.

### 2. Database Setup
1. Log in to MySQL on the Droplet (`mysql -u root -p`).
2. Create the `COP4331` database along with `Users` and `Colors` tables.
3. Create a database user with proper privileges granted for `COP4331.*`.
4. Update backend PHP scripts in `/api` to connect using local MySQL credentials.

### 3. File Deployment
1. Transfer frontend assets (`index.html`, `color.html`, `css/`, `js/`, `images/`) into the web root (`/var/www/html/`).
2. Place backend endpoint files (`Login.php`, `AddColor.php`, `SearchColors.php`) into `/var/www/html/LAMPAPI/`.

## Accessing and Running the Application

* **Live URL:** [http://jashtonlabcop4331.xyz](http://jashtonlabcop4331.xyz)
* **Usage:**
  1. Open a browser and navigate to `http://jashtonlabcop4331.xyz`.
  2. Enter login credentials on `index.html` to authenticate.
  3. Once logged in, navigate to `color.html` to add new color entries or search through your existing saved colors.

## Assumptions, Limitations, & AI Policy Disclosures

* **Assumptions:** Readers or evaluators have standard web browsers and REST API testing tool access (e.g., Postman).
* **Limitations:** Database connections use basic password authentication configured for a lab demonstration environment.

AI Assistance Disclosure

This project was developed with assistance from generative AI tools:

Tool: Gemini (Google)

Dates: September 27, 2026

Scope: DigitalOcean Droplet SSH troubleshooting, directory restructuring, local file staging, Git incremental commit workflow execution, and repository documentation authoring

Nature of use: Troubleshooting SSH configuration and terminal shortcut conflicts, guiding step-by-step Git commands, and generating README documentation aligned with project submission requirements

All AI-generated commands and documentation were reviewed, tested, and modified to meet assignment requirements. Final implementation reflects my understanding of the concepts.