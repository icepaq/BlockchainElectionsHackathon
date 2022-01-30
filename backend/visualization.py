import matplotlib.pyplot as plt
import requests
import json

response_API = requests.get('http://localhost:3000/api/getElectionResults')
data = response_API.text
parse_json = json.loads(data)
ls = []
ls.append(int(parse_json['result'][0][3]))
ls.append(int(parse_json['result'][1][3]))
ls.append(int(parse_json['result'][2][3]))
ls.append(int(parse_json['result'][3][3]))

sum = 0
for i in ls:
    sum += i

plt.figure(figsize=[16,12])
plt.barh(["Liberal Party"],ls[0],label='Justin Trudeau', color = 'r')
plt.barh(["Conservative Party"],ls[1],label="Erin O'Toole", color = 'b')
plt.barh(["Block-Quebecois"],ls[2],label='Yves-Francois Blanchet', color = '#3776ab')
plt.barh(["New Democratic Party"],ls[3],label='Jagmeet Singh', color = 'orange')
plt.legend()
plt.xlabel('Number of voters')
plt.ylabel('Parties')
plt.title('Canada Election 2022 on Ethereum BlockChain')
plt.savefig('barplot.png')
plt.clf()

labels = ["Liberal Party", "Conservative Party", "Block-Quebecois", "New Democratic Party"]
sizes = [ls[0]/sum*100,ls[1]/sum*100,ls[2]/sum*100,ls[3]/sum*100]
colors = ['r', 'b', '#3776ab', 'orange']
explode = (0.05,0.05,0.05,0.05)
fig1, ax1 = plt.subplots()
ax1.pie(sizes, colors = colors, labels=labels, autopct='%1.1f%%', startangle=90, pctdistance=0.85, explode = explode)
#draw circle
centre_circle = plt.Circle((0,0),0.70,fc='white')
fig = plt.gcf()
fig.gca().add_artist(centre_circle)
# Equal aspect ratio ensures that pie is drawn as a circle
ax1.axis('equal')
plt.tight_layout()
plt.savefig('pieplot.png')

