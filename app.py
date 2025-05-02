import tkinter as tk
from tkinter import ttk
from datetime import datetime

# Datas de início e fim
start_date = datetime(2024, 10, 8)
end_date = datetime(2025, 12, 1)

# Função para calcular os dias
def calculate_days():
    today = datetime.now()
    total_days = (end_date - start_date).days
    days_passed = (today - start_date).days
    days_remaining = (end_date - today).days
    progress_percentage = (days_passed / total_days) * 100
    last_update = today.strftime('%d/%m/%Y às %H:%M')

    days_count_label.config(text=f'Já se passaram {days_passed} dias desde 08/10/2024.')
    days_remaining_label.config(text=f'Faltam {days_remaining} dias até 01/12/2025.')
    progress_bar['value'] = progress_percentage
    progress_percentage_label.config(text=f'{int(progress_percentage)}%')
    last_update_label.config(text=f'Última atualização: {last_update}')
    root.title(f'Faltam {days_remaining} dias')

    # Agendar próxima atualização em 60 segundos
    root.after(60000, calculate_days)

# Configuração da janela
root = tk.Tk()
root.title('Contador de Dias')
root.geometry('600x300')
root.resizable(True, True)

# Layout
frame = tk.Frame(root, padx=20, pady=20)
frame.pack(expand=True)

title_label = tk.Label(frame, text='Contador de Dias', font=('Arial', 20))
title_label.pack(pady=10)

days_count_label = tk.Label(frame, text='', font=('Arial', 14))
days_count_label.pack()

days_remaining_label = tk.Label(frame, text='', font=('Arial', 14))
days_remaining_label.pack()

progress_bar = ttk.Progressbar(frame, length=400, mode='determinate')
progress_bar.pack(pady=10)

progress_percentage_label = tk.Label(frame, text='0%', font=('Arial', 12))
progress_percentage_label.pack()

last_update_label = tk.Label(frame, text='', font=('Arial', 10))
last_update_label.pack(pady=5)

# Chama a função ao iniciar
calculate_days()

root.mainloop()
