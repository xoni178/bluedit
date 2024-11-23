<button onclick="onClick(event)">
    <x-svg.downvote-svg />
</button>

<script>
    function onClick(e) {
        e.stopPropagation()
        console.log(21212)
    }
</script>
