{
 "cells": [
  {
   "cell_type": "code",
   "execution_count": 1,
   "id": "edbaa12d-eecb-4a0d-a93b-155034675609",
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "✅ splitfolders is working!\n"
     ]
    }
   ],
   "source": [
    "import splitfolders\n",
    "print(\"✅ splitfolders is working!\")\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 2,
   "id": "7892c7a8-daeb-4da6-ab6f-4c28366845c9",
   "metadata": {},
   "outputs": [
    {
     "name": "stderr",
     "output_type": "stream",
     "text": [
      "Copying files: 2152 files [00:14, 145.40 files/s]\n"
     ]
    }
   ],
   "source": [
    "import splitfolders  \n",
    "\n",
    "# input = your dataset folder (e.g. PlantVillage folder with images)\n",
    "# output = dataset folder with train/val/test subfolders\n",
    "splitfolders.ratio(\"PlantVillage\", output=\"dataset\", seed=1337, ratio=(.7, .1, .2))\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 3,
   "id": "275da4e2-8dcc-44b2-a36d-af3885b58647",
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "C:\\ProgramData\\anaconda3\\python.exe\n"
     ]
    }
   ],
   "source": [
    "import sys\n",
    "print(sys.executable)\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "id": "9204020f-a1a7-48dc-a188-f3a5a95d1e09",
   "metadata": {},
   "outputs": [],
   "source": []
  }
 ],
 "metadata": {
  "kernelspec": {
   "display_name": "Python 3 (ipykernel)",
   "language": "python",
   "name": "python3"
  },
  "language_info": {
   "codemirror_mode": {
    "name": "ipython",
    "version": 3
   },
   "file_extension": ".py",
   "mimetype": "text/x-python",
   "name": "python",
   "nbconvert_exporter": "python",
   "pygments_lexer": "ipython3",
   "version": "3.12.7"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 5
}
