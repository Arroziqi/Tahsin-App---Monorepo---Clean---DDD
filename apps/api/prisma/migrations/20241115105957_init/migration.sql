-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "place_of_birth" VARCHAR(255) NOT NULL,
    "date_of_birth" DATE NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "domicile" VARCHAR(255) NOT NULL,
    "phone_number" INTEGER NOT NULL,
    "profession" VARCHAR(255) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Registration" (
    "id" SERIAL NOT NULL,
    "motivation" VARCHAR(255) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "batch_id" INTEGER NOT NULL,
    "payment_status" VARCHAR(255) NOT NULL,
    "class_type" VARCHAR(255) NOT NULL,
    "voice_note" VARCHAR(255),
    "schedule" VARCHAR(255) NOT NULL,

    CONSTRAINT "Registration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "role_id" INTEGER NOT NULL DEFAULT 2,
    "profile_id" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_unique" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_unique" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "registration_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "users_profile_id_foreign" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "users_role_id_foreign" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
