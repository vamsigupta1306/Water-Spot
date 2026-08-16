# 💧 WaterSpot – AI-Based Water Quality Prediction & Analysis

WaterSpot is a web-based application designed to **predict and analyze water quality** using important water parameters such as pH, hardness, TDS, turbidity, and other relevant factors.

The system helps users understand the quality of water in a particular area and provides **analysis, prediction results, and recommendations** based on the entered parameters.

---

## 📌 Project Overview

Access to clean and safe water is essential for human health and the environment. Water quality can vary depending on factors such as chemical composition, pollution, and environmental conditions.

**WaterSpot** provides a simple platform where users can enter water-quality parameters and obtain an estimated water-quality result.

### Key objectives

* Predict water quality using input parameters
* Analyze different water-quality measurements
* Present results through an easy-to-understand dashboard
* Help identify potentially poor-quality water
* Provide recommendations based on prediction results
* Visualize water-quality data using charts and graphs

---

## ✨ Features

### 🏠 Home

* Introduction to WaterSpot
* Overview of the water-quality prediction system
* Easy navigation to different sections

### 🔬 Water Quality Prediction

Users can enter parameters such as:

* pH
* Hardness
* Solids / TDS
* Chloramines
* Sulfate
* Conductivity
* Organic Carbon
* Trihalomethanes
* Turbidity

The system processes the provided values and generates a water-quality prediction.

### 📊 Analysis Dashboard

The dashboard provides:

* Prediction results
* Parameter analysis
* Graphical representation of water-quality data
* Water-quality status
* Easy-to-understand insights

### 💡 Recommendations

Based on the prediction and entered parameters, WaterSpot provides suggestions to help users understand potential water-quality concerns.

---

## 🛠️ Technology Stack

### Frontend

* **Next.js 15**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **shadcn/ui**
* **Lucide React**
* **Framer Motion**

### Data & Visualization

* **Recharts**
* **TanStack Table**
* **Axios**

### Backend & Database

* **Next.js API**
* **Prisma**
* **NextAuth.js**
* **Zod**

### State Management

* **Zustand**
* **TanStack Query**

---

## 📂 Project Structure

```text
WaterSpot/
│
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── dashboard/
│   │   ├── prediction/
│   │   └── ...
│   │
│   ├── components/
│   │   └── ui/
│   │
│   ├── hooks/
│   │
│   └── lib/
│
├── public/
│   └── images/
│
├── prisma/
│   └── schema.prisma
│
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/vamsigupta1306/WaterSpot.git
```

### 2. Navigate to the project

```bash
cd WaterSpot
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open the application

Open your browser and visit:

```text
http://localhost:3000
```

---

## 🔐 Environment Variables

If your project uses authentication, database, or other external services, create a `.env` file in the project root.

Example:

```env
DATABASE_URL="your_database_url"
NEXTAUTH_SECRET="your_secret"
NEXTAUTH_URL="http://localhost:3000"
```

Do not upload your `.env` file or secret keys to GitHub.

---

## 🧪 How to Use

### Step 1 – Open WaterSpot

Launch the application using:

```bash
npm run dev
```

### Step 2 – Enter Water Parameters

Enter the available water-quality values in the prediction form.

### Step 3 – Submit for Prediction

Click the prediction button to process the entered values.

### Step 4 – View Results

The application displays the predicted water-quality status.

### Step 5 – Analyze the Results

Use the dashboard to understand the individual parameters and their effect on water quality.

### Step 6 – Follow Recommendations

Review the recommendations provided by the system for potentially poor water-quality conditions.

---

## 🤖 Prediction System

The prediction system uses water-quality parameters as input.

```text
Water Parameters
       │
       ▼
Data Validation
       │
       ▼
Prediction Model
       │
       ▼
Water Quality Result
       │
       ▼
Analysis & Visualization
       │
       ▼
Recommendations
```

---

## 📊 Water Quality Parameters

| Parameter       | Description                                           |
| --------------- | ----------------------------------------------------- |
| pH              | Measures the acidity or alkalinity of water           |
| Hardness        | Indicates the concentration of calcium and magnesium  |
| TDS             | Represents the amount of dissolved substances         |
| Chloramines     | Indicates disinfectant-related compounds              |
| Sulfate         | Measures sulfate concentration                        |
| Conductivity    | Indicates the ability of water to conduct electricity |
| Organic Carbon  | Represents organic carbon content                     |
| Trihalomethanes | Indicates certain disinfection by-products            |
| Turbidity       | Measures the clarity of water                         |

---

## 🎯 Project Goals

* Build an easy-to-use water-quality prediction platform
* Apply machine learning to water-quality analysis
* Provide useful visualizations
* Help users understand water-quality conditions
* Support data-driven water-quality monitoring

---

## 🚀 Future Enhancements

* 📍 Location-based water-quality analysis
* 🗺️ Interactive water-quality maps
* 📱 Mobile application
* 🔔 Water-quality alerts
* 📈 Historical water-quality tracking
* 🤖 Improved machine-learning models
* 🌐 Real-time sensor/IoT integration
* 📄 Automated water-quality reports

---

## 👨‍💻 Developed By

**Y Vamsi Gupta**

B.Tech – Computer Science / Cybersecurity

Kalasalingam Academy of Research and Education

---

## 📄 License

This project is developed for **educational and academic purposes**.

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.
