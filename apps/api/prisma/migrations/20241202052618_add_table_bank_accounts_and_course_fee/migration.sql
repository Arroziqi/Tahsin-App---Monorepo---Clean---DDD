-- CreateTable
CREATE TABLE "BankAccounts" (
    "id" SERIAL NOT NULL,
    "account_name" VARCHAR(255) NOT NULL,
    "account_number" INTEGER NOT NULL,
    "bank_name" VARCHAR(100) NOT NULL,

    CONSTRAINT "BankAccounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseFee" (
    "id" SERIAL NOT NULL,
    "fee" INTEGER NOT NULL,
    "class_id" INTEGER NOT NULL,

    CONSTRAINT "CourseFee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BankAccounts_account_name_key" ON "BankAccounts"("account_name");

-- CreateIndex
CREATE UNIQUE INDEX "BankAccounts_account_number_key" ON "BankAccounts"("account_number");

-- AddForeignKey
ALTER TABLE "CourseFee" ADD CONSTRAINT "CourseFee_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
