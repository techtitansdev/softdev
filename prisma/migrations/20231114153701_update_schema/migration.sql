-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "emailVerifiedAt" DATETIME,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Admins" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Blogs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Projects" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "beneficiaries" TEXT NOT NULL,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" DATETIME NOT NULL,
    "about" TEXT NOT NULL,
    "status" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Fundraisers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "funds" INTEGER NOT NULL,
    "goal" INTEGER NOT NULL,
    "targetDate" DATETIME NOT NULL,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" DATETIME NOT NULL,
    "complete" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Donors" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Fundings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "donorId" TEXT NOT NULL,
    "fundraiserId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Milestones" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "AssignAdminBlogs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "adminId" TEXT NOT NULL,
    "blogId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "AssignAdminsProjects" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "adminId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "AssignCategoriesBlog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "categoryId" TEXT NOT NULL,
    "blogId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "AssignCategoriesProject" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "categoryId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE INDEX "Admins_userId_idx" ON "Admins"("userId");

-- CreateIndex
CREATE INDEX "Fundraisers_projectId_idx" ON "Fundraisers"("projectId");

-- CreateIndex
CREATE INDEX "Donors_userId_idx" ON "Donors"("userId");

-- CreateIndex
CREATE INDEX "Fundings_donorId_idx" ON "Fundings"("donorId");

-- CreateIndex
CREATE INDEX "Fundings_fundraiserId_idx" ON "Fundings"("fundraiserId");

-- CreateIndex
CREATE INDEX "AssignAdminBlogs_adminId_idx" ON "AssignAdminBlogs"("adminId");

-- CreateIndex
CREATE INDEX "AssignAdminBlogs_blogId_idx" ON "AssignAdminBlogs"("blogId");

-- CreateIndex
CREATE INDEX "AssignAdminsProjects_adminId_idx" ON "AssignAdminsProjects"("adminId");

-- CreateIndex
CREATE INDEX "AssignAdminsProjects_projectId_idx" ON "AssignAdminsProjects"("projectId");

-- CreateIndex
CREATE INDEX "AssignCategoriesBlog_categoryId_idx" ON "AssignCategoriesBlog"("categoryId");

-- CreateIndex
CREATE INDEX "AssignCategoriesBlog_blogId_idx" ON "AssignCategoriesBlog"("blogId");

-- CreateIndex
CREATE INDEX "AssignCategoriesProject_categoryId_idx" ON "AssignCategoriesProject"("categoryId");

-- CreateIndex
CREATE INDEX "AssignCategoriesProject_projectId_idx" ON "AssignCategoriesProject"("projectId");
