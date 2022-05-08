/*
  Warnings:

  - A unique constraint covering the columns `[auth0Sub]` on the table `UserIdentity` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserIdentity_auth0Sub_key" ON "UserIdentity"("auth0Sub");
