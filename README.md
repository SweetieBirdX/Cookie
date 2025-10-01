# 🍪 Cookie - Recipe Search App

> **Find delicious recipes based on the ingredients you have!**

Cookie is a modern web application that helps you discover amazing recipes by simply entering the ingredients you have at hand. No more wondering what to cook - just tell us what's in your kitchen, and we'll find the perfect recipe for you!

---

## ✨ Features

- 🔍 **Smart Ingredient Search** - Enter ingredients you have (e.g., "chicken, rice, onion") and find matching recipes
- ⭐ **Favorites System** - Save your favorite recipes for quick access later
- 🔐 **User Authentication** - Secure sign-up and sign-in with Firebase Authentication
- 📱 **Responsive Design** - Beautiful UI that works seamlessly on all devices
- 🎯 **Smart Scoring Algorithm** - Recipes are ranked based on how well they match your ingredients
- 🌐 **Rich Recipe Database** - 300+ recipes with detailed instructions, ingredients, and cooking times

---

## 🎯 How It Works

1. **Enter Your Ingredients** - Type in the ingredients you have available
2. **Get Instant Results** - Our smart search algorithm finds the best matching recipes
3. **View Recipe Details** - See full instructions, ingredients list, cooking time, and servings
4. **Save Your Favorites** - Sign in to save recipes you love for later

---

## 📊 Data Source

Recipe data is sourced from [TheMealDB](https://www.themealdb.com/) and stored in the `recipes.json` file. The database includes diverse cuisines such as Italian, Asian, Mexican, Middle-Eastern, and more.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager
- Firebase project (for authentication and favorites)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/SweetieBirdX/Cookie.git
cd Cookie
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
   - Copy `env.example` to `.env.local`
   - Fill in your Firebase configuration values

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

---

## 🛠️ Tech Stack

### **Frontend**
- ⚛️ **React 19.1.0** - Modern React with latest features
- ⚡ **Next.js 15.5.3** - React framework with App Router
- 🎨 **Tailwind CSS 4** - Utility-first CSS framework
- 🔤 **TypeScript** - Type-safe JavaScript

### **Backend & Services**
- 🔥 **Firebase Authentication** - Secure user authentication
- 📦 **Firestore** - NoSQL cloud database for favorites
- 🖼️ **Next.js Image Optimization** - Automatic image optimization

### **State Management**
- 🔄 **TanStack React Query v5** - Powerful data synchronization and caching
- 📡 **Custom Hooks** - useAuth, useFavorites, useRecipeSearch

### **Development Tools**
- 🚀 **Turbopack** - Next-generation bundler for faster builds
- 🎯 **ESLint** - Code quality and consistency
- 📝 **PostCSS** - CSS processing

### **UI/UX**
- 🎭 **Google Fonts** - Inter & JetBrains Mono
- 🌈 **Custom Color Theme** - Warm cookie-inspired palette
- 📱 **Mobile-First Design** - Responsive on all screen sizes

---

## 📁 Project Structure

```
Cookie/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── auth/         # Authentication pages
│   │   ├── favorites/    # Favorites page
│   │   ├── recipe/[id]/  # Dynamic recipe detail page
│   │   └── page.tsx      # Home page
│   ├── components/       # Reusable React components
│   ├── lib/              # Utilities and custom hooks
│   └── types/            # TypeScript type definitions
├── data/
│   └── recipes.json      # Recipe database (300+ recipes)
└── public/               # Static assets
```

---

## 🔑 Key Features Explained

### **Intelligent Search Algorithm**
- Tokenizes and normalizes input (handles Turkish characters, multiple formats)
- Searches across ingredients, titles, and tags
- Scoring system: +2 for ingredient match, +1 for tag/title match
- Supports AND/OR search modes

### **Firebase Integration**
- Email/password authentication
- Real-time favorites synchronization
- User-specific data isolation
- Secure Firestore rules

### **Performance Optimizations**
- React Query caching for instant results
- Image optimization with Next.js
- Skeleton loading states
- Code splitting and lazy loading

---

## 📸 Screenshots

**Home Page - Search Interface**
![Home](https://via.placeholder.com/800x400?text=Cookie+Home+Page)

**Recipe Details**
![Recipe Detail](https://via.placeholder.com/800x400?text=Recipe+Details)

**Favorites Collection**
![Favorites](https://via.placeholder.com/800x400?text=My+Favorites)

---

## 🎨 Design Philosophy

Cookie features a warm, inviting design inspired by its namesake. The color palette uses earthy browns (`#8C5A33`) and cream tones (`#F5ECDC`) to create a cozy, kitchen-like atmosphere. The UI is clean and intuitive, making recipe discovery a delightful experience.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Further Questions or Requests?

**Reach us:**

- 💻 **GitHub**: [@SweetieBirdX](https://github.com/SweetieBirdX)
- 🐦 **Twitter/X**: [@EyupEfeKrkc](https://x.com/EyupEfeKrkc)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Recipe data from [TheMealDB](https://www.themealdb.com/)
- Built with [Next.js](https://nextjs.org/)
- Powered by [Firebase](https://firebase.google.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

---

<div align="center">

### Made with ❤️ for food lovers

**Happy Cooking! 🍳**

</div>
