FROM python:3.7.5-buster

RUN echo \
   && apt-get update \
   && apt-get --yes install apt-file \
   && apt-file update \
   && apt-get --yes install libgl1-mesa-glx

RUN echo \
   && apt-get --yes install build-essential \
   && pip install --upgrade pip

WORKDIR .

COPY mnist .
COPY static .
COPY templates .
COPY app.py .
COPY requirements.txt .


RUN pip --no-cache-dir install -r requirements.txt

EXPOSE 8000

ENTRYPOINT ["gunicorn"]
CMD ["app:app"]
