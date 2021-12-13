function b(index)
{
    return document.getElementById('b' + (index + 1));
}

let turn_x = true;
let left = 9;
window.onload = onReload;
let state = '_';

function reset()
{
    localStorage.setItem('reset', '1');
    location.reload();
}

function toggleAll(to)
{
    for (let i = 0; i < 9; i++)
    {
        b(i).disabled = to;
    }
}

function set(index)
{
    if (b(index).disabled) return;
    if (turn_x) b(index).value = 'X';
    else b(index).value = '0';
    b(index).disabled = true;
    left--;
    turn_x = !turn_x;
    if (turn_x) document.getElementById('print').innerHTML = 'Player X\'s turn';
    else document.getElementById('print').innerHTML = 'Player 0\'s turn';
    check();
}

function clear_data()
{
    localStorage.setItem('savedata', '_---------');
}

function onReload()
{
    let state_str = localStorage.getItem('savedata');
    if (localStorage.getItem('reset') == '1') state_str = '_---------';
    localStorage.setItem('reset', '0');
    if (state_str.charAt(0) == '_')
    {
        let count_X = 0, count_0 = 0;
        for (let i = 0; i < 9; i++)
        {
            if (state_str.charAt(i + 1) == '-')
                b(i).disabled = false;
            else b(i).disabled = true;
            if (state_str.charAt(i + 1) == '-') b(i).value = '';
            else b(i).value = state_str.charAt(i + 1);
            if (state_str.charAt(i + 1) == 'X') count_X++;
            else if (state_str.charAt(i + 1) == '0') count_0++;
        }
        if (count_X > count_0)
        {
            document.getElementById('print').innerHTML = 'Player 0\'s turn';
            turn_x = false;
        }
        else
        {
            document.getElementById('print').innerHTML = 'Player X\'s turn';
            turn_x = true;
        }
        left = 9 - count_X - count_0;
        state = '_';
    }
    else
    {
        toggleAll(true);
        state = state_str.charAt(0);
        for (let i = 0; i < 9; i++)
        {
            if (state_str.charAt(i + 1) == '-') b(i).value = '';
            else b(i).value = state_str.charAt(i + 1);
        }
        left = 0;
        if (state == '=') document.getElementById('print').innerHTML = 'Match tie';
        else if (state == 'X') document.getElementById('print').innerHTML = 'Player X won';
        else document.getElementById('print').innerHTML = 'Player 0 won';
    }
}

function save()
{
    let state_new = state;
    for (let i = 0; i < 9; i++)
    {
        if (b(i).value == '') state_new += '-';
        else state_new += b(i).value;
    }
    localStorage.setItem('savedata', state_new);
    localStorage.setItem('reset', '0');
}

function check()
{
    const lines = [[0, 1, 2],
                   [3, 4, 5],
                   [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    for (let i = 0; i < 8; i++)
    {
        if (b(lines[i][0]).value == '' ||
            b(lines[i][1]).value == '' ||
            b(lines[i][2]).value == '')
            continue;
        if ((b(lines[i][0]).value == b(lines[i][1]).value) && (b(lines[i][1]).value == b(lines[i][2]).value)) {
            window.alert('Player ' + b(lines[i][0]).value + ' won');
            toggleAll(true);
            document.getElementById('print').innerHTML = 'Player ' + b(lines[i][0]).value + ' won';
            state = b(lines[i][0]).value;
            return;
        }
    }
    if (left == 0)
    {
        window.alert('Match tie');
        document.getElementById('print').innerHTML = 'Match tie';
        state = '=';
    }
}