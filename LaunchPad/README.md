# 🤖 Expanova for Valencia

**Making Spanish bureaucracy bearable, one automated task at a time.**

![Expanova](./LaunchPad.jpg)

Expanova is the first AI-powered bureaucratic assistant specifically designed for expats living in Valencia, Spain. Our platform automates the most painful parts of Spanish administration, from NIE applications to empadronamiento, with intelligent document processing, appointment monitoring, and 24/7 AI guidance.

This repository contains:
- A full-stack AI bureaucracy assistant with Node.js backend
- A beautiful Next.js frontend built on Strapi LaunchPad design
- Strapi CMS for content management
- Complete Docker development environment

## 🚀 What Expanova Does

### **For Valencia Expats:**
- **Smart Roadmaps**: Personalized task lists based on your visa type, nationality, and family situation
- **Document Magic**: Upload docs → AI extracts data → Auto-fills Spanish forms  
- **Appointment Sniper**: Monitors Policía, DGT, Ayuntamiento, GVA for available citas
- **AI Chat Assistant**: 24/7 support trained on Spanish bureaucracy procedures
- **Progress Tracking**: Beautiful dashboard showing completion status and next steps

### **Key Processes Automated:**
- NIE/TIE application and renewal
- Empadronamiento (municipal registration)
- SIP health card registration
- Bank account opening guidance
- Driving license exchange
- Tax declaration preparation

## 🛠️ Quick Start

### **Prerequisites**
- Node.js 18+
- Docker & Docker Compose  
- Yarn package manager

### **1. Clone Repository**

```bash
git clone <your-expanova-repo>
cd expanova
```

## 2. Set up environment variables

Before you take off, set up the required environment variables for both Strapi and Next.js.

To create the Strapi .env file, copy the content of the `./strapi/.env.example` file into a new file named `./strapi/.env`, then modify the values to match your setup:

```sh
cp ./strapi/.env.example ./strapi/.env
```

Then do the same for the Next.js .env file, and modify it too:

```sh
cp ./next/.env.example ./next/.env
```

## 3. Start Strapi

Take a deep breath. It's time to power up the Strapi engines. Navigate to your ./my-projects/launchpad/strapi folder by running:

Navigate to your `./my-projects/launchpad/strapi` folder by running `cd strapi` from your command line.

- Run the following command in your `./launchpad/strapi` folder:

```
yarn && yarn seed && yarn develop
```

This will install dependencies, sprinkle in some data magic, and run the server. (You can run these commands separately, but why not be efficient?)

## 4. Start Next.js

We're almost ready for lift-off! Next.js is your sleek, futuristic interface for getting all that glorious content out into the world. 🚀

Open a new terminal tab or window to leave Strapi running, and navigate to your `./my-projects/launchpad/next` folder by running `cd next`.

- Run the following command in your `./launchpad/next` folder

```
yarn && yarn build && yarn start
```

This installs dependencies, builds your project, and starts your server. You’re now a spacefaring content master!

## Features Overview ✨

### User

<br />

**An intuitive, minimal editor** The editor allows you to pull in dynamic blocks of content. It’s 100% open-source, and it’s fully extensible.<br />
**Media Library** Upload images, video or any files and crop and optimize their sizes, without quality loss.<br />
**Flexible content management** Build any type of category, section, format or flow to adapt to your needs. <br />
**Sort and Filter** Built-in sorting and filtering: you can manage thousands of entries without effort.<br />
**User-friendly interface** The most user-friendly open-source interface on the market.<br />
**SEO optimized** Easily manage your SEO metadata with a repeatable field and use our Media Library to add captions, notes, and custom filenames to optimize the SEO of media assets.<br /><br />

### Global

<br />

[Customizable API](https://strapi.io/features/customizable-api): Automatically build out the schema, models, controllers for your API from the editor. Get REST or GraphQL API out of the box without writing a single line of code.<br />
[Media Library](https://strapi.io/features/media-library): The media library allows you to store your images, videos and files in your Strapi admin panel with many ways to visualize and manage them.<br />
[Role-Based Access Control (RBAC)](https://strapi.io/features/custom-roles-and-permissions): Role-Based Access Control is a feature available in the Administration Panel settings that let your team members have access rights only to the information they need.<br />
[Internationalization (i18n)](https://strapi.io/features/internationalization): Internationalization (i18n) lets you create many content versions, also called locales, in different languages and for different countries.<br />
[Audit Logs](https://strapi.io/blog/reasons-and-best-practices-for-using-audit-logs-in-your-application)The Audit Logs section provides a searchable and filterable display of all activities performed by users of the Strapi application<br />
[Data transfer](https://strapi.io/blog/importing-exporting-and-transferring-data-with-the-strapi-cli) Streams your data from one Strapi instance to another Strapi instance.<br />
[Review Worfklows](https://docs.strapi.io/user-docs/settings/review-workflows) Create and manage any desired review stages for your content, enabling your team to collaborate in the content creation flow from draft to publication. <br />

## Resources

[Docs](https://docs.strapi.io) • [Demo](https://strapi.io/demo) • [Forum](https://forum.strapi.io/) • [Discord](https://discord.strapi.io) • [Youtube](https://www.youtube.com/c/Strapi/featured) • [Strapi Design System](https://design-system.strapi.io/) • [Marketplace](https://market.strapi.io/) • [Cloud Free Trial](https://cloud.strapi.io)

## Todo

- [ ] Implement the official Strapi SEO plugin
- [ ] Implement the community Strapi preview plugin
- [ ] Create localized content for the pricing plans and products
- [ ] Populate creator fields when it'll work on Strapi 5 (article authors information are missing)

## Customization

- The Strapi application contains a custom population middleware in order to populate more data than what it is set by default. You can find it in the `./strapi/src/middlewares/deepPopulate.ts` file.

- The Strapi application contains a postinstall script that will regenerate an uuid for the project in order to get some anonymous usage information concerning this demo. You can disable it by removing the uuid inside the `./strapi/packages.json` file.

- The Strapi application contains a patch for the @strapi/admin package. It is only necessary for the hosted demos since we automatically create the Super Admin users for them when they request this demo on our website.
