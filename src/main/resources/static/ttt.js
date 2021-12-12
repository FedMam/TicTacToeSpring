function b(index)
{
    return document.getElementById('b' + (index + 1));
}

let turn_x = true;
let left = 9;
window.onbeforeunload = onClose;

function reset()
{
    location.reload();
    toggleAll(false);
    for (let i = 0; i < 9; i++)
    {
        b(i).value = '';
    }
    turn_x = true;
    left = 9;
}

function toggleAll(state)
{
    for (let i = 0; i < 9; i++)
    {
        b(i).disabled = state;
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
    check();
}

function onClose()
{
    toggleAll(false);
    for (let i = 0; i < 9; i++)
    {
        b(i).value = '';
    }
    turn_x = true;
    left = 9;
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
            return;
        }
    }
    if (left == 0)
    {
        window.alert('Match tie');
        document.getElementById('print').innerHTML = 'Match tie';
    }
}