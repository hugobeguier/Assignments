-- CreateTable
CREATE TABLE "Quiz" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quiz" TEXT NOT NULL,
    "title" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "textField" TEXT NOT NULL,
    "createdDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "comment" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_UserAnswers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_UserAnswers_A_fkey" FOREIGN KEY ("A") REFERENCES "Answer" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_UserAnswers_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_UserFeedback" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_UserFeedback_A_fkey" FOREIGN KEY ("A") REFERENCES "Answer" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_UserFeedback_B_fkey" FOREIGN KEY ("B") REFERENCES "Feedback" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserAnswers_AB_unique" ON "_UserAnswers"("A", "B");

-- CreateIndex
CREATE INDEX "_UserAnswers_B_index" ON "_UserAnswers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserFeedback_AB_unique" ON "_UserFeedback"("A", "B");

-- CreateIndex
CREATE INDEX "_UserFeedback_B_index" ON "_UserFeedback"("B");
