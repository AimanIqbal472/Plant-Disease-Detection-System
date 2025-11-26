# Potato Disease Classification

## Setup for Python
1. Install Python ([Setup instructions](https://wiki.python.org/moin/BeginnersGuide))
2. Install Python packages
pip3 install -r training/requirements.txt
pip3 install -r api/requirements.txt

markdown
Copy code
3. Install Tensorflow Serving ([Setup instructions](https://www.tensorflow.org/tfx/serving/setup))

## Setup for ReactJS
1. Install Nodejs ([Setup instructions](https://nodejs.org/en/download/package-manager/))
2. Install NPM ([Setup instructions](https://www.npmjs.com/get-npm))
3. Install dependencies
```bash
cd frontend
npm install --from-lock-json
npm audit fix
Copy .env.example as .env.

Change API url in .env.

Training the Model
Download the data from kaggle and keep folders related to Potatoes.

Run Jupyter Notebook:

bash
Copy code
jupyter notebook
Open training/potato-disease-training.ipynb in Jupyter Notebook.

Update dataset path in cell #2 and run all cells.

Save the generated model with version number in models folder.

Running the API
Using FastAPI
bash
Copy code
cd api
uvicorn main:app --reload --host 0.0.0.0
API runs at 0.0.0.0:8000.

Using FastAPI & TF Serve
bash
Copy code
cd api
cp models.config.example models.config
docker run -t --rm -p 8501:8501 -v C:/Code/potato-disease-classification:/potato-disease-classification tensorflow/serving --rest_api_port=8501 --model_config_file=/potato-disease-classification/models.config
uvicorn main-tf-serving:app --reload --host 0.0.0.0
API runs at 0.0.0.0:8000.

Running the Frontend
bash
Copy code
cd frontend
cp .env.example .env
npm run start
Update REACT_APP_API_URL in .env if needed.

Creating the TF Lite Model
bash
Copy code
jupyter notebook
Open training/tf-lite-converter.ipynb, update dataset path in cell #2, run all cells. Model saved in tf-lite-models folder.